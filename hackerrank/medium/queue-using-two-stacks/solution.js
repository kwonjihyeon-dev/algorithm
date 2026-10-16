function processData(input) {
    const [q, ...lines] = input.trim().split("\n");
    const query = new Map();
    let pushIndex = 0;
    let deleteIndex = 0;
    const print = [];
  
    lines.forEach((type, i) => {
      switch(type) {
        case '2':
          query.delete(deleteIndex);
          deleteIndex++;
          break;
        case '3':
          print.push(query.get(deleteIndex))
          break;
        default:
          const [_, value] = type.split(' ');
          query.set(pushIndex, value);
          pushIndex++
          break;
      }
    })
    
    console.log(print.join('\n'))
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
