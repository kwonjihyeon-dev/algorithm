# frequency-queries

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

You are given $q$ queries. Each query is of the form two integers described below:  
- $1$ $x$: Insert x in your data structure.   
- $2$ $y$: Delete one occurence of y from your data structure, if present.  
- $3$ $z$: Check if any integer is present whose frequency is exactly $z$. If yes, print 1 else 0.

The queries are given in the form of a 2-D array $queries$ of size $q$ where $queries[i][0]$ contains the operation, and $queries[i][1]$ contains the data element.   

**Example**    
$queries = [(1,1),(2,2),(3,2),(1,1),(1,1),(2,1),(3,2)]$   

The results of each operation are:  

	Operation	Array	Output
    (1,1)		[1]
    (2,2)		[1]
    (3,2)					0
    (1,1)		[1,1]
    (1,1)		[1,1,1]
    (2,1)		[1,1]
    (3,2)					1
    
 Return an array with the output: $[0,1]$.
 
 **Function Description**
 
Complete the *freqQuery* function in the editor below.   

freqQuery has the following parameter(s):

- *int queries[q][2]:* a 2-d array of integers  

**Returns**   
- *int[]:* the results of queries of type $3$

**Input Format**

The first line contains of an integer $q$, the number of queries.   
Each of the next $q$ lines contains two space-separated integers, $queries[i][0]$ and $queries[i][1]$.  

**Constraints**

- $1 \leq q \leq 10^{5}$  
- $1 \leq x,y,z \leq 10^{9}$  
- All $queries[i][0] \in \{1,2,3\}$  
- $1 \leq queries[i][1] \leq 10^{9}$  

**Output Format**

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-19T09:00:37.000Z  

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

// Complete the freqQuery function below.
function freqQuery(queries) {

    const store = new Map();
    const countStore = new Map() 
    const result = []
  
    queries.forEach((query) => {
      const [role, score] = query;
      
      switch (role) {
case 1:
  let count = 0
  if (store.has(score)) {
    count = store.get(score)
    countStore.set(count, countStore.get(count) - 1)
  }
  ++count;
  store.set(score, count)
  if (countStore.has(count)) {
    countStore.set(count, countStore.get(count) + 1)
  } else {
    countStore.set(count, 1)
  }
  break;
case 2:
  if (store.has(score)) {
    let already = store.get(score)
    countStore.set(already, countStore.get(already) - 1)
    --already;
    if (already === 0) {
      store.delete(score);
    } else {
      store.set(score, already);
      if (countStore.has(already)) {
        countStore.set(already, countStore.get(already) + 1)
      } else {
        countStore.set(already, 1)
      }
    }
  }
  break;
         case 3:
          
          result.push((countStore.has(score) && countStore.get(score) > 0) ? 1 : 0)
          break;
          
      }
    })
    
  
  
    return result
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
```

---

[View on HackerRank](https://www.hackerrank.com/challenges/frequency-queries/problem)