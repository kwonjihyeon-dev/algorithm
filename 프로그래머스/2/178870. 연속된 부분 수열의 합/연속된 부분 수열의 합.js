function solution(sequence, k) {
  let answer = [0, sequence.length - 1]; // 가장 긴 구간으로 초기화
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < sequence.length; right++) {
    // 1. 오른쪽 포인터를 이동하며 합을 더함
    sum += sequence[right];

    // false면 리턴
    while (sum > k) {
      sum -= sequence[left];
      left++;
    }

    if (sum === k) {
      const cur = right - left;
      // 4. 더 짧은 구간을 발견하면 교체 (길이가 같다면 먼저 발견된 것이 인덱스가 작으므로 유지)
      if (cur < minLength) {
        minLength = cur;
        answer = [left, right];
      }
    }
  }
    
    return answer;
}