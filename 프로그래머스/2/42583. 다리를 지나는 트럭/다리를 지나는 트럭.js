function solution(bridge_length, weight, truck_weights) {
    var timer = 0;
    // return answer;
    
    const truck_in_bridge = Array(bridge_length).fill(0); // 초기값
    let total = 0;
    
    while (truck_weights.length > 0 || truck_in_bridge.length > 0) {
        timer++;
        const last_truck = truck_in_bridge.pop();
        total -= last_truck;
        
        if (truck_weights.length) {
            if (total + truck_weights[0] <= weight) {
                // 올라갈수있음.
                const truck = truck_weights.shift();
                truck_in_bridge.unshift(truck);
                total += truck;
            } else {
                truck_in_bridge.unshift(0);
            }
        }
    }
    
    return timer;
}