/**
 * Accenture 2027 Real-Exam DSA Practice Series — Problem Bank
 * Strictly zero hints, solutions, or formula spoilers included.
 */

const PROBLEMS = [
  {
    id: 1,
    title: "Question 1 — Missing Roll Number",
    difficulty: "EASY",
    concept: "Array Searching & Numbers",
    description: "Ravi is a class monitor responsible for attendance. He has a list of roll numbers of students who submitted their assignment, out of n total students numbered 1 to n. Exactly ONE student did not submit. Given the list and the value of n, find the roll number of the student who did NOT submit.",
    inputSpec: [
      "Line 1: Space-separated integers representing the roll numbers who submitted.",
      "Line 2: An integer n, the total number of students (numbered 1 to n)."
    ],
    outputSpec: "Print a single integer representing the missing roll number to standard output.",
    examples: [
      {
        input: "1 2 4 5 6\n6",
        output: "3",
        explanation: "Roll numbers 1 to 6 should all appear once. Only 3 is missing from the list."
      },
      {
        input: "2 3 1 5\n5",
        output: "4",
        explanation: "Roll numbers 1 to 5 should all appear once. Only 4 is missing from the list."
      }
    ],
    constraints: [
      "1 <= n <= 100,000",
      "List contains exactly n - 1 distinct integers",
      "All roll numbers are in the range [1, n]",
      "Exactly one roll number is missing"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: Space-separated submitted roll numbers
    # Line 2: Total number of students (n)

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        // Read input from standard input:
        // Line 1: Space-separated submitted roll numbers
        // Line 2: Total number of students (n)

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1)",
        input: "1 2 4 5 6\n6",
        expected: "3"
      },
      {
        name: "Test Case 2 (Example 2 - Unordered list)",
        input: "2 3 1 5\n5",
        expected: "4"
      },
      {
        name: "Test Case 3 (Missing First Element: roll number 1)",
        input: "2 3 4\n4",
        expected: "1"
      },
      {
        name: "Test Case 4 (Missing Last Element: roll number n)",
        input: "1 2 3 4 5 6 7\n8",
        expected: "8"
      },
      {
        name: "Test Case 5 (Larger Unordered Permutation)",
        input: "10 8 7 5 3 2 1 4 9\n10",
        expected: "6"
      }
    ]
  },
  {
    id: 2,
    title: "Question 2 — Priya's Code Editor Bracket Checker",
    difficulty: "EASY",
    concept: "Bracket Matching & String Parsing",
    description: "Priya is building a simple code editor. Before running any code, she wants to check whether all brackets are correctly matched and nested. Given a string containing only the characters '(', ')', '{', '}', '[' and ']', determine if the brackets are balanced — every opening bracket must be closed by the same TYPE of bracket, in the correct order.",
    inputSpec: [
      "Line 1: A string S containing only bracket characters ('(', ')', '{', '}', '[', ']')."
    ],
    outputSpec: "Print true if the brackets are balanced, false otherwise.",
    examples: [
      {
        input: "{[()()]}",
        output: "true",
        explanation: "Every bracket closes in the correct order: () then () inside [], all inside {}."
      },
      {
        input: "{[(])}",
        output: "false",
        explanation: "The ']' appears before the '(' that opened before it is closed — wrong nesting order, so it's unbalanced."
      }
    ],
    constraints: [
      "1 <= length of S <= 100,000",
      "S contains only characters '(', ')', '{', '}', '[', ']'"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: String S containing bracket characters

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        // Read input from standard input:
        // Line 1: String S containing bracket characters

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Nested & Sibling Balanced)",
        input: "{[()()]}",
        expected: "true"
      },
      {
        name: "Test Case 2 (Example 2: Interleaved Unbalanced)",
        input: "{[(])}",
        expected: "false"
      },
      {
        name: "Test Case 3 (Single Opening Bracket)",
        input: "[",
        expected: "false"
      },
      {
        name: "Test Case 4 (Leading Closing Bracket)",
        input: "]()",
        expected: "false"
      },
      {
        name: "Test Case 5 (Deeply Nested Balanced)",
        input: "((({{{[[[]]]}}})))",
        expected: "true"
      }
    ]
  },
  {
    id: 3,
    title: "Question 3 — Support Ticket First Unique Character",
    difficulty: "EASY-MEDIUM",
    concept: "String Scanning & Frequency",
    description: "A support system auto-generates ticket reference codes using lowercase letters. The system wants to highlight the FIRST character in a ticket code that does NOT repeat anywhere else in that code, as a quick visual identifier. If every character repeats at least once, no identifier is possible.",
    inputSpec: [
      "Line 1: A string S representing the ticket code (lowercase letters only)."
    ],
    outputSpec: "Print an integer representing the 0-based index of the first non-repeating character. If no such character exists, print -1.",
    examples: [
      {
        input: "swiss",
        output: "1",
        explanation: "'s' repeats (indices 0,3), 'w' at index 1 never repeats again — it is the first non-repeating character."
      },
      {
        input: "aabb",
        output: "-1",
        explanation: "Every character in 'aabb' appears more than once, so no unique character exists — return -1."
      }
    ],
    constraints: [
      "1 <= length of S <= 100,000",
      "S consists of only lowercase English letters ('a'-'z')"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: String S representing the ticket code

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        // Read input from standard input:
        // Line 1: String S representing the ticket code

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: First unique character in middle)",
        input: "swiss",
        expected: "1"
      },
      {
        name: "Test Case 2 (Example 2: All duplicate characters)",
        input: "aabb",
        expected: "-1"
      },
      {
        name: "Test Case 3 (First character is unique at index 0)",
        input: "leetcode",
        expected: "0"
      },
      {
        name: "Test Case 4 (Single character string)",
        input: "z",
        expected: "0"
      },
      {
        name: "Test Case 5 (Unique character at the very end)",
        input: "aabbccdde",
        expected: "8"
      }
    ]
  },
  {
    id: 4,
    title: "Question 4 — Library Word Grouping (Anagram Sorter)",
    difficulty: "MEDIUM",
    concept: "String Manipulation & Hashing",
    description: "A digital library catalogue system wants to automatically group book-tag words that are ANAGRAMS of one another (contain exactly the same letters, rearranged) into the same shelf category, so related tags stay together regardless of the exact spelling order.",
    inputSpec: [
      "Line 1: Space-separated lowercase word strings."
    ],
    outputSpec: "Print each anagram group on a separate line (with words separated by spaces), or as a list of lists. The order of groups and words within a group does not matter.",
    examples: [
      {
        input: "eat tea tan ate nat bat",
        output: "ate eat tea\nbat\nnat tan",
        explanation: "'eat', 'tea', 'ate' all contain the same letters (a, e, t) — one group. 'tan' and 'nat' share (a, n, t) — another group. 'bat' has no anagram partner, so it forms its own single-word group."
      },
      {
        input: "cat dog",
        output: "cat\ndog",
        explanation: "Neither word shares letters with the other, so each forms its own separate group of one."
      }
    ],
    constraints: [
      "1 <= total number of words <= 10,000",
      "1 <= length of each word <= 100",
      "Words consist of lowercase English letters ('a'-'z')"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: Space-separated lowercase words

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        // Read input from standard input:
        // Line 1: Space-separated lowercase words

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Multiple Anagram Clusters)",
        input: "eat tea tan ate nat bat",
        expected: "ate eat tea\nbat\nnat tan"
      },
      {
        name: "Test Case 2 (Example 2: All Distinct Words)",
        input: "cat dog",
        expected: "cat\ndog"
      },
      {
        name: "Test Case 3 (All Words Form One Single Group)",
        input: "listen silent enlist tinsel",
        expected: "enlist listen silent tinsel"
      },
      {
        name: "Test Case 4 (Single Word)",
        input: "hello",
        expected: "hello"
      },
      {
        name: "Test Case 5 (Varying Lengths & Partial Overlaps)",
        input: "a b ba ab c bc cb abc",
        expected: "a\nab ba\nabc\nb\nbc cb\nc"
      }
    ]
  },
  {
    id: 5,
    title: "Question 5 — Password Strength Scanner — Longest Unique Run",
    difficulty: "MEDIUM",
    concept: "Substring Analysis & Windowing",
    description: "A password strength tool flags passwords containing long repeated-character patterns as weak. As part of the analysis, it needs to find the length of the LONGEST substring within the password that contains NO repeating characters — a longer such run generally indicates better variety.",
    inputSpec: [
      "Line 1: A string S representing the password (mixed characters)."
    ],
    outputSpec: "Print an integer representing the length of the longest substring with no repeating characters.",
    examples: [
      {
        input: "abcabcbb",
        output: "3",
        explanation: "The longest run without any repeated character is 'abc' (length 3) — extending further to include the next 'a' would repeat a character already in the current run."
      },
      {
        input: "pwwkew",
        output: "3",
        explanation: "The longest such run is 'wke' (length 3). Note 'pwke' is NOT valid since it isn't contiguous in that form — only true substrings count."
      }
    ],
    constraints: [
      "0 <= length of S <= 100,000",
      "S consists of English letters, digits, symbols, and spaces"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: String S representing the password

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        // Read input from standard input:
        // Line 1: String S representing the password

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Multiple Substring Repeats)",
        input: "abcabcbb",
        expected: "3"
      },
      {
        name: "Test Case 2 (Example 2: Contiguous Repeated Letters)",
        input: "pwwkew",
        expected: "3"
      },
      {
        name: "Test Case 3 (All Identical Characters)",
        input: "bbbbb",
        expected: "1"
      },
      {
        name: "Test Case 4 (Substring with Early Duplicates)",
        input: "tmmzuxt",
        expected: "5"
      },
      {
        name: "Test Case 5 (All Unique Characters)",
        input: "abcdef",
        expected: "6"
      }
    ]
  },
  {
    id: 6,
    title: "Question 6 — Finance Team Budget Pair Finder",
    difficulty: "MEDIUM",
    concept: "Array Index Lookup & Pairing",
    description: "A finance analyst has a list of project costs and a fixed total budget. She wants to find TWO DIFFERENT projects whose combined cost EXACTLY equals the available budget, so both can be funded together with nothing left over. Assume exactly one such pair exists.",
    inputSpec: [
      "Line 1: Space-separated integers representing project costs.",
      "Line 2: An integer representing the total available budget."
    ],
    outputSpec: "Print two 0-based indices representing the two projects whose costs sum exactly to the budget (separated by a space or as [i, j]).",
    examples: [
      {
        input: "200 450 100 300\n550",
        output: "1 2",
        explanation: "costs[1] + costs[2] = 450 + 100 = 550, matching the budget exactly."
      },
      {
        input: "500 500\n1000",
        output: "0 1",
        explanation: "costs[0] + costs[1] = 500 + 500 = 1000, the only possible pair."
      }
    ],
    constraints: [
      "2 <= number of projects <= 100,000",
      "1 <= cost of each project <= 1,000,000,000",
      "1 <= budget <= 2,000,000,000",
      "Exactly one valid pair of different project indices exists"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: Space-separated project costs
    # Line 2: Total budget

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        // Read input from standard input:
        // Line 1: Space-separated project costs
        // Line 2: Total budget

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Mid-Array Match)",
        input: "200 450 100 300\n550",
        expected: "1 2"
      },
      {
        name: "Test Case 2 (Example 2: Identical Value Elements)",
        input: "500 500\n1000",
        expected: "0 1"
      },
      {
        name: "Test Case 3 (Pair at Extreme Boundary Ends)",
        input: "10 25 35 70 90\n100",
        expected: "0 4"
      },
      {
        name: "Test Case 4 (Two Elements Only)",
        input: "3 7\n10",
        expected: "0 1"
      },
      {
        name: "Test Case 5 (Larger Array with Multiple Candidate Values)",
        input: "1200 4500 8000 3100 9500 6200\n12600",
        expected: "3 4"
      }
    ]
  },
  {
    id: 7,
    title: "Question 7 — Conference Room Booking Merger",
    difficulty: "MEDIUM-HARD",
    concept: "Interval Scheduling & Merging",
    description: "An office booking system logs meeting time slots as [start, end] hour pairs (24-hour format). Before displaying the day's schedule, the system must MERGE any OVERLAPPING or back-to-back bookings into a single combined slot, so the final schedule shows only the truly distinct busy periods.",
    inputSpec: [
      "Line 1: An integer n representing the number of booked intervals.",
      "Next n lines: Two space-separated integers (start end) representing each interval."
    ],
    outputSpec: "Print each merged interval on a separate line as two space-separated integers (start end), or as a list of pairs [start, end]. Intervals should be sorted by start time.",
    examples: [
      {
        input: "3\n9 10\n10 12\n13 14",
        output: "9 12\n13 14",
        explanation: "9 10 and 10 12 touch at hour 10, so they merge into 9 12. 13 14 stays separate."
      },
      {
        input: "3\n1 3\n2 6\n8 10",
        output: "1 6\n8 10",
        explanation: "1 3 and 2 6 overlap (hour 2 falls inside 1 3), merging into 1 6. 8 10 doesn't overlap with that merged slot, so it stays separate."
      }
    ],
    constraints: [
      "0 <= number of booking slots <= 10,000",
      "0 <= start <= end <= 1,000,000,000",
      "Slots can be given in unsorted order",
      "Touching/adjacent slots (where end_a == start_b) must be merged"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: n (number of intervals)
    # Next n lines: start end

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Read input from standard input:
        // Line 1: n (number of intervals)
        // Next n lines: start end

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Back-to-back Touching Intervals)",
        input: "3\n9 10\n10 12\n13 14",
        expected: "9 12\n13 14"
      },
      {
        name: "Test Case 2 (Example 2: Overlapping Intervals)",
        input: "3\n1 3\n2 6\n8 10",
        expected: "1 6\n8 10"
      },
      {
        name: "Test Case 3 (Unsorted Input with Nested Intervals)",
        input: "3\n15 18\n1 4\n2 5",
        expected: "1 5\n15 18"
      },
      {
        name: "Test Case 4 (All Intervals Merge into Single Span)",
        input: "4\n1 4\n0 2\n3 8\n8 10",
        expected: "0 10"
      },
      {
        name: "Test Case 5 (Completely Disjoint Intervals)",
        input: "3\n1 2\n5 6\n9 10",
        expected: "1 2\n5 6\n9 10"
      }
    ]
  },
  {
    id: 8,
    title: "Question 8 — Warehouse Robot Grid Rotation",
    difficulty: "MEDIUM-HARD",
    concept: "2D Matrix Transformation",
    description: "An automated warehouse uses a square grid to track shelf positions, viewed from above. When the warehouse layout is reorganised, the entire grid must be rotated 90 degrees CLOCKWISE in place, so the robot's navigation system reads the new shelf arrangement correctly.",
    inputSpec: [
      "Line 1: An integer n representing the dimension of the n x n square grid.",
      "Next n lines: n space-separated integers representing each row of the matrix."
    ],
    outputSpec: "Print the rotated matrix with each row on a new line (values space-separated), or as a 2D list.",
    examples: [
      {
        input: "3\n1 2 3\n4 5 6\n7 8 9",
        output: "7 4 1\n8 5 2\n9 6 3",
        explanation: "The first column of the original (1, 4, 7), read top-to-bottom, becomes the first row of the rotated result."
      },
      {
        input: "2\n1 2\n3 4",
        output: "3 1\n4 2",
        explanation: "For a 2x2 grid, column (1, 3) becomes the new first row (3, 1)."
      }
    ],
    constraints: [
      "1 <= n <= 100",
      "-1,000,000 <= grid[i][j] <= 1,000,000",
      "The input grid is always square (n x n)"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: n (size of n x n matrix)
    # Next n lines: space-separated row values

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Read input from standard input:
        // Line 1: n (size of n x n matrix)
        // Next n lines: space-separated row values

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: 3x3 Grid)",
        input: "3\n1 2 3\n4 5 6\n7 8 9",
        expected: "7 4 1\n8 5 2\n9 6 3"
      },
      {
        name: "Test Case 2 (Example 2: 2x2 Grid)",
        input: "2\n1 2\n3 4",
        expected: "3 1\n4 2"
      },
      {
        name: "Test Case 3 (Single Element 1x1 Grid)",
        input: "1\n5",
        expected: "5"
      },
      {
        name: "Test Case 4 (4x4 Grid with Sequential Values)",
        input: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
        expected: "13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4"
      },
      {
        name: "Test Case 5 (Grid with Duplicate & Zero Values)",
        input: "2\n0 0\n0 1",
        expected: "0 0\n1 0"
      }
    ]
  },
  {
    id: 9,
    title: "Question 9 — Delivery Drone Shortest Path",
    difficulty: "HARD",
    concept: "Grid Pathfinding & Search",
    description: "A delivery drone operates over a city represented as a grid, where some cells are blocked by NO-FLY ZONES (marked 1) and others are open airspace (marked 0). The drone can move only Up, Down, Left, or Right one cell at a time, and can never enter a no-fly cell. Find the minimum number of moves for the drone to travel from its start position to the delivery destination.",
    inputSpec: [
      "Line 1: Two space-separated integers: rows cols",
      "Next rows lines: cols space-separated integers (0 for open airspace, 1 for no-fly zone)",
      "Next line: Two space-separated integers: start_row start_col",
      "Next line: Two space-separated integers: dest_row dest_col"
    ],
    outputSpec: "Print an integer representing the minimum number of moves to reach the destination, or -1 if impossible.",
    examples: [
      {
        input: "4 4\n0 0 0 0\n1 1 0 1\n0 0 0 0\n0 1 1 0\n0 0\n3 3",
        output: "6",
        explanation: "One valid shortest route navigates around the two no-fly blocks in exactly 6 moves."
      },
      {
        input: "2 2\n0 1\n1 0\n0 0\n1 1",
        output: "-1",
        explanation: "The destination is completely walled off by no-fly cells on both possible approach sides, so no path exists."
      }
    ],
    constraints: [
      "1 <= rows, cols <= 100",
      "0 <= start[0], destination[0] < rows",
      "0 <= start[1], destination[1] < cols",
      "Grid cells contain only 0 (open airspace) or 1 (no-fly zone)"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: rows cols
    # Next rows lines: space-separated 0s and 1s
    # Next line: start_row start_col
    # Next line: dest_row dest_col

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Read input from standard input:
        // Line 1: rows cols
        // Next rows lines: space-separated 0s and 1s
        // Next line: start_row start_col
        // Next line: dest_row dest_col

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Multiple Blockages with Path)",
        input: "4 4\n0 0 0 0\n1 1 0 1\n0 0 0 0\n0 1 1 0\n0 0\n3 3",
        expected: "6"
      },
      {
        name: "Test Case 2 (Example 2: Destination Walled Off)",
        input: "2 2\n0 1\n1 0\n0 0\n1 1",
        expected: "-1"
      },
      {
        name: "Test Case 3 (Start Position Equals Destination)",
        input: "2 2\n0 0\n0 0\n0 0\n0 0",
        expected: "0"
      },
      {
        name: "Test Case 4 (Start Position on No-Fly Block)",
        input: "2 2\n1 0\n0 0\n0 0\n1 1",
        expected: "-1"
      },
      {
        name: "Test Case 5 (Long Winding Path Around Obstacles)",
        input: "3 5\n0 1 0 0 0\n0 1 0 1 0\n0 0 0 1 0\n0 0\n0 4",
        expected: "8"
      }
    ]
  },
  {
    id: 10,
    title: "Question 10 — ATM Minimum Note Dispenser",
    difficulty: "HARD",
    concept: "Optimization & State Decision",
    description: "An ATM needs to dispense a requested cash amount using the MINIMUM possible number of currency notes, given the note denominations it currently stocks. Assume an unlimited supply of each denomination is available. Determine the fewest notes needed to make the exact amount.",
    inputSpec: [
      "Line 1: Space-separated integers or JSON list representing available note denominations.",
      "Line 2: An integer representing the exact cash amount to dispense."
    ],
    outputSpec: "Print an integer representing the minimum number of notes needed, or -1 if impossible.",
    examples: [
      {
        input: "1 2 5\n11",
        output: "3",
        explanation: "11 = 5 + 5 + 1, using exactly 3 notes. No combination of these denominations can make 11 using fewer notes."
      },
      {
        input: "2\n3",
        output: "-1",
        explanation: "Only denomination 2 is available, which cannot sum to the odd amount 3, so return -1."
      }
    ],
    constraints: [
      "1 <= number of denominations <= 100",
      "1 <= denomination value <= 10,000",
      "0 <= target amount <= 100,000"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: Space-separated note denominations
    # Line 2: Target amount to dispense
    raw = sys.stdin.read().strip()
    if not raw:
        return

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Read input from standard input:
        // Line 1: Space-separated note denominations
        // Line 2: Target amount to dispense
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) return;
        String line2 = br.readLine();

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Multiple Denominations)",
        input: "1 2 5\n11",
        expected: "3"
      },
      {
        name: "Test Case 2 (Example 2: Impossible Target Amount)",
        input: "2\n3",
        expected: "-1"
      },
      {
        name: "Test Case 3 (Zero Target Amount)",
        input: "1 5 10\n0",
        expected: "0"
      },
      {
        name: "Test Case 4 (Suboptimal Greedy Counterexample)",
        input: "1 3 4\n6",
        expected: "2"
      },
      {
        name: "Test Case 5 (Multiple Currency Combinations)",
        input: "2 5 10 20 50\n97",
        expected: "5"
      }
    ]
  },
  {
    id: 11,
    title: "Question 11 — Minimum Operations to Make Characters Identical",
    difficulty: "EASY",
    concept: "Strings & Frequency Counting",
    description: "Given a string s, you have to make all characters in the string identical. In one operation, you can replace any character in the string with any other character. What is the minimum number of operations required to make all characters in the string identical?",
    inputSpec: [
      "Line 1: A single string s consisting of alphanumeric or printable characters."
    ],
    outputSpec: "Print a single integer representing the minimum number of operations required to make all characters in the string identical.",
    examples: [
      {
        input: "aab",
        output: "1",
        explanation: "Replace 'b' with 'a' to get 'aaa' where all characters are identical. Exactly 1 operation is required."
      },
      {
        input: "abcde",
        output: "4",
        explanation: "All 5 characters are distinct. Choosing one character to keep and replacing the other 4 characters requires 4 operations."
      },
      {
        input: "aaaa",
        output: "0",
        explanation: "All characters in the string are already identical. 0 operations are required."
      }
    ],
    constraints: [
      "1 <= length of s <= 100,000",
      "s consists of letters, digits, or standard printable characters without whitespace"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: A single string s
    raw = sys.stdin.read().strip()
    if not raw:
        print(0)
        return

    # TODO: Write your solution from scratch
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Read input from standard input:
        // Line 1: A single string s
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null || s.trim().isEmpty()) {
            System.out.println(0);
            return;
        }
        s = s.trim();

        // TODO: Write your solution from scratch
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Single Replacement)",
        input: "aab",
        expected: "1"
      },
      {
        name: "Test Case 2 (Example 2: All Distinct Characters)",
        input: "abcde",
        expected: "4"
      },
      {
        name: "Test Case 3 (Example 3: Already All Identical)",
        input: "aaaa",
        expected: "0"
      },
      {
        name: "Test Case 4 (Single Character String)",
        input: "z",
        expected: "0"
      },
      {
        name: "Test Case 5 (Repeated Multi-Character String)",
        input: "abacaba",
        expected: "3"
      }
    ]
  },
  {
    id: 12,
    title: "Question 12 — Target Sum Pair with Maximum Product",
    difficulty: "EASY-MEDIUM",
    concept: "Two Pointers, Hash Map & Math",
    description: "Given an integer array nums and a target value T, find all pairs of elements (a, b) such that a + b = T. Among all such pairs, select the pair that produces the MAXIMUM product (a * b). Output the winning pair in the format (big, small), where big >= small. If no valid pair sums to T, print 'No Pair'.",
    inputSpec: [
      "Line 1: Space-separated integers representing the array nums.",
      "Line 2: An integer T representing the target sum."
    ],
    outputSpec: "Print the pair with maximum product formatted as (big, small). If no pair exists, print 'No Pair'.",
    examples: [
      {
        input: "1 4 3 6 7 2 5\n8",
        output: "(5, 3)",
        explanation: "Pairs with sum 8 are (1, 7) [product 7], (2, 6) [product 12], and (3, 5) [product 15]. The maximum product is 15 from (3, 5). Formatted as (big, small) -> (5, 3)."
      },
      {
        input: "2 4 8 1 9 3\n11",
        output: "(8, 3)",
        explanation: "Pairs with sum 11 are (2, 9) [product 18] and (8, 3) [product 24]. The maximum product is 24. Formatted as (big, small) -> (8, 3)."
      },
      {
        input: "-4 -1 2 5 -2 7\n3",
        output: "(5, -2)",
        explanation: "Pairs with sum 3 are (-4, 7) [product -28] and (5, -2) [product -10]. -10 is greater than -28. Formatted as (big, small) -> (5, -2)."
      }
    ],
    constraints: [
      "2 <= length of nums <= 100,000",
      "-100,000 <= nums[i] <= 100,000",
      "-200,000 <= T <= 200,000",
      "Elements in a pair must come from distinct array indices (i != j)"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: Space-separated integers representing nums
    # Line 2: An integer T representing target sum
    lines = sys.stdin.read().splitlines()
    if not lines:
        return
    
    nums = list(map(int, lines[0].strip().split()))
    T = int(lines[1].strip())

    # TODO: Write your solution from scratch
    # Find all pairs (a, b) such that a + b == T
    # Among those, pick the pair with maximum product (a * b)
    # Print formatted as (big, small) -> e.g. (5, 3)
    # If no pair exists, print "No Pair"
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Read input from standard input:
        // Line 1: Space-separated integers representing nums
        // Line 2: An integer T representing target sum
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) return;
        String line2 = br.readLine();
        if (line2 == null || line2.trim().isEmpty()) return;

        String[] parts = line1.trim().split("\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i]);
        }
        int T = Integer.parseInt(line2.trim());

        // TODO: Write your solution from scratch
        // Find all pairs (a, b) such that a + b == T
        // Among those, pick the pair with maximum product (a * b)
        // Print formatted as (big, small) -> e.g. (5, 3)
        // If no pair exists, print "No Pair"
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Positive Array)",
        input: "1 4 3 6 7 2 5\n8",
        expected: "(5, 3)"
      },
      {
        name: "Test Case 2 (Example 2: Multiple Candidate Pairs)",
        input: "2 4 8 1 9 3\n11",
        expected: "(8, 3)"
      },
      {
        name: "Test Case 3 (Negative Numbers & Higher Product)",
        input: "-4 -1 2 5 -2 7\n3",
        expected: "(5, -2)"
      },
      {
        name: "Test Case 4 (Identical Numbers / Duplicates)",
        input: "5 2 9 5 1\n10",
        expected: "(5, 5)"
      },
      {
        name: "Test Case 5 (No Valid Pair Exists)",
        input: "1 2 3 4\n20",
        expected: "No Pair"
      },
      {
        name: "Test Case 6 (Zero Included)",
        input: "0 10 2 8 4 6\n10",
        expected: "(6, 4)"
      }
    ]
  },
  {
    id: 13,
    title: "Question 13 — Alternating Pattern Scanner with Skip Jumps",
    difficulty: "EASY-MEDIUM",
    concept: "String Parsing & State Machine Scanner",
    description: "You are implementing a string traversal scanner that moves through a string looking for a strictly alternating pattern of character pairs, following precise skipping rules.\n\nCore Rules:\n1. Active Condition / State:\n   - State 1: A letter followed by a digit ([a-zA-Z][0-9]). The scanner always starts in State 1.\n   - State 2: A digit followed by a letter ([0-9][a-zA-Z]).\n   - Every time a match is found, the state alternates to the other state.\n\n2. Match Action:\n   - If characters at index j and j+1 match the active condition:\n     * Append both characters to the output.\n     * Skip the character immediately following the pair (index j+2).\n     * Move the scanner to index j+3 to resume scanning.\n\n3. Miss Action:\n   - If characters at index j and j+1 do NOT match the active condition:\n     * Advance the scanner forward by one space (to index j+1) and check again.",
    inputSpec: [
      "Line 1: A single string S containing letters, digits, and/or symbols."
    ],
    outputSpec: "Print the final concatenated output string of matched pairs. If no matching pairs are found, print an empty line.",
    examples: [
      {
        input: "a1b2c3d4",
        output: "a12cd4",
        explanation: "At j=0 ('a1'): matches State 1 (Letter-Digit). Output becomes 'a1'. Skip 'b' at idx 2, jump to j=3. State flips to State 2.\nAt j=3 ('2c'): matches State 2 (Digit-Letter). Output becomes 'a12c'. Skip '3' at idx 5, jump to j=6. State flips to State 1.\nAt j=6 ('d4'): matches State 1 (Letter-Digit). Output becomes 'a12cd4'. Scanner reaches end of string."
      },
      {
        input: "abc123d4e5",
        output: "c13de5",
        explanation: "j=0 ('ab') miss -> j=1 ('bc') miss -> j=2 ('c1') matches State 1. Output 'c1', skip '2' (idx 4), jump to j=5, switch to State 2.\nj=5 ('3d') matches State 2. Output 'c13d', skip '4' (idx 7), jump to j=8, switch to State 1.\nj=8 ('e5') matches State 1. Output 'c13de5'."
      },
      {
        input: "x9y8z7",
        output: "x98z",
        explanation: "j=0 ('x9') matches State 1. Output 'x9', skip 'y' (idx 2), jump to j=3, switch to State 2.\nj=3 ('8z') matches State 2. Output 'x98z', skip '7' (idx 5), jump to j=6 (end)."
      }
    ],
    constraints: [
      "1 <= length of S <= 100,000",
      "S contains printable characters without whitespace"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: A single string S
    raw = sys.stdin.read().splitlines()
    if not raw:
        return
    s = raw[0].strip()

    # TODO: Write your solution from scratch
    # Implement the scanner state machine:
    # State 1: [Letter][Digit] -> append, skip idx+2, jump to idx+3, switch to State 2
    # State 2: [Digit][Letter] -> append, skip idx+2, jump to idx+3, switch to State 1
    # Miss: advance by 1
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Read input from standard input:
        // Line 1: A single string S
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        if (s == null) return;
        s = s.trim();

        // TODO: Write your solution from scratch
        // Implement the scanner state machine:
        // State 1: [Letter][Digit] -> append, skip idx+2, jump to idx+3, switch to State 2
        // State 2: [Digit][Letter] -> append, skip idx+2, jump to idx+3, switch to State 1
        // Miss: advance by 1
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Standard Alternation)",
        input: "a1b2c3d4",
        expected: "a12cd4"
      },
      {
        name: "Test Case 2 (Example 2: Miss Traversal with Recovery)",
        input: "abc123d4e5",
        expected: "c13de5"
      },
      {
        name: "Test Case 3 (Example 3: Truncated Jumps at End)",
        input: "x9y8z7",
        expected: "x98z"
      },
      {
        name: "Test Case 4 (Single Pair Minimal Match)",
        input: "k9",
        expected: "k9"
      },
      {
        name: "Test Case 5 (All Letters / No Digit Matches)",
        input: "abcdefghij",
        expected: ""
      },
      {
        name: "Test Case 6 (Miss Handling After State Flip)",
        input: "m33p4q",
        expected: "m34q"
      }
    ]
  },
  {
    id: 14,
    title: "Question 14 — K-th Number Without Digit 7",
    difficulty: "EASY-MEDIUM",
    concept: "Base-9 Number System / Math & Radix Conversion",
    description: "You are given a positive integer K. Consider the sequence of positive integers starting from 1, but completely excluding every number that contains the digit '7' anywhere.\n\nFor example, the sequence begins:\n1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, ...\n(Notice that 7, 17, 27, 70-79, 107, etc. are omitted).\n\nGiven K, find and print the K-th number in this sequence.",
    inputSpec: [
      "Line 1: A single positive integer K."
    ],
    outputSpec: "Print a single integer representing the K-th number in the sequence without the digit 7.",
    examples: [
      {
        input: "7",
        output: "8",
        explanation: "The first 7 numbers in the sequence are 1, 2, 3, 4, 5, 6, 8. The 7th term is 8 (7 is excluded)."
      },
      {
        input: "18",
        output: "20",
        explanation: "The sequence terms up to the 18th term: 1..6 (6 numbers), 8..16 (9 numbers), 18..20 (3 numbers). Total count is 6 + 9 + 3 = 18 terms. The 18th term is 20 (7 and 17 are excluded)."
      },
      {
        input: "65",
        output: "82",
        explanation: "65 in base-9 is 72_9. Mapping digit 7 to 8 gives 82."
      }
    ],
    constraints: [
      "1 <= K <= 10^12",
      "K fits within standard 64-bit integer limits"
    ],
    starterCode: {
      python: `import sys

def main():
    # Read input from standard input:
    # Line 1: A single integer K
    raw = sys.stdin.read().strip()
    if not raw:
        return
    K = int(raw)

    # TODO: Write your solution from scratch
    # Find the K-th number in the sequence without digit 7
    pass

if __name__ == '__main__':
    main()
`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) throws Exception {
        // Read input from standard input:
        // Line 1: A single integer K
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) return;
        long K = Long.parseLong(line.trim());

        // TODO: Write your solution from scratch
        // Find the K-th number in the sequence without digit 7
    }
}
`
    },
    tests: [
      {
        name: "Test Case 1 (Example 1: Skips 7 to 8)",
        input: "7",
        expected: "8"
      },
      {
        name: "Test Case 2 (Example 2: Crosses 7 and 17 to 20)",
        input: "18",
        expected: "20"
      },
      {
        name: "Test Case 3 (Minimal Input: 1st Term)",
        input: "1",
        expected: "1"
      },
      {
        name: "Test Case 4 (Pre-Skip Boundary: 6th Term)",
        input: "6",
        expected: "6"
      },
      {
        name: "Test Case 5 (16th Term Skips 17 to 18)",
        input: "16",
        expected: "18"
      },
      {
        name: "Test Case 6 (Higher Value: 100th Term)",
        input: "100",
        expected: "121"
      },
      {
        name: "Test Case 7 (Large Value: 1000th Term)",
        input: "1000",
        expected: "1331"
      }
    ]
  }
];

module.exports = { PROBLEMS };


