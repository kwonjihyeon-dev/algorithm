# Two Strings

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)

## Problem

Given two strings, determine if they share a common substring.  A substring may be as small as one character.  

**Example**   
$s1 = \text{'and'}$  
$s2 = \text{'art'}$  

These share the common substring $a$.  

$s1 = \text{'be'}$  
$s2 = \text{'cat'}$  

These do not share a substring.  

**Function Description**

Complete the function *twoStrings* in the editor below.    

twoStrings has the following parameter(s):  

- *string s1:*  a string
- *string s2:*  another string    

**Returns**  

- *string:* either `YES` or `NO`

**Input Format**

The first line contains a single integer $p$, the number of test cases.		

The following $p$ pairs of lines are as follows:

- The first line contains string $s1$.
- The second line contains string $s2$.

**Constraints**

- $s1$ and $s2$ consist of characters in the range ascii[a-z].
- $1 \le p \le 10$
- $1 \le |s1|, |s2| \le 10^5$

**Output Format**

For each pair of strings, return `YES` or `NO`.

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-17T04:17:07.727Z  

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
 * Complete the 'twoStrings' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 * 
 */

function twoStrings(s1, s2) {
    for (const word of s1) {
        if (s2.includes(word)) {
            return 'YES'
        } 
    }
    
    return 'NO'
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s1 = readLine();

        const s2 = readLine();

        const result = twoStrings(s1, s2);

        ws.write(result + '\n');
    }

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/two-strings/problem)