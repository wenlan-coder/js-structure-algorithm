/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-03-24 21:18:58
 * @LastEditors: wenlan
 * @LastEditTime: 2022-03-25 17:31:58
 */
//节点类

class BinarySearchTree {
    root = null;
    node = class Node {
        constructor(key) {
            this.left = null;
            this.key = key;
            this.right = null;
        }
    };
    constructor() {}
    //插入数据
    insert(key) {
        //创建新节点
        const newNode = new this.node(key);
        //没有根节点
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }
    //比较传入两个节点 root newNode
    insertNode(node, newNode) {
        //向左查找
        if (newNode.key < node.key) {
            //如果左节点为空
            if (node.left === null) {
                node.left = newNode;
            } else {
                //继续递归下一个左节点
                this.insertNode(node.left, newNode);
            }
        }
        //向右查找
        else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    //遍历二叉搜索树 DLR
    //  先序遍历; 1 访问根节点  2访问左子树 3 访问右子树
    //栈结构：
    // DLR(5)
    // -- DLR(NULL) [1,2,3,4]
    // -- DLR(4) [1,2,3,4]
    // DLR(3) [1,2,3]
    // DLR(2) [1,2]
    // DLR(1) [1]
    preorderTraversal() {
        const result = [];
        this.preorderTraversalNode(this.root, result);
        return result;
    }
    //DLR内部方法 递归
    preorderTraversalNode(node, result) {
        if (node === null) return result;
        result.push(node.key);
        this.preorderTraversalNode(node.left, result);
        this.preorderTraversalNode(node.right, result);
    }
    //中序遍历LDR
    inorderTraversal() {
        const result = [];
        this.inorderTraversalNode(this.root, result);
        return result;
    }
    inorderTraversalNode(node, result) {
        if (node === null) return result;
        this.inorderTraversalNode(node.left, result);
        result.push(node.key);
        this.inorderTraversalNode(node.right, result);
    }
    //后序遍历（左右根 LRD）
    postorderTraversal() {
        const result = [];
        this.postorderTraversalNode(this.root, result);
        return result;
    }

    postorderTraversalNode(node, result) {
        if (node === null) return result;
        this.postorderTraversalNode(node.left, result);
        this.postorderTraversalNode(node.right, result);
        result.push(node.key);
    }
    //最小值
    min() {
        if (!this.root) return null;
        let node = this.root;
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    //  //最小值
    max() {
        if (!this.root) return null;
        let node = this.root;
        while (node.right !== null) {
            node = node.right;
        }
        return node;
    }
    //寻找特定的值
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node === null) return false;
        if (key < node.key) {
            return this.searchNode(node.left, key);
        } else if (key > node.key) {
            return this.searchNode(node.right, key);
        } else {
            return { message: true, node };
        }
    }
    //删除数据
    // 1 先找到需要删除的节点 若没找到 则不需要删除
    // 首先定义变量current 用于保存需要删除的节点  parent表示父亲节点  isleft保存current是否parent的左节点
    // 这样方便删除之后删除相关节点的指向
    // 删除节点
    remove(key) {
        let currentNode = this.root;
        let parentNode = null;
        let isLeftChild = true;

        // 循环查找到要删除的节点 currentNode，以及它的 parentNode、isLeftChild
        while (currentNode.key !== key) {
            parentNode = currentNode;

            // 小于，往左查找
            if (key < currentNode.key) {
                isLeftChild = true;
                currentNode = currentNode.left;
            } else {
                // 否则往右查找
                isLeftChild = false;
                currentNode = currentNode.right;
            }

            // 找到最后都没找到相等的节点，返回 false
            if (currentNode === null) {
                return false;
            }
        }

        // 1、删除的是叶子节点的情况
        if (currentNode.left === null && currentNode.right === null) {
            if (currentNode === this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parentNode.left = null;
            } else {
                parentNode.right = null;
            }

            // 2、删除的是只有一个子节点的节点
        } else if (currentNode.right === null) {
            // currentNode 只存在左节点
            //-- 2.1、currentNode 只存在<左节点>的情况
            //---- 2.1.1、currentNode 等于 root
            //---- 2.1.2、parentNode.left 等于 currentNode
            //---- 2.1.3、parentNode.right 等于 currentNode

            if (currentNode === this.root) {
                this.root = currentNode.left;
            } else if (isLeftChild) {
                parentNode.left = currentNode.left;
            } else {
                parentNode.right = currentNode.left;
            }
        } else if (currentNode.left === null) {
            // currentNode 只存在右节点
            //-- 2.2、currentNode 只存在<右节点>的情况
            //---- 2.1.1 currentNode 等于 root
            //---- 2.1.1 parentNode.left 等于 currentNode
            //---- 2.1.1 parentNode.right 等于 currentNode

            if (currentNode === this.root) {
                this.root = currentNode.right;
            } else if (isLeftChild) {
                parentNode.left = currentNode.right;
            } else {
                parentNode.right = currentNode.right;
            }

            // 3、删除的是有两个子节点的节点
        } else {
            // 1、找到后续节点
            let successor = this.getSuccessor(currentNode);

            // 2、判断是否为根节点
            if (currentNode === this.root) {
                this.root = successor;
            } else if (isLeftChild) {
                parentNode.left = successor;
            } else {
                parentNode.right = successor;
            }

            // 3、将后续的左节点改为被删除的左节点
            successor.left = currentNode.left;
        }
    }

    // 获取后续节点，即从要删除的节点的右边开始查找最小的值
    getSuccessor(delNode) {
        // 定义变量，保存要找到的后续
        let successor = delNode;
        let current = delNode.right;
        let successorParent = delNode;

        // 循环查找 current 的右子树节点
        while (current !== null) {
            successorParent = successor;
            successor = current;
            current = current.left;
        }

        // 判断寻找到的后续节点是否直接就是要删除节点的 right
        if (successor !== delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }
        return successor;
    }
}
//test
const BST = new BinarySearchTree();
BST.insert(11);
BST.insert(7);
BST.insert(15);
BST.insert(5);
BST.insert(9);
BST.insert(8);
BST.insert(10);
BST.insert(3);
BST.insert(6);
BST.insert(13);
BST.insert(12);
BST.insert(14);
BST.insert(20);
BST.insert(18);
BST.insert(25);
console.log(BST);
console.log("DLR", BST.preorderTraversal());
console.log("LRD", BST.inorderTraversal());
console.log("LRD", BST.postorderTraversal());
console.log("min", BST.min());
console.log("min", BST.max());
console.log("search", BST.search(25));
console.log(BST.remove(14));

//