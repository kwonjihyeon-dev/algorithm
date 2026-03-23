const fs = require('fs');

// 표준 입력을 효율적으로 읽어옵니다.
const input = fs.readFileSync(0, 'utf8').split(/\s+/);

function solve() {
  const n = parseInt(input[0]);
  if (isNaN(n)) return;

  const stack = [];
  const result = []; // 기호들을 담을 배열
  let nextNum = 1;

  for (let i = 1; i <= n; i++) {
    const target = parseInt(input[i]);

    // 1. target까지 스택에 push
    while (nextNum <= target) {
      stack.push(nextNum++);
      result.push('+');
    }

    // 2. 스택 Top 확인 및 pop
    if (stack[stack.length - 1] === target) {
      stack.pop();
      result.push('-');
    } else {
      // 3. 실패 시 "NO"만 출력하고 프로세스 종료 (가장 중요)
      console.log("NO");
      return; 
    }
  }

  // 4. 모든 루프를 무사히 통과했을 때만 전체 결과 출력
  process.stdout.write(result.join('\n') + '\n');
}

solve();