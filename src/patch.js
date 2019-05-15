function patch(root, patches) {
    walk(root);
}

function walk(node) {
    const childNodes = node.childNodes;

    // 深度先序
    childNodes.forEach(child => walk(child));
}

export default patch;

