/**
 * 检查点击弹窗外层
 * @param e event对象
 * @param dom 监听的dom对象
 * @param cb 回调
 * @constructor
 */
type Fn = () => void;
const ClickOutside = (e: Event, dom: HTMLElement, cb: Fn) => {
    // @ts-ignore
    const { x, y } = e;
    const {
        width, height, left, top
    } = dom.getBoundingClientRect();
    const elStartXPoint = left;
    const elEndXPoint = elStartXPoint + width;
    const elStartYPoint = top;
    const elEndYPoint = elStartYPoint + height;
    if (
        x < elStartXPoint
        || x > elEndXPoint
        || y < elStartYPoint
        || y > elEndYPoint
    ) cb();
};

export default ClickOutside;
