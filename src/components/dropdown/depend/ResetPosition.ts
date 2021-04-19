import CalcTargetPosition from '@/utils/CalcTargetPosition';

import { Item } from '../Types';

// 获取宽度
const GetWidth = (data: Item[], maxWidth: number): number => {
    const { body } = document;
    const div: HTMLDivElement = document.createElement('div');
    div.className = 'd-drop-content';
    if (maxWidth) div.style.maxWidth = `${maxWidth}px`;
    div.style.height = '0';
    div.style.zIndex = '-100';
    let html = '<div class="d-drop-option">';
    data.forEach((d) => {
        html += `<section class="d-drop-option-item"><span>${d.name}</span></section>`;
    });
    html += '</div>';

    div.innerHTML = html;
    body.appendChild(div);
    const { width } = div.getBoundingClientRect();
    body.removeChild(div);
    return width;
};

interface IRP {X: number, Y: number, P: boolean}
interface IOptions {
    maxWidth: number
    maxCount: number
    alignRight: boolean
    data: Item[]
    tag: any
}

const ResetPosition = (options: IOptions): IRP => {
    const {
        maxWidth, maxCount, alignRight, data, tag
    } = options;
    const width = maxWidth
        ? maxWidth
        : GetWidth(data, maxWidth);
    // const baseHei = 16 + (openSearch && 40), // 基本高度
    const h = data.length * 38;
    const maxHeiByCount = maxCount * 38; // 最大容纳高度
    let height;
    if (h < maxHeiByCount) height = h;
    else height = maxHeiByCount;
    const { X, Y, P } = CalcTargetPosition(tag.current, height, width, alignRight);

    // X-left位置，Y-top位置，P-动画执行方向
    return { X, Y, P };
};

export default ResetPosition;
