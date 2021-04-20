import FindTarget from '@/utils/FindTarget';
/**
 * 设置标签的title
 * @param e
 * @param tagList 标签名称 如 div/DIV
 * @constructor
 */
const TextEllipsis = (e: any, tagList: string[]) => {
    const target = FindTarget(e.target, tagList);
    if (target.tagName === 'BODY') return;
    const { dataset: { disabled = 'false' }, clientWidth, scrollWidth } = target;

    if (disabled === 'true') return;
    if (scrollWidth > clientWidth) {
        target.title = target.innerText;
    } else if (target.title) target.title = '';
};

export default TextEllipsis;
