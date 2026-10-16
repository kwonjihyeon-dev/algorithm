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
   console.log(result.sort((a,b) => b - a).join('\n'))
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
