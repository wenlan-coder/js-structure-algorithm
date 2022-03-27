/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-24 15:35:32
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-24 17:40:19
 */
//hashcode 函数
//设计hash函数 1 讲字符串转换位大数字 hashcode  长度为质数
//2 讲大数字压缩到数组范围 取余   补充：位运算也可以 java hashmap就是这样实现
//charcodeAt 转换为unicode
//3 解决冲突为链表法 这里用数组代替链表 都为T（n）= O(n)
//4 优化扩容 减容
//4 优化 判断table长度是不是质数
function hashFunc(str, limit = 7) {
    //定义hashcode
    let hashcode = 0;
    //质数作为幂运算
    const PRIME = 31;
    //秦久韶算法
    for (const item of str) {
        hashcode = PRIME * hashcode + item.charCodeAt();
    }
    //取余
    return hashcode % limit;
}

console.log(hashFunc("123")); //--> 5
console.log(hashFunc("abc")); //--> 6

//封装hashmap
class HashTable {
    constructor() {
        this.storage = []; //hash表村存储数据变量
        this.count = 0; //存储的数据个数
        this.limit = 7; //hashtable的长度
    }
    //methods
    //hashFunc
    hashFunc(str, limit = 7) {
        //定义hashcode
        let hashcode = 0;
        //质数作为幂运算
        const PRIME = 31;
        //秦久韶算法
        for (const item of str) {
            hashcode = PRIME * hashcode + item.charCodeAt();
        }
        //取余
        return hashcode % limit;
    }
    //插入/修改数据
    put(key, value) {
        //根据key获取索引值 通过hash函数获取 [cat,1092]
        const index = this.hashFunc(key, this.limit);
        console.log(index);
        //根据索引值取出bucket
        let bucket = this.storage[index];
        //3 判断bucket是否存在
        if (bucket === undefined) {
            bucket = [];
            this.storage[index] = bucket;
            //保证此位置有bucket
        }
        //修改操作
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]; //取出元素
            //判断是否相等 tuple为二位数组
            if (tuple[0] === key) {
                tuple[1] = value;
                return;
            }
        }
        //添加操作bukcet添加数据
        bucket.push([key, value]);
        this.count++;
        //判断是否需要扩容
        if (this.count > this.limit * 0.75) {
            this.resize(this.getPrime(this.limit * 2));
        }
    }
    //获取操作
    get(key) {
        //1获取索引
        //2获取bucket
        //3 判断bucket是否为null yes=>null
        //4 线性遍历bucket 找到key对应value 否在为null
        //
        let index = this.hashFunc(key);
        let bucket = this.storage[index];
        if (!bucket) return null;
        for (const tuple of bucket) {
            if (tuple[0] === key) {
                return tuple[1];
            }
        }
        return null;
    }
    //删除方法
    remove(key) {
        let index = this.hashFunc(key);
        let bucket = this.storage[index];
        if (bucket === undefined) return null;
        //遍历bucket找到key对应tuple删除
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                bucket.splice(i, 1); //splice改变原数组 slcie不会
                this.count--;
                //删除一定程度 缩小容量
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    this.resize(Math.floor(this.getPrime(this.limit / 2)));
                }
                return tuple[i];
            }
        }
        //not found
        return null;
    }
    //判断hash是否为空
    isEmpty() {
        return this.count === 0;
    }
    //获取hash表中元素的个数
    size() {
        return this.count;
    }
    //hash表的扩容
    resize(newLimit) {
        //1保存旧的数组内容
        let oldstorge = this.storage;
        //重置所有的属性
        this.storage = [];
        this.count = 0;
        this.limit = newLimit;
        //取出bucket中数据重新插入
        for (const bucket of oldstorge) {
            if (bucket) {
                for (const tuple of bucket) {
                    this.put(tuple[0], tuple[1]);
                }
            }
        }
    }
    isPrime(number) {
        if (number <= 1) return false;
        for (let i = 2; i < number; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }
    //获取最近的质数
    getPrime(number) {
        while (!this.isPrime()) {
            number++;
        }
        return number;
    }
}

//test
const hashtable = new HashTable();
hashtable.put("cat", "猫");
hashtable.put("dog", "狗");
hashtable.put("wo", "人");
console.log(hashtable);
console.log(hashtable.get("cat"));
console.log(hashtable.size());
console.log(hashtable.isPrime(9));
