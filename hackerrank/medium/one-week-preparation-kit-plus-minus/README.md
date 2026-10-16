# Plus Minus

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

Given an array of integers, calculate the ratios of its elements that are *positive*,  *negative*, and *zero*. Print the decimal value of each fraction on a new line with $6$ places after the decimal.

**Note:** This challenge introduces precision problems. The test cases are scaled to six decimal places, though answers with absolute error of up to $10^{-4}$ are acceptable.

**Example**  
$arr = [1,1,0,-1,-1]$  

There are $n=5$ elements, two positive, two negative and one zero.  Their ratios are $\frac{2}{5} = 0.400000$, $\frac{2}{5} = 0.400000$ and $\frac{1}{5} = 0.200000$.  Results are printed as:  

    0.400000
    0.400000
    0.200000
    
**Function Description**

Complete the *plusMinus* function in the editor below.

plusMinus has the following parameter(s):

- *int arr[n]*: an array of integers

**Print**  
	Print the ratios of positive, negative and 	zero values in the array.  Each value should be printed on a separate line with $6$ digits after the decimal.  The function should not return a value.  

**Input Format**

The first line contains an integer, $n$, the size of the array.	 
The second line contains $n$ space-separated integers that describe $arr[n]$.

**Constraints**

$0 \lt n \le 100$  
$-100 \le arr[i] \le 100$  

**Output Format**

**Print** the following $3$ lines, each to $6$ decimals:

1. proportion of positive values
2. proportion of negative values
3. proportion of zeros

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-16T13:43:53.875Z  

```js
'use strict';

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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
    const percents = {plus: 0, minus: 0, zero: 0};
    
    
   for (let i = 0; i < arr.length; i++ ) {
        if (arr[i] === 0) {
            percents.zero = ++percents.zero;
        } else if (arr[i] < 0) {
            percents.minus = ++percents.minus;
        } else {
            percents.plus = ++percents.plus;
        }
    
   }

   const result = Object.values(percents).map((value) => {
    const demical = value / arr.length;
    return demical.toFixed(6)
   })
   console.log(result.sort((a,b) => Number(b) - Number(a)).join('\n'))
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/one-week-preparation-kit-plus-minus/problem)