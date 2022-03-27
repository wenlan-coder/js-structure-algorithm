/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-22 22:32:18
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-22 22:53:49
 */
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
//优先队列内部元素类
class QueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
//优先队列类
class PriorityQueue extends Queue {
    constructor() {
        super();
    }
    //enqueue(element,priority)入队 讲元素按优先级入队
    //重写enqueue函数
    enqueue(element, priority) {
        const queueElement = new QueueElement(element, priority);
        //判断队列是否为空
        if (this.isEmpty()) {
            //如果为空 则直接加入队列头
            this.items.push(queueElement);
        }
        //不为空
        else {
            //记录是否成功添加新元素
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                //比较优先级 priority越小，优先级越大
                if (queueElement.priority < this.items[i].priority) {
                    //指定位置添加元素
                    this.items.splice(i, 0, queueElement);
                    added = true; //成功添加
                    break;
                }
            }
            // 如果遍历完所有元素，优先级都大于新插入的元素，就将新插入的元素插入到最后
            if (!added) {
                this.items.push(queueElement);
            }
        }
    }
    dequeue() {
        return super.dequeue();
    }
    front() {
        return super.front();
    }
    isEmpty() {
        return super.isEmpty();
    }
    size() {
        return super.size();
    }
    //重写
    toString() {
        let result = "";
        for (let item of this.items) {
            result += item.element + "-" + item.priority + "";
        }
        return result;
    }
}

const priorityQueue = new PriorityQueue();

// 入队 enqueue() 测试
priorityQueue.enqueue("A", 10);
priorityQueue.enqueue("B", 15);
priorityQueue.enqueue("C", 11);
priorityQueue.enqueue("D", 20);
priorityQueue.enqueue("E", 18);
console.log(priorityQueue.items);
//--> output:
// QueueElement {element: "A", priority: 10}
// QueueElement {element: "C", priority: 11}
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// 出队 dequeue() 测试
priorityQueue.dequeue();
priorityQueue.dequeue();
console.log(priorityQueue.items);
//--> output:
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// isEmpty() 测试
console.log(priorityQueue.isEmpty()); //--> false

// size() 测试
console.log(priorityQueue.size()); //--> 3

// toString() 测试
console.log(priorityQueue.toString()); //--> B-15 E-18 D-20
