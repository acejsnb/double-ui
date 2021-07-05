import CalcTargetPosition from '@/utils/CalcTargetPosition';
import { Item } from './types';

interface TItem extends Item{
    [key: string]: any
}

interface XYP {X: number, Y: number, P: boolean}
interface IOptions {
    data: Item[]
    tag: any
}
const TileTool = (result: TItem[], tree: Item[], pid: string, index: string, open = false) => {
    tree.forEach((d, i: number) => {
        const ind = index ? `${index}-${i}` : `${i}`;
        const obj: TItem = {
            id: d.id,
            name: d.name,
            ...{
                index: ind,
                parentId: pid,
                open: !!d.open,
                show: index ? open : true
            }
        };
        // delete obj.children;
        result.push(obj);
        if (d.children && d.children instanceof Array && JSON.stringify(d.children).length > 4) {
            TileTool(result, d.children, d.id, ind, d.open);
        }
    });
};
const getHeight = (data: Item[]): number => {
    const result: TItem[] = [];
    TileTool(result, data, '-1', '', false);
    return result.filter((d) => d.show).length * 38 + 16;
};

const ResetPosition = (options: IOptions): XYP => {
    const {
        data, tag
    } = options;
    const width = 280;
    let height = getHeight(data);
    if (height > 360) height = 360;
    const { X, Y, P } = CalcTargetPosition(tag.current, height, width);

    // X-left位置，Y-top位置，P-动画执行方向
    return { X, Y, P };
};

export default ResetPosition;
