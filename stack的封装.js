/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-22 16:37:04
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-23 21:31:27
 */
//LIFO
class Stack {
    constructor() {
        this.stack = [];
    }
    //入栈
    push(item) {
        this.stack.push(item);
    }
    //出栈
    pop() {
        return this.stack.pop();
    }
    //查看栈顶元素
    peek() {
        return this.stack[this.stack.length - 1];
    }
    //查看栈是否为空
    isEmpty() {
        return this.stack.length === 0;
    }
    //查看栈里面元素个数
    size() {
        return this.stack.length;
    }
    //返回以字符串的形式作为返回
    toString() {
        let result = "";
        for (const item of this.stack) {
            result += item + "";
        }
        return result;
    }
}
// 栈结构的封装

const stack = new Stack();
// push() 测试
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack); //--> [1, 2, 3]

// pop() 测试
console.log(stack.pop()); //--> 3

// peek() 测试
console.log(stack.peek()); //--> 2

// isEmpty() 测试
console.log(stack.isEmpty()); //--> false

// size() 测试
console.log(stack.size()); //--> 2

// toString() 测试
console.log(stack.toString()); //--> 1 2

//封装十进制转二进制函数
function dec2bin(dec) {
    const stack = new Stack();
    while (dec > 0) {
        stack.push(dec % 2); // 取余
        dec = Math.floor(dec / 2); //
    }
    let binaryString = "";
    while (!stack.isEmpty()) {
        binaryString += stack.pop();
    }
    return binaryString;
}
console.log(dec2bin(100));
console.log(dec2bin(100));
console.log(dec2bin(100));
