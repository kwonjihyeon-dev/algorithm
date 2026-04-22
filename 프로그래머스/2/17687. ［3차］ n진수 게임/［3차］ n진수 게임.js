function solution(n, t, m, p) {
  let answer = '';
  let count = 0;
  const max = m * t;
  let wordLength = [];

  const turns = Array.from({ length: t }, (_, i) => p - 1 + (m * i));

  while (count < max) {
    wordLength += count.toString(n).toUpperCase();
    count++;
  }

  // console.log(turns)

  const words = wordLength.split('');
  turns.map((turn) => (answer += words[turn]));

  // console.log(answer, words)

  return answer;
}