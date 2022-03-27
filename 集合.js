/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-23 21:34:24
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-23 22:12:26
 */
//手动封装集合
class Set {
    constructor() {
        this.items = {};
    }
    has(value) {
        return this.items.hasOwnProperty(value);
    }
    //在集合中添加元素
    add(value) {
        if (this.has(value)) return false;
        this.items[value] = value;
        return true;
    }
    remove(value) {
        if (!this.has(value)) return false;
        delete this.items[value];
    }
    //清空
    clear() {
        this.items = {};
    }
    size() {
        return Object.keys(this.items).length;
    }
    //获取集合中所有元素
    values() {
        return Object.keys(this.items);
    }
    //集合并集
    union(otherSet) {
        const unionSet = new Set();
        //第一个集合元素
        for (const value of this.values()) {
            unionSet.add(value);
        }
        //第二个集合元素
        for (const value of otherSet.values()) {
            unionSet.add(value);
        }
        return unionSet;
    }
    //集合交集
    intersection(otherSet) {
        const unionSet = new Set();
        //从当前集合取出values 判断另一个集合是否存在 则add新集合
        for (const value of this.values()) {
            if (otherSet.has(value)) {
                unionSet.add(value);
            }
        }
        return unionSet;
    }
    //差集
    different(otherSet) {
        const unionSet = new Set();
        //从当前集合取出values 判断另一个集合是否存在 则add新集合
        for (const value of this.values()) {
            if (!otherSet.has(value)) {
                unionSet.add(value);
            }
        }
        return unionSet;
    }
    //子集
    subset(otherSet) {
        for (const value of this.values()) {
            if (!otherSet.has(value)) {
                return false;
            }
            return true;
        }
    }
}

const set = new Set();

// add() 测试
set.add("abc");
set.add("abc");
set.add("123");
set.add("zxc");
console.log(set); //--> {items: {123: "123", abc: "abc", zxc: "zxc"}}
const set1 = new Set();

// add() 测试
set1.add("abc");
set1.add("wenlan");
set1.add("yyds");
console.log(set1);
console.log(set.union(set1));
console.log(set.intersection(set1));
console.log(set.subset(set1));
// // has() 测试
// console.log(set.has("123")); //--> true
// console.log(set.has("456")); //--> false

// // remove() 测试
// set.remove("abc");
// console.log(set); //--> {items: {123: "123", zxc: "zxc"}}

// // size() 测试
// console.log(set.size()); //--> 2

// // values() 测试
// console.log(set.values()); //--> ["123", "zxc"]

// // clear() 测试
// // set.clear();
// console.log(set.values()); //--> []
