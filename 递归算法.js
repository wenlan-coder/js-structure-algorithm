/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-25 10:19:39
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-25 10:44:46
 */

//递归算法 ：一般满足边界条件 递归前进段 递归返回段
//当满足边界条件时候 递归返回
//当递归条件不满足时候 递归请进
//优点： 代码简洁便于理解
//缺点：可能存在栈溢出 时间空间消耗大 可能存在重复的计算
//阶乘
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}
console.log(factorial(6));

function Fibonacci(n) {
    if (n < 0) throw new RangeError("small");
    if (n === 1 || n === 2) return 1;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
console.log(Fibonacci(6));
