function solution(numbers) {
// 만들수있는 가장 큰 수 return;
    const str = numbers.map(String)

    str.sort((a, b) => {

        return (b + a) - (a + b);
    });
    
    const answer = str.join('');
    if (answer.startsWith('0')) return '0'
    
    return answer;
}