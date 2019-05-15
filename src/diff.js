import {
    REMOVE,
    TEXT,
    ATTRS,
    REPLACE,
    isString,
} from './util'


/**
 * 在对比的时候，如果某个节点被replace了
 *
 *
 */
function diff(oldTree, newTree) {
    let index = 0;
    const patches = {};

    walk(oldTree, newTree, index, patches);

    return patches;
}

function diffAttr(oldAttrs, newAttrs) {
    const patches = {};

    // 修改了的attr
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patches[key] = newAttrs[key];
        }
    }

    // 新增的attr
    for (let key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            patches[key] = newAttrs[key];
        }
    }

    return patches;
}


function diffChildren(oldChildren, newChildren, index, patches) {
    // TODO: 考虑oldChildren和newChildren谁更长

    let leftNode = null;

    // root时，currentNodeIndex为0
    let currentNodeIndex = index;

    /*
     *
     *        0*
     *      1*   4*
     *    2* 3*  5* 6*
     * 
     * 当遍历1结束后，要遍历到4时，此时的index = currentNodeIndex(1) + 1的count(2) + 1 = 4;
     * 统计count，是为了处理子节点被REPLACE后(子节点下有更多子节点), 往后遍历时，index已经不正确了，因此需要一个count来计数
     * 
     */
    oldChildren.forEach((child, index) => {
        let newChild = newChildren[index];

        if (leftNode && leftNode.count) {
            currentNodeIndex = currentNodeIndex + leftNode.count + 1;
        } else {
            currentNodeIndex = currentNodeIndex + 1;
        }

        walk(child, newChild, currentNodeIndex, patches);
        leftNode = child;
    });
}

function walk(oldNode, newNode, index, patches) {
    const current = [];

    // 如果新的没有节点，表示删除
    if (!newNode) {
        current.push({ type: REMOVE, index });
    // 如果是文本
    } else if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) {
            current.push({ type: TEXT, newNode });
        }
    // 如果节点type没变
    } else if (oldNode.type === newNode.type) {

        const attrs = diffAttr(oldNode.props, newNode.props);

        if (Object.keys(attrs).length > 0) {
            current.push({ type: ATTRS, attrs });
        }

        diffChildren(oldNode.children, newNode.children, index, patches);
    } else {
        current.push({ type: REPLACE, newNode });
    }

    // TODO: 如果有newNode, 没有oldNode


    if (current.length > 0) {
        patches[index] = current;
    }
}

export default diff;
