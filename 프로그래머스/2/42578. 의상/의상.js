function solution(clothes) {
    let clothesMap = new Map();
    
    clothes.map(([item, type]) => {
        let items = clothesMap.get(type) || 0;
        ++items;
        clothesMap.set(type, items);
    })
    
    const total = Array.from(clothesMap).reduce((acc, cur) => {
        const [category, count] = cur
        // console.log(acc,cur)
        return acc * (count + 1)
    }, 1);
    
    return total - 1
}