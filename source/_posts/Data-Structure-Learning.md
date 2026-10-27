---
title: Data Structure Learning (C)
date: 2026-10-28
tags: [SCSE]
categories:
    - 学习
---

本文是基于C语言实现的数据结构总结教程。

# 第二章：线性表（List）

**线性表**：$A=(a_1,a_2,...,a_n)$。

在线性表中，除了第一个元素和最后一个元素，序列中任何一个元素**有且只有**一个直接前驱元素，**有且只有**一个直接后继元素。

在线性表中，我们通常会进行以下操作。

```Markdown
01. 创建一个新的线性表。
02. 求线性表的长度。
03. 检索线性表中第i个数据元素(1≤i≤n)。
04. 根据数据元素的某数据项(通常称为关键字)的值求该数据元素在线性表中的位置(查找)。
06. 在线性表的第i个位置上插入一个新的数据元素。
07. 删除线性表中第i个数据元素。
08. 对线性表中的数据元素按照某一个数据项的值的大小做升序或者降序排序。
………………
```

## 1\.线性表的顺序存储（Sequence List）

**构造原理**：用一组**地址连续**的存储单元依次存储线性表的数据元素，数据元素之间的逻辑关系通过数据元素的**存储位置**直接反映。

C语言实现顺序存储结构的机制就是**数组**。

### （1）主要操作：查找（Search）

```C
int searchElem(elemType seqList[], int listSize, elemType item) {
    for (int i = 0; i < listSize; ++i) {
        if (seqList[i] == item) {
            return i;
        }
    }
    return -1; //目标元素不在线性表中
}
```

上述查找算法的时间复杂度为O\(n\)，如果我们能保证数据集按某种确定的规则排列，我们可以采取更高效的查找算法——**折半查找**。其核心思想如下：

> 1\. 将要查找的有序数据集的**中间元素**与指定数据项相比较，假设是升序排列；

> 2\. 如果指定数据项小于该中间元素，则将数据集的前半部分指定为要查找的数据集，然后转步骤1；

> 3\. 如果指定数据项大于该中间元素，则将数据集的后半部分指定为要查找的数据集，然后转步骤1；

> 4\. 如果指定数据项等于中间元素，则查找成功结束；

> 5\. 最后如果数据集中没有元素再可进行查找，则查找失败。

```C
int searchElem(elemType seqList[], int listSize, elemType item) {
    int low = 0;         //查找范围开始
    int high = listSize - 1;         //查找范围结束
    while (low <= high) {
        int mid = low + ((high - low) >> 1);         //查找范围中间
        if (item < seqList[mid]) {
            high = mid - 1;
        } else if (item > seqList[mid]) {
            low = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}
```

上述算法的时间复杂度仅为O\(log n\)。

### （2）主要操作：插入（Insert）

## 2\.线性表的链式存储（Linked List）

# 第三章：栈与队列（Stack and Queue）

**栈**：元素后进先出（Last In First Out，LIFO），适于处理有**递归结构**的数据。

**队**：元素先进先出（First In First Out，FIFO），适于存放需要**按一定次序依次处理**但尚未处理的数据。

二者的逻辑结构均为**线性结构**，操作仅允许在线性表一端或两端进行，是一般线性表操作的子集。

## 1\.栈（Stack）

### （1）栈的基本概念

**栈**（Stack，堆栈）是一种只允许在表的**一端**进行插入操作和删除操作的线性表。允许操作的一端称为**栈顶**，栈顶元素的位置由一个称为**栈顶位置**的变量给出；当表中没有元素时，称之为**空栈**。

栈的基本操作有：栈顶插入（进栈、入栈、压栈）；栈顶删除（出栈、退栈、弹出）；测试栈是否满；测试栈是否空；创建一个空栈；检索当前栈顶元素。其操作仅仅是一般线性表操作的一个子集，只是插入和删除操作的位置受到限制。

### （2）栈的顺序存储结构

**构造原理**：利用一维数组`data[0 ~ MAXN – 1]`来表示，同时定义一个整型变量`top`给出栈顶元素的位置。数组是一种静态结构，而栈则是一种动态结构。

```C
#define MAXN <栈容量>
typedef struct Stack {
    elemType* data = (elemType*)malloc(sizeof(elemType) * MAXN);
    int top; //定义栈顶位置
} Stack;
```

**溢出**：分为**上溢**和**下溢**。

前者是指栈已满时做入栈操作（`top == MAXN - 1`），后者是指栈为空时做出栈操作（`top == -1`）。

1. 初始化堆栈

    ```C
    Stack* initStack() {
        Stack* stack = (Stack*)malloc(sizeof(Stack*));
        stack->top = -1;
        return stack;
    }
    ```

2. 测试堆栈是否为空或是否为满

    ```C
    int isEmpty(Stack* stack) {
        return (stack->top == -1);
    }
    
    int isFull(Stack* stack) {
        return (stack->top == MAXN - 1);
    }
    ```

3. 插入元素（进栈）

    ```C
    void pushStack(Stack* stack, elemType item) {
        if (isFull(stack)) {
            Error("Full Stack!");
        } else {
            stack->data[++top] = item;
        }
    }
    ```

4. 删除元素（出栈）

    ```C
    elemType popStack(Stack* stack) {
        if(isEmpty(stack)) {
            Error("Empty Stack!");
        }else{
            return Stack[top--];
        }
    }
    ```

### （3）栈的链式存储结构

**构造原理**：链栈就是用一个线性链表来实现一个栈结构，同时设置一个指针变量（用`top`表示）指出当前栈顶元素所在链结点的位置。空栈的标志是`top == NULL`。链栈是一种特殊的链表，其结点的插入（进栈）和删除（出栈）操作始终在**链表的头**。

```C
typedef struct stackNode {
    elemType data;
    struct stackNode* next;
} stackNode;

stackNode* top;
```

1. 初始化堆栈

    ```C
    void initStack() {
        top = NULL;
    }
    ```

2. 测试堆栈是否为空

    ```C
    int isEmpty() {
        return (top == NULL);
    }
    ```

3. 插入元素（进栈）

    ```C
    void pushStack(elemType item) {
        StackNode* ptr = (StackNode*) malloc(sizeof(StackNode));
        ptr->data = dada;    // 将data送新结点数据域
        ptr->next = top;     // 将新结点插在链表最前面
        top = ptr;     // 修改栈顶指针的指向
    }
    ```

4. 删除元素（出栈）

    ```C
    elemType popStack() {
        if (isEmpty()) {
            Error("Empty Stack!");
        } else {
            StackNode* ptr = top; //暂存栈顶结点的地址
            elemType x = top->data; //保存栈顶元素数据信息
            top = top->next; //删除栈顶结点
            free(ptr); //释放被删除节点
            return x; //返回出栈元素
        }
    }
    ```

### （4）栈的应用——表达式计算

