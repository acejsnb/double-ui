/**
 * 设置标签的title
 * @param e
 * @constructor
 */
const TextEllipsis = (e: { target: any; }) => {
    const { target } = e;
    // debugger;
    const { clientWidth, scrollWidth } = target;
    if (scrollWidth > clientWidth) target.title = target.innerText;
    else target.title = '';
};

export default TextEllipsis;
