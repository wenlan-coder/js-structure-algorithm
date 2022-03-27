/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-25 22:18:15
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-26 10:31:59
 */
// 字典结构的封装
class Dictionary {
    constructor() {
        this.items = {};
    }

    // has(key) 判断字典中是否存在某个 key
    has(key) {
        return this.items.hasOwnProperty(key);
    }

    // set(key, value) 在字典中添加键值对
    set(key, value) {
        this.items[key] = value;
    }

    // remove(key) 在字典中删除指定的 key
    remove(key) {
        // 如果集合不存在该 key，返回 false
        if (!this.has(key)) return false;
        delete this.items[key];
    }

    // get(key) 获取指定 key 的 value，如果没有，返回 undefined
    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }

    // 获取所有的 key
    keys() {
        return Object.keys(this.items);
    }

    // 获取所有的 value
    values() {
        return Object.values(this.items);
    }

    // size() 获取字典中的键值对个数
    size() {
        return this.keys().length;
    }

    // clear() 清空字典中所有的键值对
    clear() {
        this.items = {};
    }
}
class Queue {
    constructor() {
        this.items = [];
    }
    //进入队列
    enqueue(item) {
        this.items.push(item);
    }
    //从队列前端删除
    dequeue() {
        return this.items.shift();
    }
    //查看顶端元素
    front() {
        return this.items[0];
    }
    // isEmpty() 查看队列是否为空
    isEmpty() {
        return this.items.length === 0;
    }

    // size() 查看队列中元素的个数
    size() {
        return this.items.length;
    }

    // toString() 将队列中的元素以字符串形式返回
    toString() {
        let result = "";
        for (let item of this.items) {
            result += item + " ";
        }
        return result;
    }
}

class Graph {
    constructor() {
        this.vertexes = []; //存储顶点
        this.edges = new Dictionary(); //存储边
    }
    //添加方法
    addVertex(v) {
        this.vertexes.push(v);
        // 添加点的关系  采用邻接矩阵法 结构用字典
        this.edges.set(v, []);
    }
    //2添加边方法
    addEdge(v1, v2) {
        //无向表
        this.edges.get(v1).push(v2);
        this.edges.get(v2).push(v1);
    }
    //
    toString() {
        //定义字符串保存最终结果
        let res = "";
        for (let i = 0; i < this.vertexes.length; i++) {
            res += this.vertexes[i] + "->";
            // console.log(res);
            let vEdges = this.edges.get(this.vertexes[i]);
            for (let j = 0; j < vEdges.length; j++) {
                res += vEdges[j] + "";
            }
            res += "\n";
        }
        return res;
    }
    //图的遍历
    //Breadth First Search
    //Depth First Search

    //初始话顶点的颜色
    //白色 该节点还违背访问
    //红色 该节点访问过 但未探索过
    //黑色 该节点被访问过且被探索过
    _initializeColor() {
        let colors = [];
        for (let i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = "white";
        }
        return colors;
    }
    //广度优先搜索 基于队列实现 先宽后深度 1从给定节点找相临近节点
    // BFS(initV, handle) {
    //     //初始化颜色
    //     let colors = this._initializeColor();
    //     //创建队列
    //     let queue = new Queue();
    //     //将顶点加入队列
    //     queue.enqueue(initV);
    //     //循环从队列中取出元素
    //     while (!queue.isEmpty()) {
    //         //取出顶点(队头)
    //         let v = queue.dequeue();
    //         //获取和顶点相连的临近顶点
    //         let vList = this.edges.get(v);
    //         //将v的颜色设置灰色 已经访问
    //         colors[v] = "gray";
    //         //遍历所有顶点 并且加入队列中
    //         //这一步骤完成bfs关键 利用队列先进先出 继续遍历
    //         for (let i = 0; i < vList.length; i++) {
    //             let a = vList[i];
    //             if (colors[a] === "white") {
    //                 //没有遍历过
    //                 colors[a] = "gray"; //设置以访问
    //                 queue.enqueue(); //从队列取出
    //             }
    //         }
    //         //设置访问完节点颜色
    //         colors[v] = "black";
    //         if (handle) [handle(v)];
    //     }
    // }
    // 广度优先搜索
    bfs(handle) {
        // 1.初始化颜色
        let color = this._initializeColor();
        // 2. 创建队列
        let queue = new Queue();
        // 3. 将传入的顶点放入队列
        queue.enqueue(this.vertexes[0]);
        // 4.依赖队列操作数据   队列不为空时一直持续
        while (!queue.isEmpty()) {
            // 4.1 拿到队头
            let qVal = queue.dequeue();
            //  4.2 拿到队头所关联（相连）的点并设置为访问中状态（灰色）
            let qAdj = this.edges.get(qVal);
            color[qVal] = "gray";
            // 4.3 将队头关联的点添加到队尾
            // 这一步是完成bfs的关键，依赖队列的先进先出的特点。
            for (let i = 0; i < qAdj.length; i++) {
                let a = qAdj[i];
                if (color[a] === "white") {
                    color[a] = "gray";
                    queue.enqueue(a);
                }
            }
            // 4.5设置访问完的点为黑色。
            color[qVal] = "black";
            if (handle) {
                handle(qVal);
            }
        }
    }
    // 深度优先搜索
    //DFS
    dfs(handle) {
        // 1.初始化颜色
        let color = this._initializeColor();
        // 2. 遍历所有顶点，开始访问
        for (let i = 0; i < this.vertexes.length; i++) {
            if (color[this.vertexes[i]] === "white") {
                this._dfsVisit(this.vertexes[i], color, handle);
            }
        }
    }
    // dfs的递归方法  这里直接使用函数的调用栈
    _dfsVisit(val, color, handle) {
        // 1. 将颜色设置为访问中
        color[val] = "gray";
        // 2. 执行相应的回调
        if (handle) {
            handle(val);
        }
        // 3. 拿与该点相邻的点，对每个点操作
        let adj = this.edges.get(val);
        for (let i = 0; i < adj.length; i++) {
            let w = adj[i];
            // 如果相邻点未未访问状态，开始访问。
            if (color[w] === "white") {
                this._dfsVisit(w, color, handle);
            }
        }
        // 4. 处理完后设置为访问过点。
        color[val] = "black";
    }
}
const graph = new Graph();
let myVertexe = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (const item of myVertexe) {
    graph.addVertex(item);
}
// 添加边
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");
console.log(graph);
console.log(graph.toString());
// 调用广度优先算法
let result = "";
graph.bfs(function (v) {
    result += v + " ";
});
console.log(result); // A B C D E F G H I
// 调用深度优先算法
result = "";
graph.dfs(function (v) {
    result += v + " ";
});
// 输出深度优先
console.log(result); //A B E I F C D G H
