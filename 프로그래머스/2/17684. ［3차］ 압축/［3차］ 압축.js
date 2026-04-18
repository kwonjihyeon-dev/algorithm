function solution(msg) {
    const alphabets = new Map(
  Array.from({ length: 26 }, (_, i) => [
    String.fromCharCode(65 + i), // Key: 'A', 'B', ...
    i + 1                        // Value: 1, 2, ...
  ])
);
    
    const MSG = msg.split();
    const indexes = [];
    let index = 0; 
    
    while (index < msg.length) {
        let w = '';
        let j = index;
        
        // [핵심] 현재 위치 i에서 시작하는 가장 긴 단어 찾기
        while (j < msg.length && alphabets.has(w + msg[j])) {
            w += msg[j];
            j++;
        }
        
        // console.log(w, alphabets.get(w))
        indexes.push(alphabets.get(w));
        
        // 사전에 w + c(다음 글자) 추가
        if (j < msg.length) {
            let size = alphabets.size;
            alphabets.set(w + msg[j], ++size);
        }

        // 처리한 글자수만큼 인덱스 이동
        index = j;
    }
    
    return indexes
}