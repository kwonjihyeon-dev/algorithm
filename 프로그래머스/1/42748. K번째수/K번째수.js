function solution(array, commands){
    
//     const answer = commands.map(nums => {
//         const result = array.slice(nums[0] - 1, nums[1])
//                             .sort((a,b)=>{
//                                 return a < b ? -1 : 1;
//                             })
//         return result[nums[2] - 1];
//     })
//     return answer
    
    let arr = []
    let Arr = []
    let num = 0
    for(i=0;i<commands.length; i++){
        arr = array.slice(commands[i][0]-1,commands[i][1]).sort(function(a,b){
            return a-b
        })      
        // arr.push(arr)
        num = Number(arr[commands[i][2]-1])
        
        Arr.push(num)
    }
    
        // console.log(arr,num)
    return Arr
}