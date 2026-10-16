# Balanced Brackets

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

A bracket is considered to be any one of the following characters: `(`, `)`, `{`, `}`, `[`, or `]`.	

Two brackets are considered to be a *matched pair* if the an opening bracket (i.e., `(`, `[`, or `{`) occurs to the left of a closing bracket (i.e., `)`, `]`, or `}`) *of the exact same type*. There are three types of matched pairs of brackets: `[]`, `{}`, and `()`.

A matching pair of brackets is *not balanced* if the set of brackets it encloses are not matched. For example, `{[(])}` is not balanced because the contents in between `{` and `}` are not balanced. The pair of square brackets encloses a single, unbalanced opening bracket, `(`, and the pair of parentheses encloses a single, unbalanced closing square bracket, `]`.

By this logic, we say a sequence of brackets is *balanced* if the following conditions are met:

- It contains no unmatched brackets.
- The subset of brackets enclosed within the confines of a matched pair of brackets  is also a matched pair of brackets.

Given $n$ strings of brackets, determine whether each sequence of brackets is balanced. If a string is balanced, return `YES`.  Otherwise, return `NO`.  

**Function Description**  

Complete the function *isBalanced* in the editor below.   

isBalanced has the following parameter(s):

- *string s*: a string of brackets   

**Returns**   

- *string:* either `YES` or `NO`  

**Input Format**

The first line contains a single integer $n$, the number of strings. 	
Each of the next $n$ lines contains a single string $s$, a sequence of brackets.

**Constraints**

- $1 \le n \le 10^3$  
- $1\le |s| \le 10^3$, where $|s|$ is the length of the sequence.  
- All chracters in the sequences &in; { **{**, **}**, **(**, **)**, **[**, **]** }.

**Output Format**

For each string, return `YES` or `NO`.

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-16T05:10:52.476Z  

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
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isBalanced(s) {
    // Write your code here
    const arr = s.split('\n');
  
    const pair = {']': '[', '}': '{', ')': '('};
    
    const result = []
  
    const isValidString = (string) => {
      if (string.length % 2) {
         return result.push("NO")
      }
      
      const order = [];
      for (const str of string) {
        if (str in pair) {
          if (order.pop() !== pair[str]) return result.push('NO')
        } else {
          order.push(str)
        }
      }
      
      return result.push(order.length ? "NO" : "YES")
    }
    
    arr.forEach((str) => isValidString(str))
    // return result
    // [YES, NO]
    return result.join('\n')
    

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = isBalanced(s);

        ws.write(result + '\n');
    }

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/balanced-brackets/problem)