对于一般形式的表达式，例如 $a+b\times c+(d\times e+f)/g$，通常称为**中缀表达式（infix）**。在（计算机）计算表达式的值时面临的主要问题有运算符存在优先级、括号改变运算次序等，因此引入了**后缀表达式（postfix，逆波兰表示）**。后缀表达式的显著特点是将运算符置于操作数之后，最大好处是没有括号，也不用考虑运算符的优先级！例如上式对应的后缀表达式为 $a\space b\space c\times+\space d\space e\times f+g\space/\space+$。

**后缀表达式的计算规则**：从左至右遍历后缀表达式中每个数字和符号。若是数字，则直接入栈；若是运算符（\+，\-，\*，/），则从栈中弹出两个元素进行计算（后弹出的是左运算数），并将计算结果进栈。遍历结束，将计算结果从栈中弹出（栈中应只有一个元素，否则表达式有错）。

**中缀表达式到后缀表达式**的转换规则：从左至右遍历中缀表达式中每个数字和符号。若是**操作数**则直接输出，即成为后缀表达式的一部分；若是**运算符**：\(1\) 若是"`)`"，则将栈中元素弹出并输出，直到遇到"`(`" ， "`(`"弹出但不输出；\(2\) 若是"`(`"， "`+`" ，"`-`"，"`*`"，"`/`"等符号，则从栈中弹出并输出优先级高于（或等于）当前的符号，直到遇到一个优先级低的符号，然后将当前符号压入栈中。优先级：当左括号在栈外时属于最高优先级，当左括号在栈内时属于最低优先级。遍历结束，将栈中所有元素依次弹出，直到栈为空。

> 若是**操作数**则直接输出，即成为后缀表达式的一部分；若是**运算符**则要判断优先级，若优先级大于栈顶元素（或者栈为空），则压入栈中，否则将栈顶元素出栈输出，然后将当前运算符压入栈中；当左括号在栈外时属于最高优先级，当左括号在栈内时属于最低优先级；如果是右括号，且栈顶元素不是左括号，持续出栈并输出，直到栈顶为左括号，出栈结束，最终将左括号出栈但不输出。遍历结束后将栈内所有元素依次输出。

## 2\.队（Queue）

### （1）队的基本概念

队（Queue，队列）是一种只允许在表的**一端**进行插入操作，而在表的**另一端**进行删除操作的线性表。允许插入的一端称为**队尾**，队尾元素的位置由`rear`指出；允许删除的一端称为**队头**，队头元素的位置由`front`指出。

队的基本操作有：队头插入（进队、入队）；队尾删除（出队、退队）；测试队是否满；测试队是否空；创建一个空队。其操作仅仅是一般线性表操作的一个子集，只是插入和删除操作的位置受到限制。

### （2）队的顺序存储结构

**构造原理**：借助一个一维数组`Queue[0 ~ M–1]`来描述队的顺序存储结构，同时，设置两个变量`front`与`rear`分别指出当前队头元素与队尾元素的位置。

`rear`指出实际队尾元素所在的位置，`front`指出实际队头元素所在位置，`count`指出实际队中元素个数。其中 `count = rear + 1 - front`。初始时，队为空，有`front == 0`，`rear == -1`；队为空的条件是`count == 0`。

在实际应用中，由于队元素需要频繁进出，上述结构很容易溢出（即`rear`到达数组尾，而实际队中元素并没有超出数组大小）。因此，在实际应用中通常将队设计成一个**循环队列**，从而提高空间利用率。

**循环队列**：把队列（数组）设想成头尾相连的循环表，使得数组前部由于删除操作而导致的无用空间尽可能得到重复利用。

```C
#define MAXN <队容量>
typedef struct Queue {
    elemType* data = (elemType*)malloc(sizeof(elemType) * MAXN);
    int front, rear, count;     // 定义队头、队尾和元素个数变量
}
```

1. 初始化队列

    ```C
    Queue* initQueue() {
        Queue* queue = (Queue*)malloc(sizeof(Queue));
        queue->front = 0;
        queue->rear = MAXN - 1;
        queue->count = 0;
        return queue;
    }
    ```

2. 测试队列是否为空或是否为满

    ```C
    int isEmpty(Queue* queue) {
        return (queue->count == 0);
    }
    
    int isFull(Queue* queue){
        return (queue->count == MAXN);
    }
    ```

3. 插入元素（进队）

    ```C
    void enQueue(Queue* queue, elemType item) {
        if (isFull(queue)) {
            Error("Full queue!");
        } else {
            queue->rear = (queue->rear + 1) % MAXSIZE;
            queue->data[rear] = item;
            queue->count++;     // 队未满，插入成功
        }
    }
    ```

4. 删除元素（出队）

    ```C
    elemType deQueue(Queue* queue) {
        if (isEmpty(queue)) {
            Error("Empty queue!");     // 队空，删除失败
        } else {
            elemType x = queue->data[front];
            queue->count--;     // 队非空，删除成功
            queue->front = (queue->front + 1) % MAXN;
            return x;
        }
    }
    ```

### （3）队的链式存储结构

**构造原理**：队列的链式存储结构是用一个线性链表表示一个队列，指针 $front$ 与 $rear$ 分别指向实际队头元素与实际队尾元素所在的链结点。空队的标志是：`front == NULL`。

```C
typedef struct queueNode{
    elemType data;
    struct queueNode* next;
} queueNode;

queueNode* front, *rear;
```

1. 初始化队列

    ```C
    void initQueue() {
        front = NULL;
        rear = NULL;
    }
    ```

2. 测试队列是否为空

    ```C
    int isEmpty() {
        return front == NULL;
    }
    ```

3. 插入元素（进队）

    ```C
    void enQueue(elemType item){
        queueNode* ptr = (queueNode*)malloc(sizeof(queueNode));
        ptr->item = item;
        ptr->item = NULL;
        if (front == NULL) {
            front = ptr; //插入空队的情况
        } else {
            rear->next = ptr;
        }
        rear = ptr;
    }
    ```

4. 删除元素（出队）

    ```C
    elemType deQueue() {
        if (isEmpty()) {
            Error("Empty queue!");
        } else {
            queueNode* ptr = front;
            front = front->next;
            elemType x = ptr->data;
            free(ptr);
            return x;
        }
    }
    ```

# 第四章：树与二叉树（Tree and BinaryTree）

|线性结构|树结构|
|---|---|
|第一个数据元素（无前驱）|根结点（无前驱）|
|最后一个数据元素（无后继）|叶子结点（无后继）|
|其他数据元素（一个前驱、一个后继）|树中其他结点（一个前驱、多个后继）|

## 1\.树的基本概念

## 2\.树的存储结构

## 3\.二叉树的基本概念

### （5）二叉树与树、树林之间的转换

#### ①树转化为二叉树

1. 在所有相邻的兄弟结点之间分别加一条连线；

2. 对于每一个分支结点，除了其最左孩子外，删除该结点与其他孩子结点之间的连线；

3. 以根结点为轴心，顺时针旋转45°。

#### ②树林转化为二叉树

