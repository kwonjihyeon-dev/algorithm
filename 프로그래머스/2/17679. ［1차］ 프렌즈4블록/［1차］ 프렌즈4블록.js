function solution(m, n, board) {
  var answer = 0;
    const db = board.map((b) => b.split('')); // 이중배열 만들기
    
  while (true) {
    const arr = Array.from(Array(m), () => new Array(n).fill(false)); // 지울 배열 저장
    let removedThisRound = 0;

    for (let M = 0; M <= m - 2; M++) {
      for (let N = 0; N <= n - 2; N++) {
        const cur = db[M][N];
        if (
          cur !== '' &&
          cur === db[M + 1][N] &&
          cur === db[M][N + 1] &&
          cur === db[M + 1][N + 1]
        ) {
          arr[M][N] = true;
          arr[M][N + 1] = true;
          arr[M + 1][N] = true;
          arr[M + 1][N + 1] = true;
        }
      }
    }

    for (let i = 0; i <= m - 1; i++) {
      for (let j = 0; j <= n - 1; j++) {
        if (arr[i][j]) {
          db[i][j] = '';
          removedThisRound++;
        }
      }
    }

    if (removedThisRound === 0) break;
    answer += removedThisRound;

    // 제거
    for (let col = 0; col <= n - 1; col++) {
      const stack = [];

      for (let row = 0; row <= m - 1; row++) {
        if (db[row][col]) {
          stack.push(db[row][col]);
        }
      }

      for (let row = 0; row <= m - 1; row++) {
        db[row][col] = '';
      }

      let newRow = m - 1;
      for (let r = stack.length - 1; r >= 0; r--) {
        db[newRow][col] = stack[r];
        newRow--;
      }
    }
  }

  return answer;
}

