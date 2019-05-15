import { Element } from './element';

const REMOVE = 'REMOVE';
const TEXT = 'TEXT';
const ATTRS = 'ATTRS';
const REPLACE = 'REPLACE'

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

export {
    REMOVE,
    TEXT,
    ATTRS,
    REPLACE,
    isElement,
    isString,
    isArray,
    setAttrs,
};