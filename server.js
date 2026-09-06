const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { PROBLEMS } = require('./problems');

const PORT = process.env.PORT || 3005;
const TEMP_BASE_DIR = path.join(__dirname, 'temp_runs');

// Ensure base temp directory exists
if (!fs.existsSync(TEMP_BASE_DIR)) {
  fs.mkdirSync(TEMP_BASE_DIR, { recursive: true });
}

const PYTHON_CMD = process.platform === 'win32'
  ? 'python'
  : (fs.existsSync('/usr/bin/python3') ? 'python3' : 'python');

/**
 * Execute Python code in isolated temp directory
 */
function runPythonCode(code, stdinInput, timeoutMs = 6000) {
  return new Promise((resolve) => {
    const runId = 'py_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    const runDir = path.join(TEMP_BASE_DIR, runId);
    fs.mkdirSync(runDir, { recursive: true });

    const scriptPath = path.join(runDir, 'solution.py');
    fs.writeFileSync(scriptPath, code, 'utf8');

    const startTime = Date.now();
    const proc = spawn(PYTHON_CMD, ['solution.py'], {
      cwd: runDir,
      windowsHide: true
    });

    let stdout = '';
    let stderr = '';
    let isTimedOut = false;

    const timer = setTimeout(() => {
      isTimedOut = true;
      proc.kill();
    }, timeoutMs);

    if (stdinInput) {
      proc.stdin.write(stdinInput);
    }
    proc.stdin.end();

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      clearTimeout(timer);
      const executionTimeMs = Date.now() - startTime;

      // Cleanup
      try {
        fs.rmSync(runDir, { recursive: true, force: true });
      } catch (_) {}

      if (isTimedOut) {
        resolve({
          stdout,
          stderr: 'Time Limit Exceeded (execution exceeded 6.0 seconds)',
          exitCode: -1,
          executionTimeMs,
          timedOut: true
        });
      } else {
        resolve({
          stdout,
          stderr,
          exitCode: code,
          executionTimeMs,
          timedOut: false
        });
      }
    });

    proc.on('error', (err) => {
      clearTimeout(timer);
      try {
        fs.rmSync(runDir, { recursive: true, force: true });
      } catch (_) {}

      resolve({
        stdout,
        stderr: 'Failed to execute Python: ' + err.message,
        exitCode: -1,
        executionTimeMs: 0,
        timedOut: false
      });
    });
  });
}

/**
 * Execute Java code in isolated temp directory
 */
function runJavaCode(code, stdinInput, timeoutMs = 8000) {
  return new Promise((resolve) => {
    const runId = 'java_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    const runDir = path.join(TEMP_BASE_DIR, runId);
    fs.mkdirSync(runDir, { recursive: true });

    // Determine public class name if specified, default to Solution
    let className = 'Solution';
    const classMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
    if (classMatch && classMatch[1]) {
      className = classMatch[1];
    } else {
      // If user wrote class Solution without public keyword, or no class wrapper
      if (!code.includes('class Solution')) {
        code = `import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n${code}\n}`;
      }
    }

    const sourcePath = path.join(runDir, `${className}.java`);
    fs.writeFileSync(sourcePath, code, 'utf8');

    const startTime = Date.now();

    // 1. Compile with javac
    const compileProc = spawn('javac', [`${className}.java`], {
      cwd: runDir,
      windowsHide: true
    });

    let compileErr = '';
    compileProc.stderr.on('data', (d) => { compileErr += d.toString(); });

    compileProc.on('close', (compCode) => {
      if (compCode !== 0) {
        try { fs.rmSync(runDir, { recursive: true, force: true }); } catch (_) {}
        return resolve({
          stdout: '',
          stderr: 'Compilation Error:\n' + compileErr,
          exitCode: compCode,
          executionTimeMs: Date.now() - startTime,
          compileError: true
        });
      }

      // 2. Execute with java
      const runProc = spawn('java', [className], {
        cwd: runDir,
        windowsHide: true
      });

      let stdout = '';
      let stderr = '';
      let isTimedOut = false;

      const timer = setTimeout(() => {
        isTimedOut = true;
        runProc.kill();
      }, timeoutMs);

      if (stdinInput) {
        runProc.stdin.write(stdinInput);
      }
      runProc.stdin.end();

      runProc.stdout.on('data', (d) => { stdout += d.toString(); });
      runProc.stderr.on('data', (d) => { stderr += d.toString(); });

      runProc.on('close', (runCode) => {
        clearTimeout(timer);
        const executionTimeMs = Date.now() - startTime;

        try { fs.rmSync(runDir, { recursive: true, force: true }); } catch (_) {}

        if (isTimedOut) {
          resolve({
            stdout,
            stderr: 'Time Limit Exceeded (execution exceeded 8.0 seconds)',
            exitCode: -1,
            executionTimeMs,
            timedOut: true
          });
        } else {
          resolve({
            stdout,
            stderr,
            exitCode: runCode,
            executionTimeMs,
            timedOut: false
          });
        }
      });

      runProc.on('error', (err) => {
        clearTimeout(timer);
        try { fs.rmSync(runDir, { recursive: true, force: true }); } catch (_) {}
        resolve({
          stdout,
          stderr: 'Java Runtime Execution Failed: ' + err.message,
          exitCode: -1,
          executionTimeMs: 0
        });
      });
    });

    compileProc.on('error', (err) => {
      try { fs.rmSync(runDir, { recursive: true, force: true }); } catch (_) {}
      resolve({
        stdout: '',
        stderr: 'Failed to launch javac: ' + err.message,
        exitCode: -1,
        executionTimeMs: 0
      });
    });
  });
}

