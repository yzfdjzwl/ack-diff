import {
    isElement,
    isArray,
    setAttrs,
} from './util'

class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;

        // 计算每个节点下面有多少个子孙节点
        // 这个count为后面遍历children做准备
        let count = 0;

        if (isArray(children)) {
            children.forEach((child, index) => {
                // 如果是Element类型，则加上其count
                if (isElement(child)) {
                    count += child.count;
                }
                // 每一个child是一个count
                count++;
            });
        }
        this.count = count;
    }
}

function createElement(type, props, children) {
    return new Element(type, props, children);
}

function render(virtualDOM) {
    const nodeType = virtualDOM.type;
    const props = virtualDOM.props;
    const children = virtualDOM.children;
    let node;

    node = document.createElement(nodeType);
    setAttrs(props, node);

    if (isArray(children)) {
        children.forEach(child => {
            let newNode;
            if (isElement(child)) {
                newNode = render(child);
            } else {
                newNode = document.createTextNode(child);
            }
            node.appendChild(newNode);
        });
    }

    return node;
}

function renderDOM(virtualDOM, target) {
    const dom = render(virtualDOM);

    target.appendChild(dom);

    return dom;
}

export {
    Element,
    createElement,
    renderDOM,
    render,
};
