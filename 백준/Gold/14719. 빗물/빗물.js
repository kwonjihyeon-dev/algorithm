const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

if (input.length < 2) process.exit();
  let h = 0;
const rains = input[1].split(" ").map(Number);

for (let i = 0; i < rains.length; i++) {
  const left = Math.max(...rains.slice(0, i));
  const right = Math.max(...rains.slice(i + 1));

  const height = Math.min(left, right);

    if (height > rains[i]) {
        h += height - rains[i]
    }
}

console.log(h)