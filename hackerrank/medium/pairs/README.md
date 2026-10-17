# Pairs

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

Given an array of integers and a target value, determine the number of pairs of array elements that have a difference equal to the target value.  

**Example**   
$k = 1$  
$arr = [1, 2, 3, 4]$   

There are three values that differ by $k = 1$: $2-1 = 1$, $3-2 = 1$, and $4-3 = 1$.  Return $3$.  

**Function Description**

Complete the *pairs* function below.   

pairs has the following parameter(s):

- *int k:* an integer, the target difference
- *int arr[n]:* an array of integers   

**Returns**   

- *int:* the number of pairs that satisfy the criterion


**Input Format**

The first line contains two space-separated integers $n$ and $k$, the size of $arr$ and the target value.     
The second line contains $n$ space-separated integers of the array $arr$.
  

    

**Constraints**

- $2 \le n \le 10^5$  
- $0 \lt k \lt 10^9$  
- $0 \lt arr[i] \lt 2^{31} - 1$    
- each integer $arr[i]$ will be unique

**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-17T06:54:25.606Z  

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
 * Complete the 'pairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function pairs(k, arr) {
    
    let count = 0;
    
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++ ) {
            if (Math.abs((arr[j] - arr[i])) === k) {
                count++;
            }
        }
    }
    
    return count
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = pairs(k, arr);

    ws.write(result + '\n');

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/pairs/problem)