1. 分别将树林中每一棵树转换为一棵二叉树；

2. 从最后那一棵二叉树开始，依次将后一棵二叉树的根结点作为前一棵二叉树的根结点的右孩子，直到所有二叉树都这样处理。这样得到的二叉树的根结点是树林中第一棵二叉树的根结点。

> 将森林 $F$ 转换为对应的二叉树 $T$，$F$ 中叶结点的个数等于 $T$ 中左孩子指针为空的结点个数。

#### ③二叉树还原为树（前提: 由一棵树转换而来）

1. 遍历该二叉树。对于树中的任意结点，若该结点是其父结点的**左孩子**，则沿着该左结点的右分支不断向下遍历，将该分支上的**所有右侧连续结点**（即右孩子、右孩子的右孩子等），分别与该**父结点**相连；

2. 在完成第一步的连接后，删除原二叉树中所有结点与其**右孩子**之间的连线（在原树中，这些右连线实际上代表的是兄弟关系，现已无须保留）；

3. 将第一步中新建立的连线转为标准的父子关系实线。根据还原后的结构重新排版，使具有同一个父结点的所有子结点处于同一水平层次，从而完成由二叉树向普通树的转换。

## 4\.二叉树的存储结构

## 5\.二叉树的遍历

**二叉树的遍历**：按照一定的顺序（原则）对二叉树中每一个结点都**访问一次（仅访问一次）**，得到一个由该二叉树的所有结点组成的序列。

常用的遍历方法有**前序遍历**、**中序遍历**、**后序遍历**、**按层次遍历**。

已知前序遍历序列和中序遍历序列，可以唯一确定一棵二叉树；

已知后序遍历序列和中序遍历序列，可以唯一确定一棵二叉树；

已知前序遍历序列和后序遍历序列，无法唯一确定一棵二叉树。

### （1）二叉树遍历的递归算法

#### ①前序遍历（DLR）

若被遍历的二叉树非空，则：

1. 访问根结点；

2. **以前序遍历原则**遍历根结点的左子树；

3. **以前序遍历原则**遍历根结点的右子树。

```C
void preOrder(BiTreeNode* root) {
    if (root == NULL) return;
    VISIT(root);     // 访问root结点
    preOrder(root->lchild);
    preOrder(root->rchild);
}
```

#### ②中序遍历（LDR）

若被遍历的二叉树非空，则：

1. **以中序遍历原则**遍历根结点的左子树；

2. 访问根结点；

3. **以中序遍历原则**遍历根结点的右子树。

```C
void inOrder(BiTreeNode* root) {
    if (root == NULL) return;
    inOrder(root->lchild);
    VISIT(root);     // 访问root结点
    inOrder(root->rchild);
}
```

#### ③后序遍历（LRD）

若被遍历的二叉树非空，则：

1. **以后序遍历原则**遍历根节点的左子树；

2. **以后序遍历原则**遍历根节点的左子树；

3. 访问根结点；

```C
void postOrder(BiTreeNode* root) {
    if (root == NULL) return;
    postOrder(root->lchild);
    postOrder(root->rchild);
    VISIT(root);     // 访问root结点
}
```

### （2）二叉树遍历的非递归算法

#### ①前序遍历（DLR）

#### ②中序遍历（LDR）

1. 若 $ptr$ 指向的结点非空，则将 $ptr$ 指的结点的地址进栈，然后将 $ptr$ 指向左子树的根；

2. 若 $ptr$ 指向的结点为空，则从栈中退出栈顶元素赋给 $ptr$，访问该结点，然后将 $ptr$ 指向右子树的根；

3. 重复上述过程，直到 $ptr$ 为空，并且栈也为空。

```C
void inOrderWithoutRecursion(BiTreeNode* root){
    if (root == NULL) return;
    BiTreeNode* ptr = root;     // 遍历指针
    BiTreeNode* stackNode[MAXN];
    int stackTop = 0;     // 栈顶指针
    //只要指针不为空, 或者栈内还有节点, 就继续遍历
    while (ptr != NULL || stackTop > 0) {
        if(ptr != NULL) {
            // 1.一直向左走, 并把沿途的节点压入栈中
            stackNode[stackTop++] = ptr; //push操作
            ptr = ptr->lchild;
        } else {
            // 2.当左边走到尽头(ptr == NULL), 开始弹栈并访问
            ptr = stackNode[--stackTop];     // pop操作
            VISIT(ptr);
            // 3.转向右子树(如果右子树为空, 下一轮会继续弹栈)
            ptr = ptr->rchild;
        }
    }
}
```

#### ③后序遍历（LRD）

1. 若 $ptr$ 所指结点非空，则将 $ptr$ 所指结点及不可访问的标志进栈，然后将 $ptr$ 指向其左子树的根，循环直到 $ptr$ 为空；

2. 栈顶结点的地址出栈送至 $ptr$，相应标志位出栈送至 $flag$；

3. 若 $flag$ 为不可访问标志，则将 $ptr$ 所指结点及该结点可访问标志重新进栈，移动 $ptr$ 指向其右孩子结点；否则访问 $ptr$ 所指结点，并置 $ptr$ 为空（表明以 $ptr$ 为根的子树已经访问完成）

4. 重复上述过程，直到 $ptr$ 为空并且堆栈也为空。

```C
void postOrderWithoutRecursion(BiTreeNode* root){
    BiTreeNode* ptr = root; //遍历指针
    BiTreeNode* stackNode[MAXN]; //节点栈
    int stackFlag[MAXN], stackTop = 0; //标志栈
    while(ptr || stackTop){
        while(ptr){
            stackNode[stackTop] = ptr;
            stackFlag[stackTop++] = 0;
            ptr = ptr->lchild;
        }
        ptr = stackNode[--stackTop];
        int flag = stackFlag[stackTop];
        if(!flag){
            stackNode[stackTop] = ptr;
            stackFlag[stackTop++] = 1;
            ptr = ptr->rchild;
        }else{
            VISIT(ptr);
            ptr = NULL; //以ptr为根的子树已经访问完成
        }
    }
}
```

### （3）二叉树的层次遍历

**层次遍历**：若被遍历的二叉树非空，则按照层次从上到下，每一层从左到右依次访问结点。

前序、中序、后序遍历实质上是**深度优先算法（DFS）**，层次遍历实质上是**广度优先算法（BFS）**。

```C
void layerOrder(BiTreeNode* root){
    if(root == NULL) return;
    BiTreeNode* ptr = root;
    BiTreeNode* queueNode[MAXN] = {root};
    int front = -1, rear = 0;
    while(front < rear){
        ptr = queueNode[++front];
        VISIT(ptr);
        if(ptr->lchild != NULL){
            queueNode[++rear] = ptr->lchild;
        }
        if(ptr->rchild != NULL){
            queueNode[++rear] = ptr->rchild;
        }
    }
}
```

### （4）树的遍历

