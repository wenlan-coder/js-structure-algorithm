/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-23 11:15:24
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-23 15:51:23
 */

//单向链表
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
const linkedList = new LinkedList();
// 测试 append 方法
linkedList.append("A");
linkedList.append("B");
linkedList.append("C");
console.log(linkedList);
// 测试 insert 方法
linkedList.insert(0, "123");
linkedList.insert(2, "456");
console.log(linkedList.toString()); //--> 123 AA 456 BB CC
// 测试 getData 方法
console.log(linkedList.getData(0)); //--> 123
console.log(linkedList.getData(1)); //--> AA

// 测试 indexOf 方法
console.log(linkedList.indexOf("AA")); //--> 1
console.log(linkedList.indexOf("ABC")); //--> -1

// 测试 update 方法
linkedList.update(0, "12345");
console.log(linkedList.toString()); //--> 12345 AA 456 BB CC
linkedList.update(1, "54321");
console.log(linkedList.toString()); //--> 12345 54321 456 BB CC

// 测试 removeAt 方法
linkedList.removeAt(3);
console.log(linkedList.toString()); //--> 12345 54321 456 CC

// 测试 remove 方法
linkedList.remove("C");
console.log(linkedList.toString()); //--> 12345 54321 456
