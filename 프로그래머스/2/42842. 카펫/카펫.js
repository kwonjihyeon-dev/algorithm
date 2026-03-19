function solution(brown, yellow) {
  var answer = [];
  const sum = brown + yellow;

    for (let i = 3; i <= Math.sqrt(sum); i++) {
      if (sum % i === 0) {
        if (i - 2 === yellow) {
          return [i, i];
        } else {
          if (((sum / i) - 2) * (i - 2) === yellow) {
            return [sum / i, i]
          }
        }
        // divisors.push(i);
      }
    }
}