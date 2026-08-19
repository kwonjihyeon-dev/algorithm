function solution(numbers, target) {
    let answer = 0;

    function dfs(index, sum) {
        // [1] 탈출 조건 (여기에 위에서 작성한 if문을 넣으세요)
        if (index === numbers.length) {
            if (sum === target) {
                answer++; // 타겟을 만들었으니 정답 카운트 증가
            }
            return;
        }

        // [2] 두 갈림길 선택 (여기에 위에서 작성한 dfs 호출 2개를 넣으세요)
        dfs(index + 1, sum + numbers[index])
        
        dfs(index + 1, sum - numbers[index])
    }

    // 처음 시작은 0번째 인덱스, 현재까지의 합계는 0으로 출발!
    dfs(0, 0); 

    return answer;
}