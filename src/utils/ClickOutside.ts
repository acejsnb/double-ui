/**
 * 检查点击弹窗外层
 * @param e event对象
 * @param dom 监听的dom对象
 * @param cb 回调
 * @constructor
 */
type Fn = () => void;
const ClickOutside = (e: MouseEvent, dom: HTMLElement, cb: Fn) => {
    if (!dom.contains(e.target as HTMLElement)) cb();
};

export default ClickOutside;
