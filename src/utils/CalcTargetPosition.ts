/**
 * 计算定位的位置
 * @param triggerDom 触发器元素
 * @param targetHeight 目标元素高度 (下拉列表)
 * @param targetWidth 目标元素宽度 (下拉列表)
 * @param alignRight 居右对齐
 * @constructor
 */
const CalcTargetPosition = (
    triggerDom: any, targetHeight: number, targetWidth: number, alignRight?: boolean
) => {
    const { clientHeight, clientWidth } = document.body; // 当前触发器父级的位置
    const { pageYOffset, pageXOffset } = window; // 基于window对象滚动的距离
    const {
        top, left, height, width
    } = triggerDom.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    let targetOffsetY;
    let targetOffsetX;
    let P = true; // 动画执行方向 - 默认向下

    // 1.计算top位置
    const triggerPositionTop = top - 8; // 触发器距离顶部的距离
    const triggerPositionBtm = clientHeight - (top + height + 8); // 触发器距离底部的距离
    if (triggerPositionBtm >= targetHeight) {
        // 触发器距离底部的距离 大于等于 目标元素高度，下拉列表向下弹出
        targetOffsetY = top + height + 8 + pageYOffset;
    } else if (triggerPositionTop >= targetHeight) {
        // 触发器距离顶部的距离 大于等于 目标元素高度，下拉列表向上弹出
        targetOffsetY = top - targetHeight - 8 + pageYOffset;
        P = false;
    } else {
        // 上下都不满足条件，位置距离页面底部为0
        // 下拉列表向下弹出
        targetOffsetY = clientHeight - targetHeight + pageYOffset;
    }

    // 2.计算left位置
    const triggerLeftWidth = left; // 触发器左侧宽度
    const triggerRightWidth = clientWidth - left - width; // 触发器右侧宽度
    const leftWidth = triggerLeftWidth + width; // 左侧容量宽度
    const rightWidth = triggerRightWidth + width; // 右侧容量宽度
    // 左对齐
    if (clientWidth <= targetWidth) {
        targetOffsetX = pageXOffset;
    } else if (left > 0) {
        if (rightWidth >= targetWidth) {
            // 右侧可以放下下拉列表
            targetOffsetX = left + pageXOffset;
        } else if (leftWidth >= targetWidth) {
            // 左侧可以放下下拉列表
            targetOffsetX = (left + width - targetWidth + pageXOffset)
                + (triggerRightWidth > 0 ? 0 : triggerRightWidth);
        } else {
            targetOffsetX = (clientWidth - targetWidth) / 2 + pageXOffset;
        }
    } else {
        targetOffsetX = pageXOffset;
    }

    // 右对齐
    if (
        alignRight && (rightWidth >= targetWidth)
    ) targetOffsetX = targetOffsetX - targetWidth + width;

    // X-left位置，Y-top位置，P-动画执行方向
    return { X: targetOffsetX, Y: targetOffsetY, P };
};

export default CalcTargetPosition;
