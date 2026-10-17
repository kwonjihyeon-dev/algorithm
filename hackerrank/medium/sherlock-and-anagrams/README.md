# Sherlock and Anagrams

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

Two strings are [*anagrams*][123] of each other if the letters of one string can be rearranged to form the other string. Given a string, find the number of pairs of substrings of the string that are anagrams of each other.  

**Example**  
$s = mom$  

The list of all anagrammatic pairs is $[m, m], [mo, om]$ at positions $[[0], [2]], [[0, 1], [1, 2]]$ respectively.

[123]: http://en.wikipedia.org/wiki/Anagram  

**Function Description**

Complete the function *sherlockAndAnagrams* in the editor below.  

sherlockAndAnagrams has the following parameter(s):

-  *string s:* a string  

**Returns**  

- *int:* the number of unordered anagrammatic pairs of substrings in $s$

**Input Format**

The first line contains an integer $q$, the number of queries.   
Each of the next $q$ lines contains a string $s$ to analyze. 

**Constraints**

$1 \le q \le 10$   
$2 \le \text{ length of }s \le 100$  
$s$ contains only lowercase letters in the range ascii[a-z]. 

**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-17T06:11:20.550Z  

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
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function sherlockAndAnagrams(s) {
    const result = new Map();
    
    for (let i = 0; i < s.length; i++) {
      for (let j = i + 1; j <= s.length; j++) {
        const end = s.slice(i, j);
        if (end === s) break;
        const str = end.split('').sort().join('');
        
        let count = 0
        if (result.has(str)) {
          count = result.get(str);
        };
        
        result.set(str, ++count);
      }
    }
    
  return Array.from(result).reduce((value, cur) => {
    const [__, count] = cur;
    const current = count*(count-1)/2;
    return value + current;
  }, 0)
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = sherlockAndAnagrams(s);

        ws.write(result + '\n');
    }

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem)