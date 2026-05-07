function getDiffTime(prev, now) {
        
      const start = new Date(`2026-05-07T${prev}:00`);
      const end = new Date(`2026-05-07T${now}:00`);
      // 밀리초 -> 초 -> 분 계산
      return (end.getTime() - start.getTime()) / (1000 * 60);
}

function solution(fees, records) {
  // var answer = [];
  const parkedCarTimes = new Map(); // 입차, 출차한 차 모음. 차량번호 입차시간
  const parkedCarFees = new Map(); // 입차 차량의 요금. 차량번호 누적요금

  const [baseTime, baseFee, unitTime, unitFee] = fees;

  records.forEach((record) => {
    const [time, carNumber, action] = record.split(' ');

    if (action === 'IN') {
      parkedCarTimes.set(carNumber, time);
    } else {
      const inTime = parkedCarTimes.get(carNumber);
      const diffMinutes = getDiffTime(inTime, time);
      
      if (parkedCarFees.get(carNumber)) {
        parkedCarFees.set(carNumber, diffMinutes + parkedCarFees.get(carNumber));
      } else {
        parkedCarFees.set(carNumber, diffMinutes);
      }
 
      parkedCarTimes.delete(carNumber);
    }
  });
  
  Array.from(parkedCarTimes).forEach(([carNumber, time]) => {
    const diffMinutes = getDiffTime(time, '23:59');
    
      if (parkedCarFees.get(carNumber)) {
        parkedCarFees.set(carNumber, diffMinutes + parkedCarFees.get(carNumber));
      } else {
        parkedCarFees.set(carNumber, diffMinutes);
      }
  })
  
  // console.log( Array.from(parkedCarFees))
  
  const answer = Array.from(parkedCarFees).sort((a, b) => a[0].localeCompare(b[0])).map(([carnum, time]) =>  {
    if (time > baseTime) {
      // // 기본 요금 + ⌈(누적시간 - 기본시간) / 단위시간⌉ × 단위요금  
      return baseFee + Math.ceil(((time - baseTime) / unitTime)) * unitFee
    } else {
        return baseFee
    }
  });
  
  return answer;
}