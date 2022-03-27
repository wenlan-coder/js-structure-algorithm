/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-26 22:59:13
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-27 10:46:55
 */
//条件：有序数组
Array.prototype.binarySearch = function (key) {
    let low = 0;
    let high = Math.floor(this.length - 1);
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const element = this[mid];
        if (element < key) {
            low = mid + 1;
        } else if (mid > key) {
            high = mid - 1;
        } else {
            return mid - 1;
        }
    }
    return -1;
};
console.log([1, 2, 3, 4, 5, 6, 7].binarySearch(1));
