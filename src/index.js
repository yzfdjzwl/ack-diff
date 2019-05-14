import {
    Element,
    createElement as el,
    renderDOM,
} from './element';
import diff from './diff.js';

const v1 = el( 'div', { 'data-id': 1, 'style': 'corlor: red;' }, [
    el( 'p', { 'style': 'color: red;' }, ['嘻嘻']),
    el( 'p', { 'style': 'color: red;' }, ['哈哈']),
    el( 'p', { 'style': 'color: red;' }, ['呵呵']),
    el( 'input', { 'value': 'fuck'}),
]);

const v2 = el( 'div', { 'data-id': 1, 'style': 'corlor: red;' }, [
    el( 'p', { 'style': 'color: red;' }, ['嘻嘻']),
    el( 'p', { 'style': 'color: red;' }, ['哈哈']),
    el( 'p', { 'style': 'color: red;' }, ['呵呵']),
    el( 'input', { 'value': 'fuck'}),
]);


renderDOM(v1, document.getElementById('root'));


console.log(v1 instanceof Element);
