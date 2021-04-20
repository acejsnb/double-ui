/**
 * 通过当前Element查找需要的Element
 * @param target event对下的target
 * @param tagList 标签名称 如 div/DIV
 * @constructor
 */
const FindTarget = (target: any, tagList: string[]): HTMLElement => {
    const tn = target.tagName.toLocaleLowerCase();
    if (tn === 'body') return target;
    if (tagList.some((d) => d.toLocaleLowerCase() === tn)) return target;
    return FindTarget(target.parentNode, tagList);
};

export default FindTarget;
