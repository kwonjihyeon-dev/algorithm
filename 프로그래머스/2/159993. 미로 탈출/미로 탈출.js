function solution(maps) {
  const map = maps.map((item) => item.split(''));
  // const index = maps.findIndex((item) => item.includes('L'));

  const dy = [0, 0, -1, 1];
  const dx = [-1, 1, 0, 0];

  function pos(str) {
    let position = null;
    const index = map.forEach((item, idx) => {
      const index = item.findIndex((strItem) => strItem === str);
      if (index < 0) return;
      position = [idx, index];
    });
    return position;
  }

  function bfs(start, end, str) {
    let cursor = 0;
    // 레버 있는 쪽까지 / 레버 -> 끝까지
    const h = map.length;
    const w = map[0].length;

    const visited = Array.from({ length: h }, () => new Array(w).fill(0));
    const queue = [[start, end]]; // 시작점
    visited[start][end] = 1; // 방문한 곳 1표시
    while (cursor < queue.length) {
      const [x, y] = queue[cursor++];

      if (map[x][y] === str) return visited[x][y] - 1;

      for (let i = 0; i < dy.length; i++) {
        const mx = x + dx[i];
        const my = y + dy[i];

        if (mx < 0 || mx >= h || my < 0 || my >= w) continue;
        if (map[mx][my] === 'X') continue;
        if (visited[mx][my] !== 0) continue;

        visited[mx][my] = visited[x][y] + 1;
        queue.push([mx, my]);
      }
    }
    return -1;
  }

  const S = pos('S');
  const L = pos('L');

  const toLever = bfs(S[0], S[1], 'L');
  if (toLever === -1) return -1;

  const toExit = bfs(L[0], L[1], 'E');
  if (toExit === -1) return -1;

  return toLever + toExit;
}
