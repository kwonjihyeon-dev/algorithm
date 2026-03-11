function solution(s) {
    let correct = 0;
    s.split("").map((w) => {
        if (correct < 0) return;
        if (w === '(') {
            correct += 1;
        } else {
            correct -= 1;
        }
    })
    
    return correct === 0
}