```C
#define MAXD <树的度>
typedef struct TreeNode{
    elemType data;
    struct TreeNode* next[MAXD];
}TreeNode;
```

#### ①深度优先遍历算法

```C
void DFStree(TreeNode* root){
    if(root == NULL) return;
    VISIT(root);
    for(int i = 0; i < MAXD; ++i){
        if(root->next[i] != NULL){
            DFStree(root->next[i]);
        }
    }
}
```

#### ②广度优先遍历算法

```C
void BFStree(TreeNode* root){
    if(root == NULL) return;
    TreeNode* queueNode[MAXN];
    enQueue(queueNode, root);
    while(!isEmpty(queueNode)){
        TreeNode* ptr = deQueue(queueNode);
        VISIT(ptr);
        for(int i = 0; i < MAXD; ++i){
            if(ptr->next[i] != NULL){
                enQueue(queueNode, ptr->next[i]);
            }
        }
    }
}
```

## 6\.二叉查找树（Binary Search Tree）

## 7\.堆与表达式树（Heap and Expression Tree）

## 8\.哈夫曼树（Huffman Tree）

# 第六章：排序（Sort）

**排序**：将一个按值任意的数据元素序列转换为一个按值有序的数据元素序列的过程。

排序可以**提高查找的时间效率**，可以按存储器的结构分为**内排序**和**外排序**。

> **内排序：**参加排序的数据量不大，以致于能够一次将参加排序的数据全部装入内存实现排序。

> **外排序：**当参加排序的数据量很大，以致于不能够一次将参加排序的数据全部装入内存，排序过程中需要不断地通过内存与外存之间的数据交换达到排序目的。

**排序性能**：时间性能，空间性能，稳定性。

有以下七种经典的排序算法：**插入排序**，**选择排序**，**冒泡排序**，**谢尔排序**，**堆排序**，**二路归并排序**，**快速排序**。前三者属于简单排序算法，后四种属于改进排序算法。

|排序方法|平均时间情况|最好时间情况|最坏时间情况|辅助空间|稳定性|
|---|---|---|---|---|---|
|插入排序|$O(n^2)$|$O(n)$|$O(n^2)$|$O(1)$|稳定|
|选择排序|$O(n^2)$|$O(n^2)$|$O(n^2)$|$O(1)$|不稳定|
|冒泡排序|$O(n^2)$|$O(n)$|$O(n^2)$|$O(1)$|稳定|
|谢尔排序|$O(nlogn)\sim O(n^2)$|$O(n^{1.3})$|$O(n^2)$|$O(1)$|不稳定|
|堆排序|$O(nlogn)$|$O(nlogn)$|$O(nlogn)$|$O(1)$|不稳定|
|归并排序|$O(nlogn)$|$O(nlogn)$|$O(nlogn)$|$O(n)$|稳定|
|快速排序|$O(nlogn)$|$O(nlogn)$|$O(n^2)$|$O(logn)\sim O(n)$|不稳定|

接下来将对这几种排序算法进行逐一介绍，包括**核心思想**、**代码实现**、**排序性能**等方面。我们约定待排序数组为`arr[n]`，元素类型为`elemType`，期望得到元素排序顺序为**升序排列**。

我们在排序过程中会频繁涉及元素数据的交换，因此我们提前准备好数组内元素交换的函数`swap(int* i, int* j)`。或许有时候我们还想研究排序过程中元素的比较次数，引入比较计数器`cmpCount`并初始化为 $0$。

## 1\.插入排序（insertSort）

**核心思想**：第 $i$ 趟排序将序列的第 $i+1$ 个元素**插入**到一个大小为 $i$ 、且已经按值有序的子序列 $(arr_{i-1,1},arr_{i-1,2},...,arr_{i-1,i})$ 的**合适位置**，从而得到一个大小为 $i+1$ 、且仍然按值有序的子序列 $(arr_{i,1},arr_{i,2},...,arr_{i,i+1})$。

$arr_{i,j}$ 表示第 $i$ 趟排序结束时序列的第 $j$ 个元素 $(1\leq i\leq n-1,1\leq j\leq n)$

```C
void insertSort(elemType arr[], int n){
    for(int i = 1; i < n; ++i){
        //一共会进行n-1趟排序
        elemType temp = arr[i]; //待插入的元素
        int j = 0;
        for(j = i - 1; j >= 0; --j){
            //cmpCount++;
            if(arr[j] < temp){
                break; //成功找到合适的位置
            }
            arr[j+1] = arr[j]; //已排序序列后半部分元素后移
        }
        arr[j+1] = temp; //插入合适的位置
    }
}
```

插入排序是**稳定排序**，时间复杂度为 $O(n^2)$，空间复杂度为 $O(1)$。

可以对插入排序进行一点点优化，对于前半部分的有序序列，可以采取**折半查找**来更快找到待插入元素应当插入的正确位置，时间复杂度降低至$O(nlogn)$。

```C
void insertSort(elemType arr[], int n){
    for(int i = 1; i < n; ++i){
        elemType temp = arr[i], low = 0, high = i - 1;
        while(low <= high){
            int mid = low + (high - low) / 2;
            if(temp < arr[mid]){
                high = mid - 1;
            }else{
                low = mid + 1;
            }
        }
        for(int j = i - 1; j >= low; j--){
            arr[j+1] = arr[j];
        }
        arr[low] = temp;
    }
}
```

## 2\.选择排序（selectSort）

**核心思想**：第 $i$ 趟排序从序列的后 $n-i+1$ 个元素中**选择**一个值最小的元素，将其置于该 $n-i+1$ 个元素的最前面。

```C
void selectSort(elemType arr[], int n){
    for(int i = 0; i < n - 1; ++i){
        //一共会进行n-1趟排序
        int minPos = i;
        for(int j = i + 1; j < n; ++j){
            //cmpCount++; //与原始序列状态无关
            if(arr[j] < arr[minPos]){
                //寻找值最小的元素，定位其在数组中的位置
                minPos = j;
            }
        }
        swap(arr, i, minPos); //值最小的元素移到第i个
    }
}
```

选择排序是**不稳定排序**，时间复杂度为 $O(n^2)$，空间复杂度为 $O(1)$。

## 3\.冒泡排序（bubbleSort）

**核心思想**：第 $i$ 趟排序对序列的前 $n-i+1$ 个元素从第一个元素开始依次作如下操作：相邻的两个元素比较大小，若前者的值大于后者，则两元素交换位置，否则不交换位置。最终的效果是：该 $n-i+1$ 个元素中最大值元素移到该 $n-i+1$ 个元素的最后。

> 值较大的元素往后“沉”，值较小的元素向前”浮“。

```C
void bubbleSort(elemType arr[], int n){
    int flag = 1;
    for(int i = n - 1; i > 0 && flag == 1; --i){
        //最好情况1趟排序，最坏情况n-1趟排序
        flag = 0; //0意味着前n-i+1个元素已经有序了,不需要冒泡了
        for(int j = 0; j < i; ++j){
            //cmpCount++;
            if(arr[j] > arr[j+1]){
                //元素位置不合适, 需要交换(冒泡)
                swap(arr + j, arr + j + 1);
                flag = 1;
            }
        }
    }
}
```

