/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-26 18:51:25
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-26 22:33:00
 */
//插入排序
Array.prototype.insertionSort = function () {
    for (let i = 1; i < this.length; i++) {
        let temp = this[i]; //取得第二个值
        let j = i; //第二个索引i
        // j 为0 跳出循环 比较到索引为0位置i
        while (j > 0) {
            if (this[j - 1] > temp) {
                this[j] = this[j - 1];
            } else {
                break;
            }
            j--;
        }
        this[j] = temp;
    }
};
const arr = [5, 23, 4343, 24, 434];
console.log(arr);
arr.insertionSort();
console.log(arr);
// Array.prototype.insertionSort = function () {
//     for (let i = 0; i < this.length; i++) {
//         let temp = this[i]; //记录第二个数
//         let j = i; //记录第二个数索引
//         while (j > 0) {
//             if (this[j - 1] > temp) {
//                 this[j] = this[j - 1];
//             } else {
//                 break;
//             }
//             j--;
//         }
//         this[j] = temp;
//     }
// };
