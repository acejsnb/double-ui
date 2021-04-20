import { MutableRefObject } from 'react';
import CalcTargetPosition from '@/utils/CalcTargetPosition';

import { IItem } from '../Types';

// 获取宽度
const GetWidth = (data: IItem[], maxWidth: number): number => {
    const { body } = document;
    const div: HTMLDivElement = document.createElement('div');
    div.className = 'p-drop-group-box';
    if (maxWidth) div.style.maxWidth = `${maxWidth}px`;
    div.style.padding = '0';
    div.style.border = '0';
    div.style.height = '0';
    div.style.zIndex = '-100';
    let html = '';
    data.forEach((d) => {
        html += `${'<div>'
        + '<section class="p-drop-item-title">'}${d.name}</section>`;
        if (d.children && d.children.length) {
            d.children.forEach((d2) => {
                html += `<article class="p-drop-group-option">${d2.name}</article>`;
            });
        }

        html += '</div>';
    });

    div.innerHTML = html;
    body.appendChild(div);
    const { width } = div.getBoundingClientRect();
    body.removeChild(div);
    return width;
};

// 计算数据长度-计算数据高度
const CountLen = (data: IItem[]): number => {
    const arr = [];
    data.forEach((d) => {
        arr.push(d);
        if (d && d.children && d.children.length) {
            d.children.forEach((d2) => {
                arr.push(d2);
            });
        }
    });
    const h = arr.length * 38 + 16;
    return h > 246 ? 246 : h;
};

interface XYP {X: number, Y: number, P: boolean}
interface IOptions {
    maxWidth: number
    data: IItem[]
    tag: MutableRefObject<null>
}

const ResetPosition = (options: IOptions): XYP => {
    const {
        maxWidth, data, tag
    } = options;
    const width = maxWidth || GetWidth(data, maxWidth);
    const { X, Y, P } = CalcTargetPosition(tag.current, CountLen(data), width);

    // X-left位置，Y-top位置，P-动画执行方向
    return { X, Y, P };
};

export default ResetPosition;