冒泡排序是**稳定排序**，时间复杂度为 $O(n^2)$，空间复杂度为 $O(1)$。

## 4\.谢尔排序（shellSort）

**核心思想**：首先确定一个元素的间隔数 $gap$。将参加排序的元素按照 $gap$ 分隔成若干个子序列（即分别把那些位置相隔为 $gap$ 的元素看作一个子序列），然后对各个子序列进行排序（自选一种排序方式）；此后减小 $gap$ 值，重复上述过程，直到 $gap<1$。因此这种排序算法又称作**缩小增量排序法**。

```C
void shellSort(elemType arr[], int n){
    int gap = n;
    while(gap > 1){
        gap /= 2;
        //使用插入排序实现子序列排序
        for(int i = gap; i < n; ++i){
            int j, temp = arr[i];
            for(j = i; j >= gap; j -=gap){
                if(arr[j-gap] <= temp) break;
                arr[j] = arr[j-gap];
            }
            arr[j] = temp;
        }
    }
}
```

谢尔排序是**不稳定排序**，时间复杂度为 $O(nlogn)\sim O(n^2)$，空间复杂度为 $O(1)$。

## 5\.堆排序（heapSort）

**堆的定义**：对于含有 $n$ 个元素的序列 $\{arr_1,arr_2,...arr_n\}$，当且仅当其满足条件\(1\)或条件\(2\)时，称该序列为一个**堆积（heap）**，简称**堆**。

条件\(1\)：$arr_i\ge arr_{2i}$ 且 $arr_i\ge arr_{2i+1}$，大顶堆。

条件\(2\)：$arr_i\le arr_{2i}$ 且 $arr_i\le arr_{2i+1}$，小顶堆。

堆是一棵完全二叉树，二叉树中任何一个分支结点的值都大于或者等于它的孩子结点的值，并且每一棵子树也满足堆的特性。（考虑大顶堆）

> 序列的第一个元素（即二叉树的根节点）的值是最大的！

**核心思想**：第 $i$ 趟排序将序列的前 $n-i+1$ 个元素组成的子序列转换为一个堆积，然后将堆的第一个元素与堆的最后那个元素交换位置。

1. 将原始序列转化为第一个堆（建立初始堆）；

2. 将堆的第一个元素与堆最后的元素交换位置（即“去掉”最大值元素）；

3. 将“去掉”最大值元素后剩下的元素组成的子序列重新转换一个新的堆；

4. 重复上述过程的第2至第3步 $n-1$ 次。

```C
void heapSort(elemType arr[], int n){
    for(int i = n / 2 - 1; i >= 0; --i){
        adjust(arr, i, n); //建立初始堆
    }
    for(int i = n - 1; i >= 1; --i){
        swap(arr + 0, arr + i);
        adjust(arr, 0, i);
    }
}

//向下调整节点i的位置, 使其成为一个堆
void adjust(elemType arr[], int i, int n){
    elemType temp = arr[i]; //保存arr[i]的原始值, 等待最终放置
    int j = 2 * i + 1; //当前检查的子节点下标，初始为i的左孩子2*i+1
    while(j < n){
        if(j + 1 < n && arr[j] < arr[j+1]){
            ++j; //如果右孩子存在且更大, j改为指向右孩子
        }
        if(temp < arr[j]){
            arr[(j-1)>>1] = arr[j]; //从孩子下标反推父节点下标
            j = 2 * j + 1; //"洞"下沉到该孩子的位置, j指向新洞左孩子
        }else break; //temp ≥ 两个孩子, 找到正确位置, 终止
    }
    arr[(j-1)>>1] = temp;
}
```

堆排序是**不稳定排序**，时间复杂度为 $O(nlogn)$，空间复杂度为 $O(1)$。

## 6\.二路归并排序（mergeSort）

**核心思想**：将两个各自按值有序的子序列合并为一个按值有序的子序列的过程称为**二路归并**；该算法的第 $i$ 趟排序将序列的 $[\frac{n}{2^{i-1}}]$ 个长度为 $2^{i-1}$ 的按值有序的子序列依次两两合并为 $[\frac{n}{2^i}]$ 个长度为 $2^i$ 的按值有序的子序列。

```C
void mergeSort(elemType arr[], int n){
    elemType* temp = (elemType*)malloc(n * sizeof(elemType));
    if(temp != NULL){
        mSort(arr, temp, 0, n - 1);
        free(temp);
    }else{
        Error("No Space For Temp Array!\n");
    }
}

void mSort(elemType* arr, elemType* tmp, int left, int right){
    if(left < right){
        int mid = left + ((right - left) >> 1);
        mSort(arr, tmp, left, mid);
        mSort(arr, tmp, mid + 1, right);
        merge(arr, tmp, left, mid, right);
    }
}

void merge(elemType* arr, elemType* tmp, int left, int leftEnd, int right){
    int i = left, j = leftEnd + 1, q = left;
    while(i <= leftEnd && j <= right){
        if(arr[i] <= arr[j]){
            tmp[q++] = arr[i++];
        }else{
            tmp[q++] = arr[j++];
        }
    }
    while(i <= leftEnd){
        tmp[q++] = arr[i++];
    }
    while(j <= rightEnd){
        tmp[q++] = arr[j++];
    }
    for(int i = left; i <= right; ++i){
        arr[i] = tmp[i];
    }
}
```

归并排序是**稳定排序**，时间复杂度为 $O(nlogn)$，空间复杂度为 $O(1)$。

## 7\.快速排序（quickSort）

**核心思想**：从当前参加排序的元素中任选一个元素（通常称为分界元素 $pivot$）与当前参加排序的那些元素进行比较，凡是小于分界元素的元素都移到分界元素的前面，凡是大于分界元的元素都移到分界元素的后面，分界元素将当前参加排序的元素分成前后两部分，而分界元素处在排序的最终位置。然后，分别对这两部分中大小大于1的部分重复上述过程，直到排序结束。

# 第七章：图（Graph）

## 1\.图的基本概念

**图**：由**顶点的非空有穷集合**与**顶点之间关系（边或弧）的集合**构成的结构。

**图的表示**：$G=(V,E)$；$V$ 为顶点集合，$E$ 为关系（边或弧）的集合。

**顶点（Vertex）**表示一个数据元素；**边（弧，Edge）**表示数据元素（顶点）之间的关系，用   表示（有序数据对）。

**图**可以分为**无向图**、**有向图**、**网（络）**。

**顶点的度 **$TD(v_i)$ $=$ 出度 $OD(v_i)$ $+$ 入度 $ID(v_i)$。

**顶点的联通**：顶点 $v_i$ 到 $v_j$ 有路径，并且顶点 $v_j$ 到 $v_i$ 也有路径。

**图的连通**：图中任意两个顶点都连通。

