function processData(input) {
    //Enter your code here
    const [count, ...inputs] = input.split('\n')
    
     inputs.sort((a, b) => {
        const [nameA, scoreA] = a.split(' ');;
        const [nameB, scoreB] = b.split(' ');;
        
        return Number(scoreB) - Number(scoreA) || nameA.localeCompare(nameB)
    })

    console.log(inputs.join('\n'))
} 


process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
