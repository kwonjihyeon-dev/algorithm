# Alternating Characters

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

You are given a string containing characters $A$ and $B$ only.  Your task is to change it into a string such that there are no matching adjacent characters. To do this, you are allowed to delete zero or more characters in the string.  

Your task is to find the minimum number of required deletions.

**Example**  
$s = AABAAB$  

Remove an $A$ at positions $0$ and $3$ to make $s = ABAB$ in $2$ deletions.

**Function Description**

Complete the *alternatingCharacters* function in the editor below.  

alternatingCharacters has the following parameter(s):

- *string s*: a string  

**Returns**  

- *int:* the minimum number of deletions required

**Input Format**

The first line contains an integer $q$, the number of queries.  
The next $q$ lines each contain a string $s$ to analyze.

**Constraints**

- $ 1 \le q \le 10$  
- $ 1 \le \text{ length of s }\le 10^5$
- Each string $s$ will consist only of characters $A$ and $B$.

**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-19T04:57:16.382Z  

```js
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'alternatingCharacters' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternatingCharacters(s) {
    let count = 0;

    const pair = {'A': 'B', 'B': 'A'}
    
    for (let i = 0; i < s.length - 1; i++) {
      const word = s[i];
      if (pair[word] !== s[i+1]) {
        count++
      }
    }
    return count
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = alternatingCharacters(s);

        ws.write(result + '\n');
    }

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/alternating-characters/problem)