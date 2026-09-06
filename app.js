/**
 * Accenture 2027 DSA Coding Practice Arena — Client Controller
 * Full 10-Question Navigation with Dual-Language Editing (Python 3.13 / Java 24),
 * LocalStorage Code Caching, Assessment Verification, and Progress Tracking.
 */

(function () {
  'use strict';

  // Application State
  let allProblemsList = [];
  let currentProblem = null;
  let currentProblemId = 1;
  let activeLang = 'python'; // 'python' | 'java'
  let activeTab = 'description'; // 'description' | 'tests' | 'customio'

  const STORAGE_KEY_CODE = 'accenture_dsa_code_v2';
  const STORAGE_KEY_SOLVED = 'accenture_dsa_solved_v2';

  // Load persistent code cache
  let userCodeCache = {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CODE);
    if (saved) userCodeCache = JSON.parse(saved);
  } catch (_) {}

  // Load solved problems set
  let solvedProblems = new Set();
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SOLVED);
    if (saved) solvedProblems = new Set(JSON.parse(saved));
  } catch (_) {}

  // DOM Elements — Navigation Strip
  const problemPillsContainer = document.getElementById('problemPillsContainer');
  const prevProblemBtn = document.getElementById('prevProblemBtn');
  const nextProblemBtn = document.getElementById('nextProblemBtn');
  const problemQuickSelect = document.getElementById('problemQuickSelect');

  // DOM Elements — Header & Badges
  const problemNumberBadge = document.getElementById('problemNumberBadge');
  const difficultyBadge = document.getElementById('difficultyBadge');
  const panelDifficultyBadge = document.getElementById('panelDifficultyBadge');
  const conceptBadge = document.getElementById('conceptBadge');
  const taskTitle = document.getElementById('taskTitle');
  const problemStory = document.getElementById('problemStory');
  const inputSpecList = document.getElementById('inputSpecList');
  const outputSpecText = document.getElementById('outputSpecText');
  const examplesContainer = document.getElementById('examplesContainer');
  const constraintsList = document.getElementById('constraintsList');

  // DOM Elements — Language Switcher & Editor
  const btnLangPython = document.getElementById('btnLangPython');
  const btnLangJava = document.getElementById('btnLangJava');
  const editorFileName = document.getElementById('editorFileName');
  const editorFileIcon = document.getElementById('editorFileIcon');
  const activeLangDisplay = document.getElementById('activeLangDisplay');

  const codeEditor = document.getElementById('codeEditor');
  const lineNumbers = document.getElementById('lineNumbers');

  // DOM Elements — Action Buttons
  const resetBtn = document.getElementById('resetBtn');
  const runCustomBtn = document.getElementById('runCustomBtn');
  const runCustomFromTabBtn = document.getElementById('runCustomFromTabBtn');
  const runTestsBtn = document.getElementById('runTestsBtn');

  // DOM Elements — Sidebar Tabs
  const tabBtnDesc = document.getElementById('tabBtnDesc');
  const tabBtnTests = document.getElementById('tabBtnTests');
  const tabBtnCustomIo = document.getElementById('tabBtnCustomIo');
  const viewDescription = document.getElementById('viewDescription');
  const viewTests = document.getElementById('viewTests');
  const viewCustomIo = document.getElementById('viewCustomIo');

  // DOM Elements — Test Results View
  const testBadgeCounter = document.getElementById('testBadgeCounter');
  const testSummaryBadge = document.getElementById('testSummaryBadge');
  const testProgressBar = document.getElementById('testProgressBar');
  const testResultsList = document.getElementById('testResultsList');

  // DOM Elements — Custom I/O View
  const customStdin = document.getElementById('customStdin');
  const customStdout = document.getElementById('customStdout');
  const customExecMeta = document.getElementById('customExecMeta');

  // DOM Elements — Terminal Console
  const consoleDrawer = document.getElementById('consoleDrawer');
  const consoleOutput = document.getElementById('consoleOutput');
  const consoleStatus = document.getElementById('consoleStatus');
  const clearConsoleBtn = document.getElementById('clearConsoleBtn');
  const toggleConsoleBtn = document.getElementById('toggleConsoleBtn');
  const toggleConsoleIcon = document.getElementById('toggleConsoleIcon');

  /**
   * Save code to cache & localStorage
   */
  function saveCodeToCache(probId, lang, code) {
    if (!probId) return;
    userCodeCache[`${probId}_${lang}`] = code;
    try {
      localStorage.setItem(STORAGE_KEY_CODE, JSON.stringify(userCodeCache));
    } catch (_) {}
  }

  /**
   * Retrieve code from cache
   */
  function getCodeFromCache(probId, lang) {
    return userCodeCache[`${probId}_${lang}`];
  }

  /**
   * Mark a problem as solved
   */
  function markProblemSolved(probId) {
    solvedProblems.add(probId);
    try {
      localStorage.setItem(STORAGE_KEY_SOLVED, JSON.stringify(Array.from(solvedProblems)));
    } catch (_) {}
    renderNavigationPills();
  }

  /**
   * Fetch problem list for navigation
   */
  async function loadProblemsList() {
    try {
      const res = await fetch('/api/problems');
      if (res.ok) {
        allProblemsList = await res.json();
      } else {
        allProblemsList = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Question ${i + 1}`,
          difficulty: i < 2 ? 'EASY' : i < 6 ? 'MEDIUM' : i < 8 ? 'MEDIUM-HARD' : 'HARD',
          concept: 'DSA Practice'
        }));
      }
    } catch (err) {
      console.warn('Could not load problem list:', err);
    }
  }

  /**
   * Render Navigation Strip & Dropdown
   */
  function renderNavigation() {
    if (!allProblemsList || allProblemsList.length === 0) return;

    // Render Pills
    problemPillsContainer.innerHTML = '';
    allProblemsList.forEach(prob => {
      const pill = document.createElement('button');
      pill.className = 'problem-pill' + (prob.id === currentProblemId ? ' active' : '');
      pill.dataset.id = prob.id;
      pill.title = `${prob.title} [${prob.difficulty}]`;

      const diffClass = prob.difficulty.toLowerCase().replace(/[^a-z-]/g, '');
      const isSolved = solvedProblems.has(prob.id);

      pill.innerHTML = `
        <span class="pill-num">Q${prob.id}</span>
        <span class="pill-diff ${diffClass}"></span>
        ${isSolved ? '<span class="pill-check">✓</span>' : ''}
      `;

      pill.addEventListener('click', () => switchProblem(prob.id));
      problemPillsContainer.appendChild(pill);
    });

    // Render Quick Jump Dropdown
    problemQuickSelect.innerHTML = '';
    allProblemsList.forEach(prob => {
      const opt = document.createElement('option');
      opt.value = prob.id;
      const isSolved = solvedProblems.has(prob.id);
      opt.textContent = `Q${prob.id}: ${prob.title} [${prob.difficulty}]${isSolved ? ' ✓' : ''}`;
      if (prob.id === currentProblemId) opt.selected = true;
      problemQuickSelect.appendChild(opt);
    });

    // Update button states
    prevProblemBtn.disabled = currentProblemId <= 1;
    nextProblemBtn.disabled = currentProblemId >= allProblemsList.length;

    // Scroll active pill into view
    const activePill = problemPillsContainer.querySelector('.problem-pill.active');
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  }

  /**
   * Synchronize active state of navigation pills & buttons
   */
  function renderNavigationPills() {
    const pills = problemPillsContainer.querySelectorAll('.problem-pill');
    pills.forEach(pill => {
      const id = parseInt(pill.dataset.id, 10);
      pill.classList.toggle('active', id === currentProblemId);
      
      const isSolved = solvedProblems.has(id);
      let check = pill.querySelector('.pill-check');
      if (isSolved && !check) {
        check = document.createElement('span');
        check.className = 'pill-check';
        check.textContent = '✓';
        pill.appendChild(check);
      } else if (!isSolved && check) {
        check.remove();
      }
    });

    if (problemQuickSelect) {
      problemQuickSelect.value = currentProblemId;
    }

    prevProblemBtn.disabled = currentProblemId <= 1;
    nextProblemBtn.disabled = currentProblemId >= (allProblemsList.length || 10);
  }

  /**
   * Switch to a new problem by ID
   */
  async function switchProblem(newId) {
    if (newId < 1 || (allProblemsList.length > 0 && newId > allProblemsList.length)) return;
    if (currentProblem && newId === currentProblem.id) return;

    // 1. Save current editor buffer
    if (currentProblem) {
      saveCodeToCache(currentProblem.id, activeLang, codeEditor.value);
    }

    currentProblemId = newId;
    window.location.hash = `q=${newId}`;

    renderNavigationPills();
    await loadProblem(newId);
  }

  /**
   * Fetch and render problem data from backend
   */
  async function loadProblem(id) {
    try {
      const probId = id || currentProblemId || 1;
      const res = await fetch(`/api/problem?id=${probId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      currentProblem = await res.json();
      currentProblemId = currentProblem.id;

      renderProblemDetails();
      renderNavigationPills();

      // Reset test tab preview to idle state
      testBadgeCounter.textContent = '0/' + (currentProblem.totalTests || 5);
      testBadgeCounter.className = 'badge-counter';
      testSummaryBadge.textContent = 'Not Run Yet';
      testSummaryBadge.className = 'test-counter';
      testProgressBar.style.width = '0%';
      testResultsList.innerHTML = `
        <div class="empty-tests-state">
          <span class="empty-icon">⚡</span>
          <p>Click <strong>"Run & Test Solution"</strong> to evaluate your solution against the 5 verified assessment test cases.</p>
        </div>
      `;

      // Update document title
      document.title = `Accenture 2027 DSA | Q${currentProblem.id}: ${currentProblem.title}`;

    } catch (err) {
      consoleOutput.textContent = `Error loading problem data: ${err.message}`;
      consoleOutput.className = 'terminal-output error';
    }
  }

  /**
   * Populate UI with problem metadata and starter code
   */
  function renderProblemDetails() {
    if (!currentProblem) return;

    taskTitle.textContent = currentProblem.title;
    problemNumberBadge.textContent = `Question ${currentProblem.id} of ${allProblemsList.length || 10}`;
    conceptBadge.textContent = currentProblem.concept;
    difficultyBadge.textContent = currentProblem.difficulty;
    panelDifficultyBadge.textContent = currentProblem.difficulty;

    // Set difficulty badge classes
    const diffClass = currentProblem.difficulty.toLowerCase().replace(/[^a-z-]/g, '');
    difficultyBadge.className = `problem-difficulty ${diffClass}`;
    panelDifficultyBadge.className = `badge difficulty-badge ${diffClass}`;

    problemStory.textContent = currentProblem.description;

    // Input specs
    inputSpecList.innerHTML = '';
    (currentProblem.inputSpec || []).forEach(spec => {
      const li = document.createElement('li');
      li.textContent = spec;
      inputSpecList.appendChild(li);
    });

    // Output specs
    outputSpecText.textContent = currentProblem.outputSpec;

    // Examples
    examplesContainer.innerHTML = '';
    (currentProblem.examples || []).forEach((ex, idx) => {
      const card = document.createElement('div');
      card.className = 'example-card';
      card.innerHTML = `
        <div class="example-title">Example ${idx + 1}</div>
        <div class="example-io-row">
          <span class="example-io-label">Input (stdin):</span>
          <pre class="example-code">${escapeHtml(ex.input)}</pre>
        </div>
        <div class="example-io-row">
          <span class="example-io-label">Output (stdout):</span>
          <pre class="example-code">${escapeHtml(ex.output)}</pre>
        </div>
        ${ex.explanation ? `<div class="example-explanation"><strong>Explanation:</strong> ${escapeHtml(ex.explanation)}</div>` : ''}
      `;
      examplesContainer.appendChild(card);
    });

    // Constraints
    constraintsList.innerHTML = '';
    (currentProblem.constraints || []).forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      constraintsList.appendChild(li);
    });

    // Restore cached code or load starter code
    const cachedCode = getCodeFromCache(currentProblem.id, activeLang);
    if (cachedCode !== undefined) {
      codeEditor.value = cachedCode;
    } else {
      codeEditor.value = currentProblem.starterCode[activeLang] || '';
    }

    updateLineNumbers();
  }

  /**
   * Switch between Python and Java
   */
  function switchLanguage(lang) {
    if (lang === activeLang) return;

    // Save current code
    if (currentProblem) {
      saveCodeToCache(currentProblem.id, activeLang, codeEditor.value);
    }

    activeLang = lang;

    // Update buttons
    btnLangPython.classList.toggle('active', lang === 'python');
    btnLangJava.classList.toggle('active', lang === 'java');

    if (lang === 'python') {
      editorFileName.textContent = 'solution.py';
      editorFileIcon.textContent = '🐍';
      activeLangDisplay.textContent = 'Python 3.13';
    } else {
      editorFileName.textContent = 'Solution.java';
      editorFileIcon.textContent = '☕';
      activeLangDisplay.textContent = 'Java 24';
    }

    // Load cached code or starter template for new language
    if (currentProblem) {
      const cached = getCodeFromCache(currentProblem.id, lang);
      if (cached !== undefined) {
        codeEditor.value = cached;
      } else {
        codeEditor.value = currentProblem.starterCode[lang] || '';
      }
    }

    updateLineNumbers();
    codeEditor.focus();
  }

  /**
   * Switch sidebar tab
   */
  function switchSidebarTab(tabName) {
    activeTab = tabName;

    tabBtnDesc.classList.toggle('active', tabName === 'description');
    tabBtnTests.classList.toggle('active', tabName === 'tests');
    tabBtnCustomIo.classList.toggle('active', tabName === 'customio');

    viewDescription.classList.toggle('active', tabName === 'description');
    viewTests.classList.toggle('active', tabName === 'tests');
    viewCustomIo.classList.toggle('active', tabName === 'customio');
  }

  /**
   * Synchronize line numbers
   */
  function updateLineNumbers() {
    const lines = codeEditor.value.split('\n');
    const count = lines.length;
    let numbers = '';
    for (let i = 1; i <= count; i++) {
      numbers += i + '\n';
    }
    lineNumbers.textContent = numbers;
  }

  /**
   * Handle Tab key in editor (insert 4 spaces)
   */
  function handleEditorKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      const val = codeEditor.value;
      const indent = '    '; // 4 spaces
      
      codeEditor.value = val.substring(0, start) + indent + val.substring(end);
      codeEditor.selectionStart = codeEditor.selectionEnd = start + indent.length;
      
      if (currentProblem) {
        saveCodeToCache(currentProblem.id, activeLang, codeEditor.value);
      }
      updateLineNumbers();
    }
  }

  /**
   * Reset code back to starter template
   */
  function resetCode() {
    if (!currentProblem) return;
    if (!confirm(`Reset Question ${currentProblem.id} (${activeLang.toUpperCase()}) code back to the initial starter template?`)) {
      return;
    }
    const starter = currentProblem.starterCode[activeLang] || '';
    codeEditor.value = starter;
    saveCodeToCache(currentProblem.id, activeLang, starter);
    updateLineNumbers();

    consoleOutput.textContent = `Reset Question ${currentProblem.id} (${activeLang.toUpperCase()}) code to initial starter template.`;
    consoleOutput.className = 'terminal-output';
    consoleStatus.textContent = 'Ready';
  }

  /**
   * Execute code with custom input
   */
  async function runCustomCode() {
    if (currentProblem) {
      saveCodeToCache(currentProblem.id, activeLang, codeEditor.value);
    }
    const input = customStdin.value;

    consoleStatus.textContent = 'Executing...';
    consoleOutput.textContent = `⚡ [${activeLang.toUpperCase()}] Compiling & executing with custom stdin...`;
    consoleOutput.className = 'terminal-output';

    if (consoleDrawer.classList.contains('collapsed')) {
      toggleConsoleDrawer();
    }

    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: activeLang,
          code: codeEditor.value,
          input: input
        })
      });

      const data = await res.json();
      consoleStatus.textContent = `Finished in ${data.executionTimeMs}ms`;

      let log = `=== Execution Result (${activeLang.toUpperCase()}) ===\n`;
      log += `Runtime: ${data.executionTimeMs}ms | Exit Code: ${data.exitCode}\n\n`;

      if (data.stdout) {
        log += `--- Standard Output (stdout) ---\n${data.stdout}\n`;
      }
      if (data.stderr) {
        log += `--- Standard Error / Diagnostics (stderr) ---\n${data.stderr}\n`;
      }
      if (!data.stdout && !data.stderr) {
        log += `(No output produced)\n`;
      }

      consoleOutput.textContent = log;
      consoleOutput.className = data.exitCode === 0 ? 'terminal-output success' : 'terminal-output error';

      // Update Custom I/O tab display
      customStdout.textContent = data.stdout || '(No output produced)';
      customStdout.className = 'io-preview' + (data.stdout ? '' : ' empty-stdout');
      customExecMeta.textContent = `⏱️ ${data.executionTimeMs}ms • Exit: ${data.exitCode}`;

    } catch (err) {
      consoleStatus.textContent = 'Execution Error';
      consoleOutput.textContent = `System Error: ${err.message}`;
      consoleOutput.className = 'terminal-output error';
    }
  }

  /**
   * Run full assessment test suite
   */
  async function runTestSuite() {
    if (currentProblem) {
      saveCodeToCache(currentProblem.id, activeLang, codeEditor.value);
    }

    // Switch to test results tab
    switchSidebarTab('tests');

    testSummaryBadge.textContent = 'Running...';
    testSummaryBadge.className = 'test-counter';
    testProgressBar.style.width = '25%';

    testResultsList.innerHTML = `
      <div class="empty-tests-state">
        <span class="empty-icon">⏳</span>
        <p>Compiling and evaluating your <strong>${activeLang.toUpperCase()}</strong> solution across all assessment test cases...</p>
      </div>
    `;

    consoleStatus.textContent = 'Evaluating tests...';
    consoleOutput.textContent = `🚀 [${activeLang.toUpperCase()}] Running complete assessment test suite for Question ${currentProblem ? currentProblem.id : 1}...`;
    consoleOutput.className = 'terminal-output';

    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: activeLang,
          code: codeEditor.value,
          problemId: currentProblem ? currentProblem.id : 1
        })
      });

      const data = await res.json();
      renderTestResults(data);

      if (data.allPassed && currentProblem) {
        markProblemSolved(currentProblem.id);
      }

    } catch (err) {
      testSummaryBadge.textContent = 'Error';
      testSummaryBadge.className = 'test-counter failing';
      testResultsList.innerHTML = `
        <div class="test-card failed">
          <div class="test-card-name">Execution Failure</div>
          <div class="test-error-box">${escapeHtml(err.message)}</div>
        </div>
      `;
      consoleOutput.textContent = `Test Runner Failure: ${err.message}`;
      consoleOutput.className = 'terminal-output error';
    }
  }

  /**
   * Render assessment test results
   */
  function renderTestResults(data) {
    const { passedCount, totalCount, allPassed, results } = data;

    // Update badges and progress
    testBadgeCounter.textContent = `${passedCount}/${totalCount}`;
    testBadgeCounter.className = 'badge-counter' + (allPassed ? ' passed' : '');

    testSummaryBadge.textContent = `${passedCount} / ${totalCount} Passed`;
    testSummaryBadge.className = 'test-counter ' + (allPassed ? 'success' : 'failing');

    const pct = Math.round((passedCount / totalCount) * 100);
    testProgressBar.style.width = `${pct}%`;

    // Render cards
    testResultsList.innerHTML = '';
    results.forEach(res => {
      const card = document.createElement('div');
      card.className = 'test-card ' + (res.passed ? 'passed' : 'failed');

      card.innerHTML = `
        <div class="test-card-top">
          <span class="test-card-name">${escapeHtml(res.name)}</span>
          <span class="test-card-pill ${res.passed ? 'passed' : 'failed'}">
            ${res.passed ? '✓ PASSED' : '✗ FAILED'}
          </span>
        </div>

        <div class="test-details-grid">
          <div class="test-detail-box">
            <div class="test-detail-title">Expected Output</div>
            <pre>${escapeHtml(res.expected)}</pre>
          </div>
          <div class="test-detail-box">
            <div class="test-detail-title">Your Output</div>
            <pre style="color: ${res.passed ? '#34d399' : '#f87171'}">${escapeHtml(res.actual || '(no output)')}</pre>
          </div>
          <div class="test-detail-box full">
            <div class="test-detail-title">Input (stdin)</div>
            <pre>${escapeHtml(res.input)}</pre>
          </div>
          ${res.stderr ? `
            <div class="test-error-box">
              <strong>Error / Traceback:</strong>\n${escapeHtml(res.stderr)}
            </div>
          ` : ''}
        </div>

        <div class="test-runtime">
          <span>⏱️ Execution Time: ${res.executionTimeMs}ms</span>
          ${res.timedOut ? ' • <strong style="color:#f87171">Time Limit Exceeded</strong>' : ''}
        </div>
      `;

      testResultsList.appendChild(card);
    });

    // Console summary
    let consoleLog = `=== Test Suite Evaluation Complete (Q${currentProblem ? currentProblem.id : ''}) ===\n`;
    consoleLog += `Results: ${passedCount} / ${totalCount} Passed (${pct}%)\n`;
    if (allPassed) {
      consoleLog += `🎉 All test cases passed successfully! Marked as solved.\n`;
    } else {
      consoleLog += `⚠️ Some test cases failed. Inspect the test results tab for inputs and diffs.\n`;
    }
    consoleOutput.textContent = consoleLog;
    consoleOutput.className = allPassed ? 'terminal-output success' : 'terminal-output error';
    consoleStatus.textContent = allPassed ? 'All Tests Passed' : 'Tests Failed';
  }

  /**
   * Toggle console drawer collapse
   */
  function toggleConsoleDrawer() {
    const isCollapsed = consoleDrawer.classList.toggle('collapsed');
    toggleConsoleIcon.textContent = isCollapsed ? '▲' : '▼';
  }

  /**
   * Escape HTML utility
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Initialize Event Listeners
   */
  function initEventListeners() {
    // Navigation strip
    prevProblemBtn.addEventListener('click', () => switchProblem(currentProblemId - 1));
    nextProblemBtn.addEventListener('click', () => switchProblem(currentProblemId + 1));
    problemQuickSelect.addEventListener('change', (e) => switchProblem(parseInt(e.target.value, 10)));

    // Keyboard navigation (Alt+ArrowLeft / Alt+ArrowRight)
    window.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        switchProblem(currentProblemId - 1);
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        switchProblem(currentProblemId + 1);
      }
    });

    // Hash change routing
    window.addEventListener('hashchange', () => {
      const match = window.location.hash.match(/q=(\d+)/);
      if (match && match[1]) {
        const id = parseInt(match[1], 10);
        if (id !== currentProblemId && id >= 1 && id <= (allProblemsList.length || 10)) {
          switchProblem(id);
        }
      }
    });

    // Language switcher
    btnLangPython.addEventListener('click', () => switchLanguage('python'));
    btnLangJava.addEventListener('click', () => switchLanguage('java'));

    // Tabs
    tabBtnDesc.addEventListener('click', () => switchSidebarTab('description'));
    tabBtnTests.addEventListener('click', () => switchSidebarTab('tests'));
    tabBtnCustomIo.addEventListener('click', () => switchSidebarTab('customio'));

    // Code Editor events
    codeEditor.addEventListener('input', () => {
      if (currentProblem) {
        saveCodeToCache(currentProblem.id, activeLang, codeEditor.value);
      }
      updateLineNumbers();
    });
    codeEditor.addEventListener('keydown', handleEditorKeyDown);
    codeEditor.addEventListener('scroll', () => {
      lineNumbers.scrollTop = codeEditor.scrollTop;
    });

    // Action buttons
    resetBtn.addEventListener('click', resetCode);
    runCustomBtn.addEventListener('click', runCustomCode);
    runCustomFromTabBtn.addEventListener('click', runCustomCode);
    runTestsBtn.addEventListener('click', runTestSuite);

    // Console controls
    clearConsoleBtn.addEventListener('click', () => {
      consoleOutput.textContent = 'Console cleared.';
      consoleOutput.className = 'terminal-output';
      consoleStatus.textContent = 'Ready';
    });
    toggleConsoleBtn.addEventListener('click', toggleConsoleDrawer);
  }

  // Initialize
  async function init() {
    initEventListeners();

    // Check hash for starting problem
    const match = window.location.hash.match(/q=(\d+)/);
    if (match && match[1]) {
      const parsed = parseInt(match[1], 10);
      if (parsed >= 1 && parsed <= 10) {
        currentProblemId = parsed;
      }
    }

    await loadProblemsList();
    renderNavigation();
    await loadProblem(currentProblemId);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
