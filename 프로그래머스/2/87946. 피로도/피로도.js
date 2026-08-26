function solution(k, dungeons) {
    // k = 80, 던전 A=[80,80], B=[50,40], C=[30,10]

    //                   시작 k=80
    //         ┌─────────────┼─────────────┐
    //       A 선택        B 선택        C 선택
    //       k=0           k=40          k=70
    //         │             │             │
    //    B? 0<50 X      A? 40<80 X    A? 70<80 X
    //    C? 0<30 X      C? 40>=30 O   B? 70>=50 O
    //         │             │             │
    //      1개 확정        k=30          k=30
    //                       │             │
    //                    A? X → 2개    A? X → 2개

    // 현재 피로도와 방문이 필요한 던전 목록을 받아서,
    function dfs(p, arr) {
        let best = 0;

        // 방문이 필요한 던전 목록 모두 돌아볼때
        for (let i = 0; i < arr.length; i++) {
          const [need, waste] = arr[i];
          // 현재 피로도보다 최소 필요 피로도가 크면 건너뛰기
          if (p < need) continue;

          // 다음 방문지 설정
          const unVisited = arr.filter((_, idx) => idx !== i)
          best = Math.max(best, dfs(p - waste, unVisited) + 1);
        }

        return best;
    }

    return dfs(k, dungeons)
}
