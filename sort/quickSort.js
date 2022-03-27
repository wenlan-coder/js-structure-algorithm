/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-26 17:50:34
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-26 22:46:04
 */
//快排 O(n) = n(log(n))
Array.prototype.quickSort = function () {
    const recursion = arr => {
        if (arr.length === 1) return arr; //1个直接返回 //边界条件
        let left = [];
        let right = [];
        let mid = this[0]; //基准
        //跳过基准值
        for (let i = 1; i < arr.length; i++) {
            if (this[i] < mid) {
                this.left.push(this[i]);
            } else {
                this.right.push(this[i]);
            }
        }
        //递归
        return [...recursion(left), mid, ...recursion(right)];
    };
    let res = recursion(this);
    return res;
};

// Array.prototype.quickSort = function () {
//     const recursion = arr => {
//         if (arr.length <= 1) return arr;
//         const left = [];
//         const right = [];
//         const mid = arr[0];
//         for (let i = 1; i < arr.length; i++) {
//             if (arr[i] < mid) {
//                 left.push(arr[i]);
//             } else {
//                 right.push(arr[i]);
//             }
//         }
//         return [...recursion(left), mid, ...recursion(right)];
//     };
//     const res = recursion(this);
//     return res;
// };
// var quickSort1 = function (arr) {
//     if (arr.length <= 1) {
//         return arr;
//     }

//     var pivot = arr[0];

//     var left = [];

//     var right = [];

//     for (var i = 1; i < arr.length; i++) {
//         if (arr[i] < pivot) {
//             left.push(arr[i]);
//         } else {
//             right.push(arr[i]);
//         }
//     }

//     return quickSort1(left).concat([pivot], quickSort1(right));
// };
const list = [66, 55, 88, 19, 100, 230, 4, 2];
console.log(list.quickSort());
// console.log(quickSort1(list));
