import CalcTargetPosition from '@/utils/CalcTargetPosition';

import { Item } from '../types';

// 获取宽度
const GetWidth = (data: Item[], maxWidth: number): number => {
    const { body } = document;
    const div: HTMLDivElement = document.createElement('div');
    div.className = 'd-cascade-list';
    if (maxWidth) div.style.maxWidth = `${maxWidth}px`;
    let html = '';
    data.forEach((d) => {
        html += `<section class="d-cascade-item"><article class="d-cascade-name">${d.name}</article><article class="-cascade-subhead">${d.subhead}</article></section>`;
    });

    div.innerHTML = html;
    body.appendChild(div);
    const { width } = div.getBoundingClientRect();
    body.removeChild(div);
    return width;
};

interface XYP {X: number, Y: number, P: boolean}
interface IOptions {
    width: number
    maxCount: number
    data: Item[]
    reverse: boolean
    tag: any
}

const ResetPosition = (options: IOptions): XYP => {
    const {
        width, maxCount, data, reverse, tag
    } = options;
    const w = GetWidth(data, width);
    // 18表示上下padding=8 + 上下border=1
    const h = data.length * 38 + 18;
    const maxHeiByCount = maxCount * 38 + 18; // 最大容纳高度
    let height;
    if (h < maxHeiByCount) height = h;
    else height = maxHeiByCount;
    const { X, Y, P } = CalcTargetPosition(tag.current, height, w, reverse);

    // X-left位置，Y-top位置，P-动画执行方向
    return { X, Y, P };
};

export default ResetPosition;
