const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const arr = input[1].split(' ').map(Number);

const visited = new Array(arr.length).fill(false);
const selected = [];
let max = 0;

function backtrack(n) {
  if (n === N) {
    let maxNum = 0;
    for (let i = 0; i < N - 1; i++) {
      maxNum += Math.abs(selected[i] - selected[i + 1]);
    }
    max = Math.max(max, maxNum);
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      selected.push(arr[i]);

      backtrack(n + 1);

      visited[i] = false;
      selected.pop();
    }
  }
}

backtrack(0);
console.log(max);