## 2\.图的存储结构

对于一个图，需要存储的信息应该包括：

\(1\) 所有顶点的数据信息（**Vertex**）

\(2\) 顶点之间关系（边或弧）的信息 （**Edge**）

\(3\) 权的信息（对于网络）（**Weight**）

### （1）邻接矩阵存储

**核心思想**：采用**两个数组**存储一个图。

一个一维数组：`Vertex[0 ~ n-1]` 存放图中**所有顶点**的信息。

一个二维数组：`A[0 ~ n-1, 0 ~ n-1]` 存放图中**所有顶点之间关系**的信息。

> 对于不带权的图，`A[i][j]`$\in \{0,1\}$。$1$ 表示顶点 $v_i$ 到顶点 $v_j$ 有边，$0$ 表示顶点 $v_i$ 到顶点 $v_j$ 无边。

> 对于带权的图（网络），`A[i][j]` $=w_{ij}$。若顶点 $v_i$ 到顶点 $v_j$ 有边，$w_{ij}$ 即为这条边的权；若顶点 $v_i$ 到顶点 $v_j$ 无边，$w_{ij}=\infty$ \(权值不存在\)。

空间复杂度为 $O(n^2)$。

```C
#define MAXN <最大顶点个数>

typedef struct Edge{
    int weight; //定义边的类型
}Edge;

elemType Vertex[MAXN]; //顶点信息数组
Edge Graph[MAXN][MAXN]; //邻接矩阵
```

```C
#define MaxV <最大顶点个数>
#define MaxE <最大边数>

typedef struct Edge{
    int v1, v2;
    int weight;
}Edge; //定义边的类型

elemType Vertex[MaxV]; //顶点信息数组
Edge Graph[MaxE]; //边集数组
```

**邻接矩阵的存储特点**：

\(1\) 无向图的邻接矩阵一定是一个对称矩阵；

\(2\) 不带权的有向图的邻接矩阵一般是稀疏矩阵；

\(3\) 无向图邻接矩阵的第 $i$ 行\(或第 $i$ 列\)非 $0$ 或非 $\infty$ 元素的个数为第 $i$ 个顶点的度数；

\(4\) 有向图邻接矩阵的第 $i$ 行非 $0$ 或非 $\infty$ 元素的个数为第i 个顶点的出度；第 $i$ 列非 $0$ 或非 $\infty$ 元素的个数为第 $i$ 个顶点的入度。

### （2）邻接表存储

**核心思想**：建立 $n$ 个线性链表存储该图。

1. 每一个链表前面设置一个头结点,用来存放一个顶点的数据信息,称之为**顶点结点**。其中，$vertex$ 域存放顶点的数据信息；$link$ 域存放链表中第一个结点的地址；$n$ 个头结点之间为一数组结构。

|$vertex[i]$|$link$|
|---|---|

2. 第 $i$ 个链表中的每一个链结点（称之为**边节点**）表示以第 $i$ 个顶点为**出发点**的一条边；其中，$next$ 域为指针域；$weight$ 域为权值域（若图不带权,则无此域）；$adjvex$ 域存放以第 $i$ 个顶点为出发点的一条边的另一端点在头结点数组中位置。

|$adjvex$|$weight$|$next\to$|
|---|---|---|

2. 逆邻接表：第 $i$ 个链表中的每一个链结点（称之为**边节点**）表示以第 $i$ 个顶点为**终止点**的一条边。

```C
#define MAXN <最大顶点个数>

typedef struct Edge{
    int adjvex; //邻接顶点编号
    int weight; //该边的权
    struct Edge* next; 
}Elink; //定义边节点类型

typedef struct Vlink{
    elemType vertex;
    Elink* link;
}Vlink; //定义顶点节点类型

Vlink Graph[MAXN];
```

**邻接表存储的特点**：

\(1\) 无向图的第 $i$ 个链表中边结点个数是第 $i$ 个顶点度数

\(2\) 有向图的第 $i$ 个链表中边结点个数是第 $i$ 个顶点的出度

\(3\) 无向图的边结点个数一定为偶数；边结点个数为奇数的图一定是有向图

## 3\.图的遍历

**图的遍历**：以无向图为例，从图中某个指定的顶点出发, 按照某一原则对图中所有顶点都访问一次且只访问一次，得到一个由图中所有顶点组成的序列。

### （1）深度优先遍历（Depth First Search，DFS\)

**核心思想**：从图中某个指定的顶点 $v$ 出发，先访问顶点 $v$，然后从顶点 $v$ 未被访问过的一个邻接点出发，继续进行深度优先遍历，直到图中与 $v$ 相通的所有顶点都被访问（完成了一个连通分量的遍历）；若此时图中还有未被访问过的顶点,，则从另一个未被访问过的顶点出发重复上述过程，直到遍历全图。

> 类似于二叉树的前序遍历。

为了标记某一时刻图中哪些顶点是否被访问（从而确保顶点不被重复访问），定义了一维数组`visited[0 ~ n-1]`$\in \{0,1\}$，$1$ 表示对应的顶点已被访问，$0$ 表示对应的顶点未被访问。

```C
int visited[MAXN] = {0};
void DFS(Vlink Graph[], int v){
    VISIT(Graph, v); //访问当前顶点
    visited[v] = 1; //表示当前顶点已被访问过
    for(Elink* p = Graph[v].link; p != NULL; p = p->next){
        if(!visited[p->adjvex]){
            DFS(Graph, p->adjvex);
        }
    }
}
void travelDFS(Vlink Graph[], int n){
    memset(visited, 0, sizeof(visited));
    for(int i = 0; i < n; ++i){
        if(!visited[i]){
            DFS(Graph, i);
        }
    }
}
```

如果图中具有 $n$ 个顶点、$e$ 条边，则：

若采用邻接表，由于邻接表中有 $2e$ 个或 $e$ 个边节点，因而扫描边节点的时间为 $O(e)$；所有顶点都递归访问一次，故算法的时间复杂度为 $O(n+e)$。

若采用邻接矩阵，则查找每一个顶点所依附的所有边的时间复杂度为 $O(n)$，因而算法的时间复杂度为 $O(n^2)$。

### （2）广度优先遍历（Breadth First Search，BFS）

**核心思想**：从图中某个指定的顶点 $v$ 出发，先访问顶点 $v$，然后依次访问顶点 $v$ 的各个未被访问过的邻接点，然后又从这些邻接点出发, 按照同样的规则访问它们的那些未被访问过的邻接点，如此下去，直到图中与 $v$ 相通的所有顶点都被访问（完成一个连通分量的遍历）；若此时图中还有未被访问过的顶点，则从另一个未被访问过的顶点出发重复上述过程，直到遍历全图。

> 类似于树的按层次遍历。

