/**
 * 通过当前Element查找需要的Element
 * @param target event对下的target
 * @param tagName 标签名称 如 div/DIV
 * @constructor
 */
const FindTarget = (target: any, tagName: string): HTMLElement => {
    const tn = target.tagName;
    if (tn.toLocaleLowerCase() === 'body') return target;
    if (tn.toLocaleLowerCase() === tagName.toLocaleLowerCase()) return target;
    return FindTarget(target.parentNode, tagName);
};

export default FindTarget;
