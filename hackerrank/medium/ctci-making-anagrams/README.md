# ctci-making-anagrams

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

A student is taking a cryptography class and has found *anagrams* to be very useful. Two strings are anagrams of each other if the first string's letters can be rearranged to form the second string. In other words, both strings must contain the same exact letters in the same exact frequency. For example, `bacdc` and `dcbac` are anagrams, but `bacdc` and `dcbad` are not.

The student decides on an encryption scheme that involves two large strings.  The encryption is dependent on the minimum number of character deletions required to make the two strings anagrams. Determine this number. 
  
Given two strings, $a$ and $b$, that may or may not be of the same length, determine the minimum number of character deletions required to make $a$ and $b$ anagrams. Any characters can be deleted from either of the strings. 

**Example**  
$a = \text{'cde'}$  
$b = \text{'dcf'}$  

Delete $e$ from $a$ and $f$ from $b$ so that the remaining strings are $cd$ and $dc$ which are anagrams. This takes $2$ character deletions.  

**Function Description**

Complete the *makeAnagram* function in the editor below.  

makeAnagram has the following parameter(s):

- *string a*: a string
- *string b*: another string  

**Returns**  

- *int:*  the minimum total characters that must be deleted

**Input Format**

The first line contains a single string, $a$. 	
The second line contains a single string, $b$.

**Constraints**

- $1 \le |a|, |b| \le 10^4$  
- The strings $a$ and $b$ consist of lowercase English alphabetic letters, ascii[a-z].

**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-19T06:07:41.338Z  

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
 * Complete the 'makeAnagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function makeAnagram(a, b) {
    const store = new Map();
    for(const s of a) {
      if (store.has(s)) {
        let count = store.get(s);
        store.set(s, ++count);
      } else {
        store.set(s, 1)
      }
    }
  
  
  
    for(const s of b) {
     if (store.has(s)) {
        let count = store.get(s);
        store.set(s, --count); 
      } else {
        store.set(s, -1)
      }
    }
  
  return Array.from(store).reduce((acc, cur) => {
    const [_, value] = cur;
    return acc + Math.abs(value)
  }, 0)
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/ctci-making-anagrams/problem)