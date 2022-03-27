/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-22 17:39:17
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-22 21:21:13
 */
//FIFO
//队列两种方式实现
//array 缺点：性能不高 链表性能不高
// 链表
class Queue {
    constructor() {
        this.items = [];
    }
    //进入队列
    enqueue(item) {
        this.items.push(item);
    }
    //从队列前端删除
    dequeue() {
        return this.items.shift();
    }
    //查看顶端元素
    front() {
        return this.items[0];
    }
    // isEmpty() 查看队列是否为空
    isEmpty() {
        return this.items.length === 0;
    }

    // size() 查看队列中元素的个数
    size() {
        return this.items.length;
    }

    // toString() 将队列中的元素以字符串形式返回
    toString() {
        let result = "";
        for (let item of this.items) {
            result += item + " ";
        }
        return result;
    }
}
// const queue = new Queue();

// // enqueue() 测试
// queue.enqueue("a");
// queue.enqueue("b");
// queue.enqueue("c");
// queue.enqueue("d");
// console.log(queue.items); //--> ["a", "b", "c", "d"]

// // dequeue() 测试
// queue.dequeue();
// queue.dequeue();
// console.log(queue.items); //--> ["c", "d"]

// // front() 测试
// console.log(queue.front()); //--> c

// // isEmpty() 测试
// console.log(queue.isEmpty()); //--> false

// // size() 测试
// console.log(queue.size()); //--> 2

// // toString() 测试
// console.log(queue.toString()); //--> c d

//击鼓传花
function passGame(nameList, num) {
    //create queue
    const queue1 = new Queue();
    for (const item of nameList) {
        queue1.enqueue(item);
    }
    // console.log("原队列", queue1.items);
    // 队列中只剩下最后一个元素就停止
    while (queue1.size() > 1) {
        for (let i = 0; i < num - 1; i++) {
            //讲num-1 的人从队列前端取出放到队列后端
            queue1.enqueue(queue1.dequeue());
        }
        //取出每轮num对应的那个人
        const demo = queue1.dequeue();
        console.log(demo);
    }
    const endName = queue1.front();

    //获取剩下的那个人
    // 5、返回这个人在原数组中对应的索引
    return endName;
}
const names = ["lily", "lucy", "tom", "tony", "jack"];
const targetIndex = passGame(names, 4);
console.log("击鼓传花", targetIndex); //--> lily
