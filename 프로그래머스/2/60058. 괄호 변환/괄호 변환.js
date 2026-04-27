function solution(p) {
  let answer = '';

  if (!p) return '';

  function isRight(str) {
    let stack = 0;
    for (const char of str) {
      if (char === '(') stack++;
      else {
        stack--;
        if (stack < 0) return false; // 중간에 )가 더 많아지면 탈락
      }
    }
    return stack === 0;
  }

  // 2단계: u, v 분리
  let u = "", v = "";
  let left = 0, right = 0;
  for (let i = 0; i < p.length; i++) {
    p[i] === '(' ? left++ : right++;
    if (left === right) { // 처음으로 개수가 같아지는 순간 u 완성
      u = p.slice(0, i + 1);
      v = p.slice(i + 1);
      break;
    }
  }

  if (isRight(u)) {
    return u+solution(v)
  }

  let word = '(' + solution(v) + ')';
  answer = u.substring(1, u.length - 1).split('').map((w) => {
    if (w === '(') return ')';
    return '('
  }).join('');

  return word + answer;
}