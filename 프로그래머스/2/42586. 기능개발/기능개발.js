function solution(progresses, speeds) {
    let completed = 0;
    let deployIdx = 0;
    const deploy = [0];
    
    for (let i = 0; i < progresses.length; i++) {
        const last = 100 - progresses[i];
        const duration = Math.ceil(last / speeds[i]);
        if (completed) {
            if (duration > completed) {
                completed = duration;
                ++deployIdx;
                deploy[deployIdx] = 1;
            } else {
                deploy[deployIdx]++;
            }
        } else {
            completed = duration;
            deploy[deployIdx]++;
        }
    }
    
    return deploy
}