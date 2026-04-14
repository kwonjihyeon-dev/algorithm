const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const arr = input.slice(1)
const result = [...new Set(arr)]

result.sort((a, b) => {
  if (a.length !== b.length) {
    return a.length - b.length; // 1순위: 길이 짧은 순
  }
  return a.localeCompare(b);    // 2순위: 사전 순
});

console.log(Array.from(result).join('\n'))
