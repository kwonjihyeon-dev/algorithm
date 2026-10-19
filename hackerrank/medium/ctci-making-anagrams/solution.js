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
 * Complete the 'makeAnagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function makeAnagram(a, b) {
    const store = new Map();
    for(const s of a) {
      if (store.has(s)) {
        let count = store.get(s);
        store.set(s, ++count);
      } else {
        store.set(s, 1)
      }
    }
  
  
  
    for(const s of b) {
     if (store.has(s)) {
        let count = store.get(s);
        store.set(s, --count); 
      } else {
        store.set(s, -1)
      }
    }
  
  return Array.from(store).reduce((acc, cur) => {
    const [_, value] = cur;
    return acc + Math.abs(value)
  }, 0)
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
