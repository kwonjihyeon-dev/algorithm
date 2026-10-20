# Ice Cream Parlor

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)

## Problem

Two friends like to pool their money and go to the ice cream parlor.  They always choose two distinct flavors and they spend all of their money.

Given a list of prices for the flavors of ice cream, select the two that will cost all of the money they have.  

**Example**. 
$m = 6$
$cost = [1, 3, 4, 5, 6]$

The two flavors that cost $1$ and $5$ meet the criteria.  Using $1$-based indexing, they are at indices $1$ and $4$.  

**Function Description**

Complete the *icecreamParlor* function in the editor below.    

icecreamParlor has the following parameter(s):  

- *int m:* the amount of money they have to spend  
- *int cost[n]:* the cost of each flavor of ice cream  

**Returns**   

- *int[2]:*  the indices of the prices of the two flavors they buy, sorted ascending 

**Input Format**

The first line contains an integer, $t$, the number of trips to the ice cream parlor.   The next $t$ sets of lines each describe a visit.  

Each trip is described as follows:

1. The integer $m$, the amount of money they have pooled. 
2. The integer $n$, the number of flavors offered at the time. 
3. $n$ space-separated integers denoting the cost of each flavor: $cost[cost[1], cost[2],\ldots,cost[n]]$.  

**Note**:  The index within the cost array represents the flavor of the ice cream purchased.  

**Constraints**

- $1 \le t \le 50$  
- $2 \le m \le 10^4$   
- $2 \le n \le 10^4$   
- $1 \le cost[i] \le 10^4$, &forall; $i \in [1, n]$   
- There will always be a unique solution.

**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-20T22:38:58.704Z  

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
 * Complete the 'icecreamParlor' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER m
 *  2. INTEGER_ARRAY arr
 */

function icecreamParlor(m, arr) {
    
    const store = new Map()
    
    arr.forEach((item, i) => store.set(item, i));
    
  for (let i = 0; i < arr.length - 1; i++) {
    if (store.has(m - arr[i])) {
      const target = store.get(m - arr[i]);
      if (target < i) {
        return [target + 1, i + 1];
      } else if (target == i) {
        continue;
      } else {
        return [i + 1, target + 1];
      }
    } else {
      continue;
    }
  }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const m = parseInt(readLine().trim(), 10);

        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = icecreamParlor(m, arr);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/icecream-parlor/problem)