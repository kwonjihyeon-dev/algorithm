function solution(numbers) {
    var answer = 0;
    const primeSet = new Set() // 소수배열
    const strs = numbers.split('')
    
    function getPrimes(s, arr) {
       if (s.length > 0) {
           primeSet.add(Number(s))
       }
        
        for(let i = 0; i < arr.length; i++) {
            const nextArr = [...arr];
            nextArr.splice(i, 1);
            getPrimes(s + arr[i], nextArr);
        }
    }
    
    getPrimes('', strs);
    
    const primes = Array.from(primeSet).filter((p) => {
        if (p <= 1) return false;
        for (let i = 2; i * i <= p; i++) {
            if (p % i === 0) return false;
        }
        return true;
    }) 
    
    return primes.length;
}