
import {
    REMOVE,
    TEXT,
    ATTRS,
    REPLACE,
    isElement,
} from './util';
import { render } from './element';

function patch(root, patches) {
    let walk = {
        index: 0,
    };

    dfs(root, patches, walk);
}

function dfs(node, patches, walk) {
    const current = patches[walk.index];
    const childNodes = node.childNodes;

    walk.index = walk.index + 1;

    childNodes.forEach(child => dfs(child, patches, walk));

    if (current) {
        doPatch(node, current);
    }
}

function doPatch(node, patches) {
    patches.forEach((patch, index) => {
        const type = patch.type;

        switch(type){
            case TEXT:
                node.textContent = patch.newNode;
                break;
            case REMOVE:
                node.parentNode.removeChild(node);
                break;
            case ATTRS:
                const attrs = patch.attrs;
                for (let key in attrs) {
                    const value = attrs[key];
                    if (value) {
                        node.setAttribute(key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case REPLACE:
                const newNode = patch.newNode;
                node = node.parentNode.replaceChild(isElement(newNode) ? render(newNode) : newNode, node);
                break;
        }
    });

}

export default patch;

