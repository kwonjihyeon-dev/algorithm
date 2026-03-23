const fs = require('fs');

// 1. 전체 데이터를 읽되, '줄바꿈'으로만 먼저 나눕니다. (배열 길이를 4로 제한)
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

// 2. 상근이 카드 처리 (N개)
const N = Number(input[0]);
const cardsArr = input[1].split(' '); // 상근이 카드 줄만 쪼갬
const numbersMap = new Map();

for (idx = 0; idx < N; idx++) {
    const card = cardsArr[idx];
    numbersMap.set(card, (numbersMap.get(card) || 0) + 1);
}

// 사용이 끝난 거대 배열은 메모리 확보를 위해 초기화해주는 것이 좋습니다.
input[1] = null; 

// 3. 질문 카드 처리 (M개)
const M = Number(input[2]);
const queriesArr = input[3].split(' '); // 질문 카드 줄만 쪼갬
const result = [];

for (let j = 0; j < M; j++) {
    const query = queriesArr[j];
    // Map에서 개수를 찾고 없으면 0을 넣습니다.
    result.push(numbersMap.get(query) || 0);
}

// 4. 최종 출력 (공백으로 구분)
console.log(result.join(' '));