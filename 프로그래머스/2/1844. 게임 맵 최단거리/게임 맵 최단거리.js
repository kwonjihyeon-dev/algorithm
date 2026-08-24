function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;
    
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    const dist = Array.from({ length: n }, () => new Array(m).fill(0));
    const queue = [[0, 0]];
    let head = 0;
    dist[0][0] = 1;

    while (head < queue.length) {
    const [y, x] = queue[head++];

        for (let d = 0; d < dy.length; d++) {
            const ny = y + dy[d], nx = x + dx[d];
            if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;  // 격자 밖
            if (maps[ny][nx] === 0) continue;                       // 벽
            if (dist[ny][nx] !== 0) continue;                       // 이미 방문

            dist[ny][nx] = dist[y][x] + 1;
            queue.push([ny, nx]);
        }
    }

    return dist[n - 1][m - 1] || -1;
}