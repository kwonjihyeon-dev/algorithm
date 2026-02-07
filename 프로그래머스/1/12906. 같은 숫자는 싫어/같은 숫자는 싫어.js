function solution(arr){
    let Arr = []
    
    arr.forEach((el,index)=> {
        if(el !== arr[index+1]){
            Arr.push(el)
    }
}
     
    )
  return Arr
}