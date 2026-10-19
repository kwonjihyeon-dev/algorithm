# Sales by Match

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

There is a large pile of socks that must be paired by color. Given an array of integers representing the color of each sock, determine how many pairs of socks with matching colors there are.

**Example**   
$n = 7$   
$ar = [1, 2, 1, 2, 1, 3, 2]$   

There is one pair of color $1$ and one of color $2$.  There are three odd socks left, one of each color.  The number of pairs is $2$.  

**Function Description**  

Complete the *sockMerchant* function in the editor below.     

sockMerchant has the following parameter(s):  

- *int n:* the number of socks in the pile   
- *int ar[n]:* the colors of each sock   

**Returns**   

- *int:* the number of pairs   

**Input Format**

The first line contains an integer $n$, the number of socks represented in $ar$. 		
The second line contains $n$ space-separated integers, $ar[i]$, the colors of the socks in the pile.

**Constraints**

* $1 \le n \le 100$
* $1 \le ar[i] \le 100$ where $0 \le i < n$


**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-19T06:49:48.398Z  

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
 * Complete the 'sockMerchant' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY ar
 */

function sockMerchant(n, arr) {
    const store = new Map();
  
    arr.forEach((socks) => {
      let count = 0
      if (store.has(socks)) {
        count = store.get(socks)
      }
      
      store.set(socks, ++count)
    })

  
    return Array.from(store).reduce((acc,cur) => {
        const [_, value] = cur;
        
        return acc + Math.floor(value / 2)
    }, 0)
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const ar = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

    const result = sockMerchant(n, ar);

    ws.write(result + '\n');

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/sock-merchant/problem)