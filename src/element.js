class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

function createElement(type, props, children) {
    return new Element(type, props, children);
}

function isElement(el) {
    return el instanceof Element;
}

function isString(type) {
    return typeof type === 'string';
}

function isArray(children) {
    return Array.isArray(children);
}

function setAttrs(props, node) {
    for (let key in props) {
        node.setAttribute(key, props[key]);
    }
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
}

export {
    Element,
    createElement,
    renderDOM,
};
