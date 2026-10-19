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
