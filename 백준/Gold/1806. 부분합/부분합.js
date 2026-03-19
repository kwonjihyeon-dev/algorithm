const fs = require('fs');
// 백준 환경에서는 '/dev/stdin' 경로에 입력값이 저장되어 있습니다.
const input = fs.readFileSync('/dev/stdin').toString().trim().split(/\s+/);

const arr = input.slice(2).map(Number)

let l = 0;
let r = 0;
const k = Number(input[1])
let sum = 0;
let minLength = Infinity;

for(let i = 0; i < arr.length; i++) {
  r = arr[i];
  sum += r;
  
  while(sum >= k) {
    const cur = (i + 1) - l;

    if (minLength > cur) {
      minLength = cur;
    }

    sum -= arr[l];
    l++;
  }
}

console.log(minLength === Infinity ? 0 : minLength)