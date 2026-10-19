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

// Complete the countTriplets function below.
function countTriplets(arr, r) {
    const prev = new Map();
    const next = new Map();
    
    arr.forEach((item,i) => next.set(item, (next.get(item) ?? 0) + 1))

    let count = 0;
    
    for (let i = 0; i < arr.length; i++) {
        next.set(arr[i], next.get(arr[i]) - 1)
        if (arr[i] % r === 0) {
            const left = prev.get(arr[i] / r) ?? 0;
            const right = next.get(arr[i] * r) ?? 0;
            
            count += left * right;
        }
        prev.set(arr[i], (prev.get(arr[i]) ?? 0) + 1)
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
