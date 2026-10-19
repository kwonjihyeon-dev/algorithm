# count-triplets-1

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

You are given an array and you need to find number of tripets of indices $(i, j, k)$ such that the elements at those indices are in [geometric progression](https://en.wikipedia.org/wiki/Geometric_progression) for a given common ratio $r$ and $i \lt j \lt k$. 

**Example**    
$arr = [1, 4, 16, 64]$
$r = 4$   

There are $[1, 4, 16]$ and $[4, 16, 64]$ at indices $(0, 1, 2)$ and $(1, 2, 3)$. Return $2$.    

**Function Description**

Complete the *countTriplets* function in the editor below.   

countTriplets has the following parameter(s):

- *int arr[n]:* an array of integers
- *int r*: the common ratio   

**Returns**   

- *int:* the number of triplets   

**Input Format**

The first line contains two space-separated integers $n$ and $r$, the size of $arr$ and the common ratio.     
The next line contains $n$ space-seperated integers $arr[i]$.    


**Constraints**

- $1 \leq n \leq 10^{5}$  
- $1 \leq r \leq 10^{9}$  
- $1 \leq arr[i] \leq 10^{9}$

**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-19T15:01:41.957Z  

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

// Complete the countTriplets function below.
function countTriplets(arr, r) {
    const prev = new Map();
    const next = new Map();
    
    arr.forEach((item,i) => next.set(item, (next.get(item) ?? 0) + 1))

    let count = 0;
    
    for (let i = 0; i < arr.length; i++) {
        next.set(arr[i], next.get(arr[i]) - 1)
        if (arr[i] % r === 0) {
            const left = prev.get(arr[i] / r) ?? 0;
            const right = next.get(arr[i] * r) ?? 0;
            
            count += left * right;
        }
        prev.set(arr[i], (prev.get(arr[i]) ?? 0) + 1)
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/count-triplets-1/problem)