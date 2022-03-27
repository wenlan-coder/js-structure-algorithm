/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-26 22:01:32
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-26 22:22:26
 */
//选择排序
Array.prototype.selectionSort = function () {
    for (let j = 0; j < this.length - 1; j++) {
        let min = j;
        for (let i = min + 1; i < this.length; i++) {
            //从i+1位置和后面内容比较
            if (this[min] > this[i]) {
                //记录i+1后面的最小值
                min = i;
            }
            //出来交换数据
            let temp = this[min]; //最小值
            this[min] = this[j];
            this[j] = temp;
        }
    }
};
const arr = [5, 4, 3, 2, 1];
console.log(arr);
arr.selectionSort();
console.log(arr);
