function solution(progresses, speeds) {
    var answer = [];
    const dueDates = [] // 이중배열? 

    const calc = (process, plus) => {
        if (process + plus >= 100) {
            return 1;
        } else {
            let test = 100 - process;
            return Math.ceil(test / plus);
        }
    }
    
    let stack = []; // 쌓기
    let completed = []; // 배포되는 기능 수
    
    progresses.map((progress, i) => {
        const result = calc(progress, speeds[i]);
        console.log(result);
        
        if (stack.length) {
            if (stack[0] >= result) {
                // 앞의 기능 완료일이 더 크면 넣어주고,
                stack.push(result);
            } else {
                // 앞의 기능 완료보다 지금 완료한 게 더 오래걸리면 비우고 다시 넣어주기
                completed.push(stack.length);
                stack = [];
                stack.push(result);
            }
        } else {
            stack.push(result)   
        }
    })
    completed.push(stack.length);
    // console.log(stack, completed)
    return completed;
}