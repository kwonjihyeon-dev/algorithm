function solution(scoville, K) {
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.heap.length) {
      let smallerChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index] <= this.heap[smallerChildIndex]) break;

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  peek() {
    if (typeof this.heap[0] !== 'number') return null
    return this.heap[0];
  }
}
    let count = 0;
    const heap = new MinHeap();
    scoville.forEach(s => heap.push(s));
    
    // if (heap.size() )
    
    while(heap.size() >= 2 && heap.peek() < K) {
        const min = heap.pop();
        const min1 = heap.pop();
        count++;
        heap.push(min + (min1*2))
    }
    
    // console.log(heap.size(), count)
    return heap.peek() >= K ? count : -1
}