```C
int visited[MAXN] = {0};
void BFS(Vlink Graph[], int v){
    Elink* p = NULL;
    VISIT(Graph, v); //访问当前顶点
    visited[v] = 1; //标识当前顶点已被访问
    enQueue(Queue, v); //让当前被访问的定点进入队列
    while(!emptyQ(Queue)){
        v = deQueue(Queue); //取出队头元素
        p = Graph[v].link; //获取该顶点的第一个邻接顶点
        for(; p != NULL; p = p->next){
            //访问该顶点下的每一个邻接顶点
            if(!visited[p->adjvex]){
                VISIT(Graph, p->adjvex); //访问当前顶点
                visited[p->adjvex] = 1; //标识当前顶点已被访问
                enQueue(Queue, p->adjvex);
            }
        }
    }
}
void travelBFS(Vlink Graph[], int n){
    memset(visited, 0, sizeof(visited));
    for(int i = 0; i < n; ++i){
        if(!visited[i]){
            BFS(Graph, i);
        }
    }
}
```

对于DFS与BFS这两个**图的遍历**算法，他们在时间复杂度上是一样的，不同之处仅仅在于对顶点的访问顺序不同。具体用哪个取决于具体题目的需求：通常DFS更适合目标比较明确，以找目标为主要目的的情况；BFS更适合在不断扩大遍历范围时找到相对最优解的情况。

## 4\.最小生成树（Minimum Spanning Tree）

**生成树**：包含连通图的**全部 **$n$** 个顶点**，**仅包含其 **$n-1$** 条边**的极小连通子图。

如果包含 $n$ 个顶点的图中只有少于 $n-1$ 条边，图将不连通；如果包含 $n$ 个顶点的图中有多于 $n-1$ 条边，图将有环（回路）；如果包含 $n$ 个顶点的连通图中恰好有 $n-1$ 条边，该图将无回路且已经是一棵树了。

一般情况下，生成树不唯一。因此我们需要研究**最小生成树**。

**最小生成树**：带权连通图中，**总权值之和最小**的带权生成树为最小生成树。

> 构造最小生成树的原则：

> \(1\) 只能利用图中的边来构造最小生成树

> \(2\) 只能使用图中的 $n-1$ 条边来连接图中的 $n$ 个顶点

> \(3\) 不能使用图中产生回路的边

### （1）求最小生成树：普里姆算法（Prim）

**核心思想**：设 $G=(V, GE)$ 为具有 $n$ 个顶点的带权连通图，$T=(U,TE)$ 为最小生成树；初始 $TE=\varnothing$，$U=\{v\}$，$v\in V$。依次在 $G$ 中选择一条**一个顶点仅在 **$V$** 中、另一个顶点在 **$U$** 中，并且权值最小**的边加入集合 $TE$，同时将**该边仅在 **$V$** 中的那个顶点**加入集合 $U$；重复上述过程 $n–1$ 次，使 $U=V$，此时 $T$ 为 $G$ 的最小生成树。

```C
#define MAXN <最大顶点个数>
#define INFTY <一个不存在的权值>

int src; //最小生成树的第一个顶点
int weights[MAXN][MAXN]; //图G中某条边<i, j>的权值
int edges[MAXN]; //存入生成的最小生成树的边(应有n-1条边)
//<i, edges[i]>表示最小生成树的一条边
int minWeight[MAXN]; //"未确定生成树顶点->已确定生成树顶点"的边权重
//minWeight[i] = 0 means 其已确定为最小生成树顶点

int Prim(int weights[][MAXN], int n, int src, int edges[]){
    int totalWeight = 0; //计算最小生成树总权值
    for(int i = 0; i < n; ++i){
        minWeight[i] = weights[src][i]; //含src的边的权值
        edges[i] = src; //初始化第一个顶点为src
    }
    minWeight[src] = 0; //将第一个顶点src加入生成树
    for(int i = 1; i < n; ++i){
        int min = INFTY;
        int k = 0; //后续当作标记值使用,表示已确定生成树顶点
        for(int j = 0; j < n; ++j){
            //在minWeight[]中找到最小值，记其下标为k
            if(minWeight[j] && minWeight[j] < min){
                min = minWeight[j];
                k = j;
            }
        }
        if(min != INFTY){
            totalWeight += min; //总权值累加，防止图不连通
        }
        minWeight[k] = 0; //找到最小生成树的一个顶点
        for(int j = 0; j < n; ++j){
            //新一轮初始化,准备寻找下一个进入集合U的顶点
            if(minWeight[j] && weights[k][j] < minWeight[j]){
                //将小于当前权值的边<k, j>权值加入数组中
                minWeight[j] = weights[k][j];
                edges[j] = k; //将边<j, k>信息存入生成树边数组
            }
        }
    }
    return totalWeight; //返回最小生成树的总权值
}
```

### （2）求最小生成树：克鲁斯卡尔算法（Kruskal）

**核心思想**：设 $G=(V, GE)$ 为具有 $n$ 个顶点的带权连通图，$T=(U,TE)$ 为最小生成树；初始 $TE=\varnothing$，$U=V$。从 $G$ 中选择一条**当前未选择过的、且边上的权值最小**的边加入 $TE$，若使得 $T$ **未产生回路，则本次选择有效**；若使得 $T$ **产生回路，则本次选择无效，放弃本次选择的边**。重复上述选择过程直到 $TE$ 中包含了 $G$ 的 $n-1$ 条边，此时的 $T$ 为 $G$ 的最小生成树。

```C
#define MaxV <最大顶点个数>
#define MaxE <最大边数>

typedef struct{
    int v1, v2; //边的两个端点
    int weight; //边的权值
}Edge;

Edge edges[MaxE]; //存储图中所有的边
Edge mstEdges[MaxV]; //存入生成的最小生成树的边 (最终应有 n-1 条边)
int parent[MaxV]; //并查集数组，用于判断顶点是否在同一个连通分量(是否成环)

int compareEdges(const void* a, const void* b){
    //用于给原有边权值排序的cmp函数
    Edge* edge1 = (Edge*)a;
    Edge* edge2 = (Edge*)b;
    return edge1->weight - edge2->weight; 
}

// ================== 并查集 (Disjoint Set) 操作 ==================
//查找顶点所在集合的"根节点" (带有路径压缩优化,速度极快,趋近O(1))
int find(int i){
    if (parent[i] == i){
        return i;
    }
    //递归查找,顺便把沿途的节点直接挂到根节点上(路径压缩)
    return parent[i] = find(parent[i]); 
}
//合并两个顶点所在的集合
void unionSet(int i, int j){
    int root_i = find(i);
    int root_j = find(j);
    if(root_i != root_j){
        parent[root_i] = root_j; // 将一个集合的根指向另一个集合的根
    }
}

// ================== Kruskal 核心算法 ==================
int Kruskal(int n, int e){
    //参数n:顶点数, e:图中的总边数
    int totalWeight = 0; //计算最小生成树总权值
    int mstCount = 0;  // 记录已经加入最小生成树的边数
    for(int i = 0; i < n; ++i){
        parent[i] = i; //初始化并查集：一开始每个顶点各自为一个独立的集合
    }
    qsort(edges, e, sizeof(Edge), compareEdges); //对所有的e条边进行排序
    for(int i = 0; i < e; ++i){
        //按顺序挑选边，利用并查集判环
        int v1 = edges[i].v1;
        int v2 = edges[i].v2;
        int weight = edges[i].weight;
        //判断这条边的两个端点v1和v2是否已经连通(即是否属于同一个集合)
        //如果 find(v1) == find(v2),说明加入这条边会形成环，必须舍弃！
        if(find(v1) != find(v2)){
            //不构成环,将这条边正式加入最小生成树
            mstEdges[mstCount++] = edges[i];
            totalWeight += weight;
            unionSet(v1, v2); //将v1和v2连通(合并它们所在的集合)
            //优化:一旦收集到了 n-1 条边,最小生成树就已经完成了,直接跳出循环
            if(mstCount == n - 1){
                break;
            }
        }
    }
    return totalWeight;
}
```

