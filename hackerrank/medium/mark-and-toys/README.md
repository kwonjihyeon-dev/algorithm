# Mark and Toys

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

Mark and Jane are very happy after having their first child. Their son loves toys, so Mark wants to buy some. There are a number of different toys lying in front of him, tagged with their prices.  Mark has only a certain amount to spend, and he wants to maximize the number of toys he buys with this money.  Given a list of toy prices and an amount to spend, determine the maximum number of gifts he can buy.

**Note** Each toy can be purchased only once.  

**Example**  
$prices = [1, 2, 3, 4]$   
$k=7$   

The budget is $7$ units of currency.  He can buy items that cost $[1, 2, 3]$ for $6$, or $[3, 4]$ for $7$ units.  The maximum is $3$ items.  

**Function Description**

Complete the function *maximumToys* in the editor below.  

maximumToys has the following parameter(s):  

-  *int prices[n]:*  the toy prices  
-  *int k:*  Mark's budget  

**Returns**  

- *int:* the maximum number of toys  

**Input Format**

The first line contains two integers, $n$ and $k$, the number of priced toys and the amount Mark has to spend.  
The next line contains $n$ space-separated integers $prices[i]$   


**Constraints**

$1 \le n \le 10^{5}$  
$1 \le k \le 10^{9}$  
$1 \le prices[i] \le 10^{9}$  
A toy can't be bought multiple times.


**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-18T14:19:30.937Z  

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
 * Complete the 'maximumToys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY prices
 *  2. INTEGER k
 */

function maximumToys(prices, k) {
   
  const sortedPrices = prices.sort((a, b) => a - b);

  let result = sortedPrices[0];
  let count = 0;
  for (let i = 0; i < sortedPrices.length; i++) {
    result = sortedPrices[i] + result;
    if (result > k) return count;
    count++
  }
  
  return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const prices = readLine().replace(/\s+$/g, '').split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

    const result = maximumToys(prices, k);

    ws.write(result + '\n');

    ws.end();
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/mark-and-toys/problem)