/**
 * Dispatch execution by language
 */
async function executeCode(language, code, stdinInput) {
  if (language === 'python') {
    return await runPythonCode(code, stdinInput);
  } else if (language === 'java') {
    return await runJavaCode(code, stdinInput);
  } else {
    return {
      stdout: '',
      stderr: `Unsupported language: ${language}. Allowed: python, java`,
      exitCode: -1,
      executionTimeMs: 0
    };
  }
}

/**
 * Request body helper
 */
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) { // 2MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

/**
 * Helper to normalize anagram group outputs
 */
function normalizeAnagramOutput(raw) {
  let groups = [];
  const text = (raw || '').trim();
  if (!text) return '[]';

  try {
    const fixed = text.replace(/'/g, '"');
    const parsed = JSON.parse(fixed);
    if (Array.isArray(parsed)) {
      groups = parsed.map(g => Array.isArray(g) ? g.map(w => String(w).trim().toLowerCase()) : [String(g).trim().toLowerCase()]);
    }
  } catch (_) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    groups = lines.map(line => {
      const cleanLine = line.replace(/[\[\],]/g, ' ');
      return cleanLine.split(/\s+/).filter(Boolean).map(w => w.toLowerCase());
    });
  }

  groups = groups.map(g => g.slice().sort());
  groups.sort((a, b) => a.join(',').localeCompare(b.join(',')));
  return JSON.stringify(groups);
}

/**
 * Helper to normalize index pair outputs (e.g., "1 2", "[1, 2]", or "2 1")
 */
function normalizePairOutput(raw) {
  const text = (raw || '').trim();
  const matches = text.match(/\d+/g);
  if (!matches || matches.length < 2) return text;
  const num1 = parseInt(matches[0], 10);
  const num2 = parseInt(matches[1], 10);
  const sorted = [num1, num2].sort((a, b) => a - b);
  return `${sorted[0]} ${sorted[1]}`;
}

/**
 * Helper to normalize interval list outputs (e.g., "[[9, 12], [13, 14]]" or "9 12\n13 14")
 */
function normalizeIntervalOutput(raw) {
  const text = (raw || '').trim();
  if (!text || text === '[]') return '[]';
  const numbers = text.match(/-?\d+/g);
  if (!numbers || numbers.length === 0) return '[]';
  const pairs = [];
  for (let i = 0; i + 1 < numbers.length; i += 2) {
    pairs.push([parseInt(numbers[i], 10), parseInt(numbers[i + 1], 10)]);
  }
  return JSON.stringify(pairs);
}

/**
 * Helper to normalize matrix output (e.g. "[[7,4,1],[8,5,2],[9,6,3]]" or line-by-line rows)
 */
function normalizeMatrixOutput(raw) {
  const text = (raw || '').trim();
  if (!text) return '[]';
  try {
    const fixed = text.replace(/'/g, '"');
    const parsed = JSON.parse(fixed);
    if (Array.isArray(parsed)) {
      return JSON.stringify(parsed.map(row => Array.isArray(row) ? row.map(Number) : [Number(row)]));
    }
  } catch (_) {}
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const matrix = lines.map(line => {
    const nums = line.match(/-?\d+/g);
    return nums ? nums.map(Number) : [];
  }).filter(r => r.length > 0);
  return JSON.stringify(matrix);
}

/**
 * HTTP Server
 */
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    // API: GET /api/problems (list all problems)
    if (req.method === 'GET' && pathname === '/api/problems') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(PROBLEMS.map(p => ({
        id: p.id,
        title: p.title,
        difficulty: p.difficulty,
        concept: p.concept
      }))));
      return;
    }

    // API: GET /api/problem (get specific problem, defaults to latest/Question 2)
    if (req.method === 'GET' && pathname === '/api/problem') {
      const requestedId = parseInt(parsedUrl.searchParams.get('id'), 10);
      let problem = PROBLEMS.find(p => p.id === requestedId);
      if (!problem) {
        problem = PROBLEMS[0]; // Default to Question 1
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        id: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
        concept: problem.concept,
        description: problem.description,
        inputSpec: problem.inputSpec,
        outputSpec: problem.outputSpec,
        examples: problem.examples,
        constraints: problem.constraints,
        starterCode: problem.starterCode,
        totalTests: problem.tests.length
      }));
      return;
    }

    // API: POST /api/run (Custom stdin execution)
    if (req.method === 'POST' && pathname === '/api/run') {
      const data = await readJsonBody(req);
      const { language, code, input } = data;

      if (!code || typeof code !== 'string') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Code content is required' }));
        return;
      }

      const result = await executeCode(language || 'python', code, input || '');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      return;
    }

    // API: POST /api/test (Run automated test suite)
    if (req.method === 'POST' && pathname === '/api/test') {
      const data = await readJsonBody(req);
      const { language, code, problemId } = data;

      if (!code || typeof code !== 'string') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Code content is required' }));
        return;
      }

      let problem = PROBLEMS.find(p => p.id === (problemId || 2));
      if (!problem) problem = PROBLEMS[PROBLEMS.length - 1];

      const testResults = [];
      let passedCount = 0;

      for (let i = 0; i < problem.tests.length; i++) {
        const testCase = problem.tests[i];
        const execResult = await executeCode(language || 'python', code, testCase.input);

        let passed = false;
        if (problem.id === 4) {
          const normActual = normalizeAnagramOutput(execResult.stdout);
          const normExpected = normalizeAnagramOutput(testCase.expected);
          passed = (normActual === normExpected) && (execResult.exitCode === 0);
        } else if (problem.id === 6) {
          const normActual = normalizePairOutput(execResult.stdout);
          const normExpected = normalizePairOutput(testCase.expected);
          passed = (normActual === normExpected) && (execResult.exitCode === 0);
        } else if (problem.id === 7) {
          const normActual = normalizeIntervalOutput(execResult.stdout);
          const normExpected = normalizeIntervalOutput(testCase.expected);
          passed = (normActual === normExpected) && (execResult.exitCode === 0);
        } else if (problem.id === 8) {
          const normActual = normalizeMatrixOutput(execResult.stdout);
          const normExpected = normalizeMatrixOutput(testCase.expected);
          passed = (normActual === normExpected) && (execResult.exitCode === 0);
        } else {
          const cleanActual = (execResult.stdout || '').trim().toLowerCase();
          const cleanExpected = testCase.expected.trim().toLowerCase();
          passed = (cleanActual === cleanExpected) && (execResult.exitCode === 0);
        }

        if (passed) passedCount++;

        testResults.push({
          index: i + 1,
          name: testCase.name,
          input: testCase.input,
          expected: testCase.expected.trim(),
          actual: (execResult.stdout || '').trim(),
          passed,
          executionTimeMs: execResult.executionTimeMs,
          stderr: execResult.stderr,
          exitCode: execResult.exitCode,
          compileError: execResult.compileError,
          timedOut: execResult.timedOut
        });
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        problemId: problem.id,
        passedCount,
        totalCount: problem.tests.length,
        allPassed: passedCount === problem.tests.length,
        results: testResults
      }));
      return;
    }

    // Static files
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    
    // Prevent path traversal
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json',
        '.png': 'image/png',
        '.svg': 'image/svg+xml'
      };

      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`⚡ Accenture DSA Practice Server running at http://localhost:${PORT}`);
});