### （3）关于最小生成树的一些特点

任意连通图中，假设没有相同权值的边存在，则权值最小的边**一定是**其最小生成树中的边；任意连通图中，假设没有相同权值的边存在，则与同一顶点相连的权值最小的边**一定是**其最小生成树中的边；任意连通图中，假设没有相同权值的边存在，则权值最大的边**不一定不是**其最小生成树中的边。

对比两个算法，$Kruskal$ 算法是针对边展开，边数少时效率会非常高，所以对稀疏图有很大的优势；$Prim$ 算法对于稠密图，即边数非常多的情况会好一些。

## 5\.最短路径问题（Shortest Path）

**路径长度**：对于不带权的图，即为路径上所经过的边的数目；对于带权的图，即为路径上所经过的边的权值之和。

### 单源最短路径的迪杰斯特拉算法（Dijkstra）

1. 基本思想

1. \(1\) 设 $G=(V,E)$ 是一个带权有/无向图, 把图中顶点集合 $V$ 分成两组：

    - 第一组为**已求出最短路径的顶点集合**（用 $S$ 表示，初始时 $S$ 中只有一个源，以后每求得一条最短路径 $v,…v_k$，就将 $v_k$ 加入到集合 $S$ 中，直到全部顶点都加入到 $S$ 中）。

    - 第二组为**其余未确定最短路径的顶点集合**（用 $U$ 表示）。

1. \(2\) 按**最短路径长度的递增次序**依次把第二组的顶点加入 $S$ 中。在加入的过程中，总保持从源点 $v$ 到 $S$ 中各顶点的最短路径长度**不大于**从源点 $v$ 到 $U$ 中任何顶点的最短路径长度。每个顶点对应一个距离：

    $S$ 中顶点的距离：从 $v$ 到此顶点的最短路径长度。

    $U$ 中顶点的距离：从 $v$ 到此顶点只包括以 $S$ 中的顶点为中间顶点的当前最短路径长度。

2. 图的存储

2. 采用邻接矩阵`Weights[0 ~ n-1][0 ~ n-1]`

    - `Weights[i][j]` $=W_{ij}$，当顶点 $v_i$ 到顶点 $v_j$ 有边，且权为 $W_{ij}$；

    - `Weights[i][j]` $=W_{ij}$，当顶点 $v_i$ 到顶点 $v_j$ 有边；

    - `Weights[i][j]` $=W_{ij}$，当 $v_i=v_j$。

3. 从源点到当前各顶点的最短路径长度的存储

3. 用数组`Sweight[0 ~ n-1]`表示，`Sweight[k] = min{<源点到顶点k的弧上的权值>, <源点到S中其它顶点的路径长度> + <S中其它顶点到顶点k的弧上的权值>}`。初始时`Sweight[]`的值为顶点 $v$ 对应的边值信息。

4. 标识当前已找到最短路径的顶点

4. 用数组`wfound[0 ~ n-1]`表示，则有`wfound[k]`：

    - `wfound[k] = 1` means 已经找到最短路径；

    - `wfound[k] = 0` means 尚未找到最短路径。

5. 记录各顶点最短路径所经过的顶点序列

5. 用数组`Spath[0 ~ n-1]`表示，`Spath[k]`保存从源点到顶点 $v_i$ 当前最短路径中的**前一个顶点**的编号。

5. 初始状态下，若源点 $v$ 到 $v_k$ 有边，`Spath[k] = {v}`；若源点 $v$ 到 $v_k$ 无边，`Spath[k] = -1`。

6. 整体算法描述

6. Step1\. 确定`Sweight[]`、`wfound[]`、`Spath[]` 三个数组的初值。

6. Step2\. 利用`wfound[]`与`Sweight[]` 在那些尚未找到最短路径的顶点中确定一个与源点 $v$ 最近的顶点 $u$，并置`wfound[u]`为 $1$。

6. Step3\. 根据顶点 $u$ 修改源点到所有尚未找到最短路径的顶点的路径长度，并修改相应`Spath[]`值。

6. Step4\. 重复上述过程的第2至第3步 $n–1$ 次。

```C
#define MAXN <最大顶点个数>
#define INFTY <一个不存在的权值>

int Sweight[MAXN] = {0};
int wfound[MAXN] = {0};
int Spath[MAXN] = {0};


void Dijkstra(int v0, int n){
    for(int i = 0; i < n; ++i){
        //三个数组的初始化
        Sweight[i] = Weights[v0][i];
        wfound[i] = 0;
        Spath[i] = (Weights[v0][i] < INFTY && i != v0) ? v0 : -1;
    }
    Sweight[v0] = 0;
    wfound[v0] = 1;
    for(int i = 0; i < n - 1; ++i){
        //n-1次循环来处理剩余的n-1个顶点
        int minWeight = INFTY;
        int k = -1; //标记尚未找到最短路径的顶点中与源点v0最近的顶点
        for(int j = 0; j < n; ++j){
            //找到未标记的最小权重值顶点k
            if(!wfound[j] && Sweight[j] < minWeight){
                k = j;
                minWeight = Sweight[k];
            }
        }
        if(k == -1){
            break; //剩下的顶点都不可达(图不连通),提前退出
        }
        //每次循环会产生一个k,利用这个k来更新Sweight
        wfound[k] = 1; //标记该顶点为已找到最短路径的顶点
        for(int j = 0; j < n; ++j){
            if(!wfound[j] && (minWeight + Weights[k][j] < Sweight[j])){
                //找到未标记顶点且权值大于(k权值 + <k, j>权值),更新权值
                Sweight[j] = minWeight + Weights[k][j];
                Spath[j] = k; //记录前驱顶点
            }
        }
    }
}
```

对于给定的带权连通无向图，从某源点到图中各顶点的最短路径构成的生成树**可能**与该图的最小生成树相同，不过这与源点的选择有很大的关系。$Dijkstra$ 算法是存在**局限性**的，针对**权值含负数**的图可能会发生错误（而且通过同时加某一个正数来Reweighting也不能很好地解决问题）。

