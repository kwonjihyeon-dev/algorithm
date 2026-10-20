# Fibonacci Modified

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

Implement a *modified* [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number) using the following definition:

> Given terms $t[i]$ and $t[i+1]$ where $i \in (1, \infty)$, term $t[i+2]$ is computed as:
$$t_{i+2} = t_i + (t_{i+1})^2$$      

Given three integers, $t1$, $t2$, and $n$, compute and print the $n^{th}$ term of a *modified Fibonacci sequence*.

**Example**   
$t1 = 0$   
$t2 = 1$  
$n = 6$

- $t3 = 0 + 1^2 = 1$  
- $t4 = 1 + 1^2 = 2$  
- $t5 = 1 + 2^2 = 5$  
- $t6 = 2 + 5^2 = 27$  

Return $27$.  

**Function Description**  

Complete the *fibonacciModified* function in the editor below.  It must return the $n^{th}$ number in the sequence.  

fibonacciModified has the following parameter(s):  

- *int t1*: an integer  
- *int t2*: an integer  
- *int n*: the iteration to report  

**Returns**  

- *int:* the $n^{th}$ number in the sequence  

**Note:** The value of $t[n]$ may far exceed the range of a $64$-bit integer. Many submission languages have libraries that can handle such large results but, for those that don't (e.g., C++), you will need to compensate for the size of the result.  

**Input Format**

A single line of three space-separated integers, the values of $t1$, $t2$, and $n$.

**Constraints**

- $0 \le t1, t2 \le 2$
- $3 \le n \le 20$  
- $t_n$ may far exceed the range of a $64$-bit integer. 

**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-20T15:09:50.387Z  

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
 * Complete the 'fibonacciModified' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER t1
 *  2. INTEGER t2
 *  3. INTEGER n
 */

function fibonacciModified(t1, t2, n) {
    // Write your code here
        
    const start = n - 2
    const empty = new Array(start).fill(0)
    const store = [t1, t2].concat(empty)
    
    
    for (let i = 2; i < store.length; i++) {
        store[i] = BigInt(store[i - 2]) + BigInt(store[i - 1] * store[i - 1])
    } 
    
    return store[store.length - 1]
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const t1 = parseInt(firstMultipleInput[0], 10);

    const t2 = parseInt(firstMultipleInput[1], 10);

    const n = parseInt(firstMultipleInput[2], 10);

    const result = fibonacciModified(t1, t2, n);

    ws.write(result + '\n');

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/fibonacci-modified/problem)