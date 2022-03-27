/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-23 16:37:14
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-23 21:31:45
 */
class LinkedList {
    //初始化链表长度
    length = 0;
    //初始化链表的head 指向null head指向链表的第一个节点
    head = null;
    //内部类
    node = class Node {
        next = null;
        constructor(data) {
            this.data = data;
        }
    };
    constructor() {}
    //methods
    //链表尾部添加元素n
    append(data) {
        //创建新节点
        const newNode = new this.node(data);
        //判断是否添加的为第一个节点
        if (this.length === 0) {
            this.head = newNode;
        }
        //不是第一个节点
        else {
            //当前的节点
            let currentNode = this.head;
            while (currentNode.next !== null) {
                //循环依次指向最后一个节点
                currentNode = currentNode.next;
            }
            //如果current为空 添加新节点
            currentNode.next = newNode;
        }
        //添加成功后 length+1  i++有些语言不兼容
        this.length += 1;
    }
    toString() {
        let currentNode = this.head;
        let result = "";
        while (currentNode) {
            result += currentNode.data + "";
            currentNode = currentNode.next;
        }
        return result;
    }
    //在某位置插入节点;
    insert(position, data) {
        //边界清空
        if (position > this.length || position < 0) return false;
        //创建新节点
        const newNode = new this.node(data);
        if (position === 0) {
            newNode.next = this.head;
            //postion 为0
            this.head = newNode;
        } else {
            //定义上个节点
            let previousNode = new this.node();
            //下标
            let index = 0;
            //定义当前元素为hade
            let currentNode = this.head;

            //在 o-postion之间循环遍历 不断更新perviousNODE 和 currnetNode
            while (index++ < position) {
                //讲pervisoue移动到currentNode
                previousNode = currentNode;
                //讲currentNode向后移动
                currentNode = currentNode.next;
            }
            //插入元素 当前节点和当前节点上一节点插入元素
            console.log("currentndoe", currentNode);
            console.log("newNode", newNode);
            console.log("previoue", previousNode);
            newNode.next = currentNode;
            previousNode.next = newNode;
        }
        //更新链表的长度
        this.length++;
        return newNode;
    }
    //返回指定位置数据
    getData(position) {
        let currentndoe = this.head;
        let index = 0;
        if (position < 0 || position >= this.length) return false;
        while (index++ < position) {
            currentndoe = currentndoe.next;
        }
        return currentndoe.data;
    }
    //返回元素在链表中的索引
    indexOf(data) {
        let currentndoe = this.head;
        let index = 0;
        //current存在
        //判断首先cureent是否存在
        while (currentndoe) {
            while (currentndoe.data === data) {
                return index;
            }
            currentndoe = currentndoe.next;
            index++;
        }
        //没有返回-1
        return -1;
    }
    //修改指定元素data
    update(position, data) {
        if (position < 0 || position >= this.length) return false;
        let currentndoe = this.head;
        let index = 0;
        //找到position位置索引
        while (index++ < position) {
            currentndoe = currentndoe.next;
        }
        //赋值
        currentndoe.data = data;
    }
    //从链表特定位置移除position
    removeAt(position) {
        //越界判断 等于删除
        if (position < 0 || position >= this.length) return null;
        //situtuon1
        if (position === 0) {
            //head指向尾部
            this.head = this.head.next;
        }
        let previousNode = null;
        let currentndoe = this.head;
        let index = 0;
        //循环更新previouse current
        while (index++ < position) {
            previousNode = currentndoe;
            currentndoe = currentndoe.next;
        }
        //找到
        //让上一节点的 next 指向到当前的节点的 next，相当于删除了当前节点。
        previousNode.next = currentndoe.next;
        //更新链表的长度-1
        this.length--;
        return currentndoe;
    }
    //从链表中移除某一数据
    remove(data) {
        return this.removeAt(this.indexOf(data));
    }
    isEmpty() {
        return this.length === 0;
    }
    size() {
        return this.length;
    }
}
class Node {
    next = null;
    constructor(data) {
        this.data = data;
    }
}
class DobuleNode extends Node {
    constructor(element) {
        super(element);
        this.prev = null;
    }
}
class DoublyLinkedList extends LinkedList {
    constructor() {
        super();
        this.tail = null;
    }
    // append(element) 往双向链表尾部追加一个新的元素
    // 重写 append()
    append(element) {
        let newNode = new DobuleNode(element);
        //判断是否新节点
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            //双向链表 不同通过循环来找打最后元素tail 指向为最后元素
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }
    //
    toString() {
        return this.forwardString();
    }
    //返回正向遍历的字符串形式
    forwardString() {
        //第一个node
        let current = this.head;
        let result = "";
        //从后往前遍历 直至节点为null
        while (current) {
            result += current.data + "--";
            current = current.next;
        }
        //遍历完成
        return result;
    }
    //返回反向遍历的字符串形式
    backwordString() {
        let current = this.tail;
        let result = "";
        //从后往前遍历 直至节点为null
        while (current) {
            result += current.data + "--";
            current = current.prev;
        }
        //遍历完成
        return result;
    }
    insert(position, element) {
        //越界断问题
        if (position < 0 || position > this.length - 1) return false;
        //创建新节点
        const newNode = new DobuleNode(element);
        //判断插入的位置
        //在第一个位置插入元素
        if (position === 0) {
            if (this.head === null) {
                this.head = newNode;
                this.tail = newNode;
            }
            //不为空
            else {
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            }
        }
        //在最后一个位置插入元素 不需要判断链表为空 position ===0 上面以及处理
        else if (position === this.length) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        //组后一种情况 在练表中间插入元素
        else {
            //查找索引
            let targetIndex = 0;
            let currentndoe = this.head;
            let previousNode = null;
            //要插入位置的节点
            while (targetIndex++ < position) {
                previousNode = currentndoe;
                currentndoe = currentndoe.next;
            }
            //交换节点信息
            newNode.next = currentndoe;
            previousNode.next = newNode;
            newNode.prev = previousNode;
            currentndoe.prev = newNode;
        }
        this.length++;
        return true;
    }
    //返回指定位置数据;
    getData(position) {
        //继承单向链表
        //可以优化 length /2 > position 从前往后遍历  否在 从后往前
        return super.getData(position);
        // if (position < 0 || position >= this.length) return false;
        // let current = this.head;
        // let idnex = 0;
        // while (index++ < position) {
        //     current = current.next;
        // }
        // return current.data;
    }
    indexOf(element) {
        //继承
        return super.indexOf(element);
        //     let index = 0;
        //     let current = this.head;
        //     while (current) {
        //         while (current === element) {
        //             return current.data;
        //         }
        //         current = current.next;
        //         index++;
        //     }
        //     return -1
    }
    //删除指定位置的元素
    //重写
    removeAt(position) {
        if (position < 0 || position >= this.length) return false;
        //判断删除的位置
        //删除第一个位置元素
        let current = this.head;
        if (position === 0) {
            //只有一个节点
            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            }
            //有多个节点
            else {
                this.head = this.head.next;
                this.head.prev = null;
            }
        }
        //如果在尾部删除元素
        else if (position === this.length - 1) {
            //最好一个节点
            current = this.tail;
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        }
        //在中间删除元素
        else {
            let index = 0;
            while (index++ < position) {
                current = current.next;
            }
            //找到位置
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.length--;
        return current.data;
    }

