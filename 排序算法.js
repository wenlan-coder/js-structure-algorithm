/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-26 10:59:23
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-26 18:04:16
 */
//冒泡排序 /选择排序/插入排序/归并排序/计算排序/基数排序/希尔排序/堆排序/桶排序
//
//简单排序：冒泡 选择 插入
//高级：快排 希尔
//封装Arraylist
class Arraylist {
    constructor() {
        this.array = [];
    }
    insert(item) {
        this.array.push(item);
    }
    toString() {
        return this.array.join("-");
    }
    swap(m, n) {
        let temp = this.array[m];
        this.array[m] = this.array[n];
        this.array[n] = temp;
    }
    //bubble sort 冒泡排序
    //思路 先交换两个数大小 大数放后面
    // 比较n-1 次即可 完成所有数排序
    //优化：1，2，4，3  增加标志位 如果第一轮循环就不再交换数据 则返回
    //时间复杂度：最好0(n) 最坏O(N*N)
    //空间复杂度：O（1）
    bubbleSort() {
        for (let j = this.array.length - 1; j >= 0; j--) {
            let done = true;
            for (let i = 0; i < j; i++) {
                if (this.array[i] > this.array[i + 1]) {
                    this.swap(i, i + 1);
                    done = false;
                }
            }
            if (done) {
                break;
            }
        }
        return this.array;
    }
    //selection sort 选择排序
    selectionSort() {
        //1 获取数组的长度
        let length = this.array.length;

        for (let j = 0; j < length - 1; j++) {
            //从 i+1位置和后面内容比较
            let min = j;
            for (let i = min + 1; i < length; i++) {
                //如果i位置大于i+1位置 记录最小位置
                if (this.array[min] > this.array[i]) {
                    min = i;
                }
                //交换min i 位置
                this.swap(min, j);
            }
        }
        return this.array;
    }
    //希尔排序 O（n*n）
    //shell sort
    shellSort() {
        //获取数组的长度
        let length = this.array.length;
        //计算希尔增量
        let gap = Math.floor(length / 2);
        //增量不断变大 大于0 就继续排序
        while (gap > 0) {
            //实现插入排序
            for (let i = gap; i < length; i++) {
                //保存临时变量
                let j = i;
                let temp = this.array[i];
                //插入排序的内层循环
                while (j > gap - 1 && this.array[j - gap] > temp) {
                    this.array[j] = this.array[j - gap];
                    j -= gap;
                }
                //将选出的j位置设置为temp
                this.array[j] = temp;
            }
            //重新计算新的间距
            gap = Math.floor(gap / 2);
        }
        return this.array;
    }
    //快速排序
    //quick sort
    //
    quickSort() {
        const recursion = arr => {
            if (arr.length <= 1) return arr;
            const left = [];
            const right = [];
            const mid = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] < mid) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
            return [...recursion(left), mid, ...recursion(right)];
        };
        const res = recursion(this.array);
        return res;
    }
}
let list = new Arraylist();
//插入元素
list.insert(66);
list.insert(55);
list.insert(88);
list.insert(100);
list.insert(438);
list.insert(23);
list.insert(2);
console.log(list);
// console.log(list.selectionSort());
// console.log(list.shellSort());
console.log(list.quickSort());
