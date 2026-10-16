# Queue using Two Stacks

![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)

## Problem

A [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) is an abstract data type that maintains the order in which elements were added to it, allowing the oldest elements to be removed from the front and new elements to be added to the rear. This is called a *First-In-First-Out* (FIFO) data structure because the first element added to the queue (i.e., the one that has been waiting the longest) is always the first one to be removed.

A basic queue has the following operations:

- *Enqueue*: add a new element to the end of the queue.
- *Dequeue*: remove the element from the front of the queue and return it.

In this challenge, you must first implement a queue using *two stacks*. Then process $q$ queries, where each query is one of the following $3$ types: 

1. `1 x`: Enqueue element $x$ into the end of the queue.
2. `2`: Dequeue the element at the front of the queue.
3. `3`: Print the element at the front of the queue.



**Input Format**

The first line contains a single integer, $q$, denoting the number of queries. 	
Each line $i$ of the $q$ subsequent lines contains a single query in the form described in the problem statement above. All three queries start with an integer denoting the query $type$, but only query $1$ is followed by an additional space-separated value, $x$, denoting the value to be enqueued.

**Constraints**

- $1 \le q \le 10^5$  
- $1 \le type \le 3$  
- $1 \le |x| \le 10^9$  
- It is guaranteed that a valid answer always exists for each query of type $3$.


**Output Format**

For each query of type $3$, print the value of the element at the front of the queue on a new line.

## Solution

**Language:** JavaScript  
**Runtime:** N/A  
**Memory:** N/A  
**Submitted:** 2026-10-16T07:13:24.105Z  

```js
function processData(input) {
    const [q, ...lines] = input.trim().split("\n");
    const query = new Map();
    let pushIndex = 0;
    let deleteIndex = 0;
    const print = [];
  
    lines.forEach((type, i) => {
      switch(type) {
        case '2':
          query.delete(deleteIndex);
          deleteIndex++;
          break;
        case '3':
          print.push(query.get(deleteIndex))
          break;
        default:
          const [_, value] = type.split(' ');
          query.set(pushIndex, value);
          pushIndex++
          break;
      }
    })
    
    console.log(print.join('\n'))
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

```

---

[View on HackerRank](https://www.hackerrank.com/challenges/queue-using-two-stacks/problem)