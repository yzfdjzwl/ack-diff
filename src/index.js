import {
    // createElement,
    createElement as el,
    renderDOM,
} from './element';
import diff from './diff.js';
import patch from './patch';

// 构建虚拟DOM
const v1 = el( 'div', { 'data-id': 1, 'style': 'corlor: red;' }, [
    el('div', { 'style': 'color: red;' }, [
        el('div', { 'style': 'color: red;' }, ['文字00000']),
        el('div', { 'style': 'color: red;' }, ['文字11111']),
    ]),
    el('p', { 'style': 'color: red;' }, ['文字1v1']),
    el('p', { 'style': 'color: red;' }, ['文字2v1']),
    el('p', { 'style': 'color: red;' }, ['文字3v1']),
    el('ul', { 'style': 'color: red;' }, [
        el('li', { 'style': 'font-size:28px;'}, ['第1个li标签']),
        el('li', { 'style': 'font-size:38px;'}, ['第2个li标签']),
    ]),
    el('input', { 'value': 'fuck'}, []),
]);
console.log(v1);

const v2 = el( 'div', { 'data-id': 1, 'style': 'corlor: red;' }, [
    el('div', { 'style': 'color: red;' }, [
        el('div', { 'style': 'color: red;' }, ['文字----------']),
        el('div', { 'style': 'color: red;' }, ['文字++++++++++']),
    ]),
    el('div', { 'style': 'color: red;' }, ['div1，v2']),
    el('div', { 'style': 'color: red;' }, ['么么哒']),
    el('p', { 'style': 'color: red;' }, ['文字1v2']),
    el('p', { 'style': 'color: red;' }, ['文字2v2']),
    el('input', { 'value': 'fuck'}, []),
]);

// 由虚拟DOM生成真实DOM
const dom = renderDOM(v1, document.getElementById('root'));

// 生成两个虚拟DOM之间的diff
const patches = diff(v1, v2);
console.log('patches');
console.log(patches);

// 将patches融合到root这个DOM上
patch(dom, patches);
