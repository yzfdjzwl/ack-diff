# ack-diff

## 原理

要对比树之间的diff，传统的diff算法，所需要的时间复杂度是：n的3方。而React diff算法的时间复杂度是O(n), 它建立在三个策略的基础上:
1. Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。
2. 拥有相同类的组件会生成类似的树形结构，拥有不同类的组件会生成不同的树形结构。
3. 对于同一层级的一组子节点，可以用id去唯一区分。

在ack-diff中，没有考虑第3个策略。在前两个策略中的实现中，ack-diff会有四种规则:
1. newNode不存在，表示删除，规则为 ***DELETE***
2. oldNode与newNode都是文本节点，表示内容修改，规则为 ***TEXT***
3. oldNode与newNode的节点类型一样
    * 比较属性，生成diff，规则为 ***ATTRS***
    * 比较子节点
4. oldNode与newNode的节点类型不一样，表示节点被替换，规则为 ***REPLACE***

## 实现

React diff算法主要分为3个步骤:
1. Virtual DOM的生成
2. 比对Virtual DOM, 生成patches
3. 根据生成的patches与Virtual DOM融合，生成新的Virtual DOM

在ack-diff中，也根据这3个步骤来实现：
1. 生成Virtual DOM, 在`element.js`实现
2. 对比Virtual DOM, 在`diff.js`实现
3. 将diff合成到oldNode生成newNode, 在`patch.js`里实现