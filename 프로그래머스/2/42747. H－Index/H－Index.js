function solution(citations) {
    let h = 0;
    citations.sort((a, b)=>b-a);
    
    for(let i=0; i < citations.length; i++) {
        if (citations[i] >= i+1) {
            h++;
        } else {
            break;
        }
        // h번 이상 인용되니까, 인덱스가 citations[i]보다 커야함
    }
    
    return h
}