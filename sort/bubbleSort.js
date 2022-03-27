/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-26 21:47:36
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-26 21:56:20
 */
//冒泡排序
//O(n*n)
//优化 1243 第一轮循环不在交换数据 则推出
Array.prototype.bubbleSort = function () {
    for (let j = this.length - 1; j >= 0; j--) {
        let done = true;
        for (let i = 0; i < j; i++) {
            if (this[i] > this[i + 1]) {
                let temp = this[i + 1];
                this[i + 1] = this[i];
                this[i] = temp;
                done = false;
            }
        }
        if (done) {
            break;
        }
    }
};
const array = [1, 2, 4, 3];
array.bubbleSort();
console.log(array);
