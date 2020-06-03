# 树

## 基本概念

* **树**：包含一系列存在父子关系的节点，每个节点都有一个父节点（除了顶部的第一个节点）以及零个或度多个子节点。

* **二叉树**：最多只有两个子节点，一个左侧子节点，一个右侧子节点。

* **二叉搜索树**（BST）：是二叉树的一种，但只允许你在左侧节点存储比父节点小的值，在右侧节点存储比父节点大的值。

* **满二叉树**：一棵二叉树的结点要么是叶子结点，要么它有两个子结点（如果一个二叉树的层数为K，且结点总数是(2^k) -1，则它就是满二叉树。）

* **完全二叉树**：若设二叉树的深度为k，除第 k 层外，其它各层 (1～k-1) 的结点数都达到最大个数，第k 层所有的结点都连续集中在最左边，这就是完全二叉树。

* **平衡二叉树**：它或者是一颗空树，或它的左子树和右子树的深度之差(平衡因子)的绝对值不超过1，且它的左子树和右子树都是一颗平衡二叉树。

* **最优二叉树（哈夫曼树）**：树的带权路径长度达到最小，称这样的二叉树为最优二叉树，也称为哈夫曼树(Huffman Tree)。哈夫曼树是带权路径长度最短的树，权值较大的结点离根较近。

## 代码实现二叉搜索树
```js
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}


// 二叉搜索树 => 假设树中不存在重复节点，且节点都是数值类型的值
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 向树中插入一个元素
  insert(key) {
    if (this.root) {
      this.insertNode(this.root, key);
    } else {
      this.root = new Node(key);
    }
  }
  insertNode(node, key) {
    if (node.key > key) {
      if (node.left) {
        this.insertNode(node.left, key);
      } else {
        node.left = new Node(key);
      }
    } else {
      if (node.right) {
        this.insertNode(node.right, key);
      } else {
        node.right = new Node(key);
      }
    }
  }
  // 中序遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  // 先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  // 后序遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node, callback) {
    if (node) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // 最小值
  min() {
    if (this.root) {
      return this.minNode(this.root);
    } else {
      return undefined;
    }
  }
  minNode(node) {
    let current = node;
    while (current && current.left) {
      current = current.left;
    }
    return current.key;
  }

  // 最大值
  max() {
    if (this.root) {
      return this.maxNode(this.root);
    } else {
      return undefined;
    }
  }
  maxNode(node) {
    let current = node;
    while (current && current.right) {
      current = current.right;
    }
    return current.key;
  }

  // 查找某个特定值
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (!node) return false;
    if (node.key > key) {
      return this.searchNode(node.left, key);
    } else if (node.key < key) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  //移除一个节点
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (!node) return null;
    if (node.key > key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (node.key < key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 删除的元素是叶节点
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }
      // 删除的元素只有一个节点
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }
      // 删除的元素同时有两个节点
      let aux = this.minNode(node.right);
      node.key = aux;
      node.right = this.removeNode(node.right, aux);
      return node;
    }
  }
}
```
```js
// 测试
let list = [5, 6, 5.5, 1, 2, 4, 8, 7, 9];
let tree = new BinarySearchTree();
for (let i = 0; i < list.length; i++) {
  tree.insert(list[i]);
};
console.log(tree);

let inOrderArr = [];
tree.inOrderTraverse(function (key) {
  inOrderArr.push(key);
});

let preOrderArr = [];
tree.preOrderTraverse(function (key) {
  preOrderArr.push(key);
});

let postOrderArr = [];
tree.postOrderTraverse(function (key) {
  postOrderArr.push(key);
});


console.log('中序遍历：', inOrderArr);
console.log('前序遍历：', preOrderArr);
console.log('后序遍历：', postOrderArr);

console.log('树的最小值为：', tree.min());
console.log('树的最大值为：', tree.max());

let key = 9;
console.log(`树中是否存在${key}：`, tree.search(key));

console.log(tree.remove(6), tree); 
```