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
    if (!dom.contains(e.target)) cb();
};

export default ClickOutside;