    //删除元素
    remove(element) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    //修改元素
    update(position, newData) {
        if (position < 0 || position >= this.length) return fasle;
        //寻找正确的节点
        let current = this.head;
        let index = 0;
        while (index++ < position) {
            current = current.next;
        }
        current.data = newData;
        return true;
    }
    isEmpty() {
        return super.isEmpty();
    }
    size() {
        return super.size();
    }
    //获取链表的第一个元素
    getHead() {
        return this.head;
    }
    //获取链表的最后一个元素
    getTail() {
        return this.tail;
    }
}

const doublyLinkedList = new DoublyLinkedList();

// append() 测试
doublyLinkedList.append("ZZ");
doublyLinkedList.append("XX");
doublyLinkedList.append("CC");
console.log(doublyLinkedList.toString());

// insert() 测试
doublyLinkedList.insert(0, "00");
doublyLinkedList.insert(2, "22");
console.log(doublyLinkedList.toString());

// getData() 测试
console.log(doublyLinkedList.getData(1)); //--> ZZ

// indexOf() 测试
console.log(doublyLinkedList.indexOf("XX")); //--> 3
// removeAt() 测试
console.log("删除之前", doublyLinkedList.toString());
doublyLinkedList.removeAt(0);
doublyLinkedList.removeAt(1);
console.log(doublyLinkedList.toString());
// remove() 测试
console.log(doublyLinkedList.remove("ZZ"));
console.log(doublyLinkedList.toString());
doublyLinkedList.update(0, "wenlan");
console.log(doublyLinkedList.toString());
console.log(doublyLinkedList.size());
console.log(doublyLinkedList.getHead());
console.log(doublyLinkedList.getTail());
