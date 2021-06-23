/** *
 * @time 2021.04.25
 * 树形结构相关辅助函数
 */

import DeWeight from '@/utils/DeWeight';
import {
    ITag, Item, Props, TileItem, StringAny
} from './types';


// 数组去重

/** *
 * 设置padding-left
 * @param ind 索引 string
 * @return number
 */
type SetPaddingFn = (ind: string) => number;
const SetPadding: SetPaddingFn = (ind) => {
    const arr = ind.split('-');
    return (arr.length - 1) * 24 + 12;
};
/** *
 * 设置是否是最后节点
 * @param item 当前项f
 * @return boolean
 */
type SetLastNodeFn = (item: Item) => boolean;
const SetLastNode: SetLastNodeFn = (item) => !(
    Object.prototype.hasOwnProperty.call(item, 'children')
    && item.children instanceof Array
    && JSON.stringify(item.children).length > 4
);
/** *
 * 设置checkbox显示状态
 * @param item 当前项
 * @param props
 * @return boolean
 */
type SetCheckboxShowFn = (item: Item, props: Props) => boolean;
const SetCheckboxShow: SetCheckboxShowFn = (item, props) => {
    const {
        multiple = false, allCheckboxShow = true, lastStage = false
    } = props;
    const { showCheckbox = true } = item;
    if (multiple) {
        if (allCheckboxShow) {
            if (showCheckbox) return !(lastStage && !SetLastNode(item));
            return showCheckbox; // false
        }
        return allCheckboxShow; // false
    }
    return false;
};
/** *
 * 设置checked值
 * @param item 当前项
 * @param props
 * @return string
 */
type SetCheckedStatusFn = (item: Item, props: Props) => string;
const SetCheckedStatus: SetCheckedStatusFn = ({ id }, props) => {
    const { value, multiple = false } = props;
    if (multiple) {
        if (value instanceof Array && value.includes(id)) return 'checked';
        return 'uncheck';
    }
    if (value === id) return 'checked';
    return 'uncheck';
};

/**
 * 计算tag
 * @param tag
 * @constructor
 */
type FormatTagFn = (item: ITag) => ITag;
const FormatTag: FormatTagFn = (tag) => {
    const obj = tag;
    const { name } = obj;
    const span = document.createElement('span');
    span.style.position = 'absolute';
    span.style.top = '100%';
    span.style.left = '0';
    span.style.zIndex = '-1';
    span.style.opacity = '0';
    span.style.fontSize = '12px';
    span.style.paddingLeft = '8px';
    span.style.paddingRight = '8px';
    span.innerText = name;
    document.body.appendChild(span);
    const { width } = span.getBoundingClientRect();
    span.remove();
    obj.width = Math.ceil(width);
    return obj;
};

/** *
 * 平铺树形结构
 * @param result 接收结果
 * @param tree 需要平铺的数据
 * @param pid 父级id
 * @param index 索引
 * @param open 是否是展开状态
 * @param props
 * @constructor
 * @return []
 */
type TileToolFn = (
    result: StringAny[],
    tree: Item[],
    pid: string,
    index: string | null,
    open: boolean | undefined,
    props: Props
) => any;
const TileTool: TileToolFn = (
    result, tree, pid, index = null, open = false, props
) => new Promise((resolve) => {
    const { omit = false } = props;
    tree.forEach((d: Item, i: number) => {
        const ind = index ? `${index}-${i}` : `${i}`;
        const lastNode = SetLastNode(d);
        const tag = omit && d.tag ? FormatTag(d.tag) : {};
        const obj = {
            // ...d,
            id: d.id,
            name: d.name,
            sameId: d?.sameId || '',
            ...{
                index: ind,
                parentId: pid,
                checked: SetCheckedStatus(d, props),
                open: !!d.open,
                // 设置默认禁用，此参数表示不能被修改disabled状态
                defaultDisabled: !!d.defaultDisabled,
                disabled: (Object.prototype.hasOwnProperty.call(d, 'defaultDisabled') && d.defaultDisabled) ? d.defaultDisabled : !!d.disabled,
                // 左内边距
                paddingLeft: index ? SetPadding(ind) : 12,
                show: index ? open : true,
                // 是否是最后一级节点(叶子节点)
                lastNode,
                omit: omit && !lastNode, // 显示更多操作
                tag, // 标签
                // 是否显示checkbox
                showCheckbox: SetCheckboxShow(d, props)
            }
        };
        // delete obj.children;
        result.push(obj);
        if (d.children && d.children instanceof Array && JSON.stringify(d.children).length > 4) {
            TileTool(result, d.children, d.id, ind, d.open, props);
        }
    });
    resolve(result);
});

/** *
 * 将数据转成map对象
 * @param tile
 */
type ToMapObjFn = (tile: TileItem[]) => StringAny
const ToMapObj: ToMapObjFn = (tile) => {
    const map = new Map(); // map对象
    tile.forEach((d) => {
        if (!map.has(d.id)) map.set(d.id, d);
    });
    return map;
};
/**
 * 组装数据成树形结构
 * @param tile 平铺原始数据
 */
type PackageToolFn = (tile: TileItem[]) => StringAny[]
const PackageTool: PackageToolFn = (tile) => {
    const result: StringAny[] = [];
    if (!Array.isArray(tile)) return result;
    tile.forEach((item: StringAny) => {
        // eslint-disable-next-line no-param-reassign
        delete item.children;
    });
    const map = ToMapObj(tile);
    tile.forEach((item) => {
        const parent = map.get(item.parentId);
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

/**
 * 根据id设置子级状态
 * @param id 当前项id
 * @param tileData 平铺原始数据
 * @param status 状态
 * @param childDisable 子级禁用
 * @param sameParams 相同id
 * @param init boolean 是否初始化
 * @param checkedData 选中的数据
 * @param linkage 上下级联动
 * @param includeParent 返回数据包含父级
 * @param lastStage 只能选择最后一级
 * @constructor
 */
type SetChildStatusByIdFn = (
    item: {
        id: string,
        tileData: TileItem[],
        status: string,
        childDisable?: boolean,
        sameParams?: boolean,
        init?: boolean,
        checkedData?: TileItem[],
        linkage?: boolean,
        includeParent?: boolean,
        lastStage?: boolean
    }
) => void;
const SetChildStatusById: SetChildStatusByIdFn = ({
    id,
    tileData,
    status,
    childDisable = false,
    sameParams = false,
    init = false,
    checkedData = [],
    linkage = true,
    includeParent = true,
    lastStage = false
}) => {
    tileData.forEach((d: TileItem) => {
        if (d.parentId === id) {
            // 当没有默认禁用时才可改变checked状态
            if (!d.defaultDisabled) d.checked = status;
            // childDisable = true 父级选中子级禁用，子级选中不影响父级
            if (childDisable) {
                d.disabled = d.defaultDisabled || status === 'checked';
                if (
                    !d.disabled && d.checked === 'checked'
                    && (checkedData && !checkedData.some((cd: TileItem) => cd.id === d.id))
                ) checkedData.push(d);
            } else if (!d.disabled && d.checked === 'checked' && (!checkedData || (checkedData && !checkedData.some((cd) => cd.id === d.id)))) {
                if (lastStage) {
                    if (d.lastNode) checkedData.push(d);
                } else if (linkage) {
                    if (includeParent) {
                        checkedData.push(d);
                    } else if (d.lastNode) checkedData.push(d);
                } else {
                    checkedData.push(d);
                }
            }
            if (!d.lastNode) {
                SetChildStatusById({
                    id: d.id,
                    tileData,
                    status: d.checked,
                    childDisable,
                    sameParams,
                    init,
                    checkedData,
                    linkage,
                    includeParent,
                    lastStage
                });
            }
        }
    });
};

/**
 * 检查兄弟数据状态
 * @param result 得到的结果
 * @constructor
 */
type CheckBrotherStatusFn = (result: TileItem[]) => string | null;
const CheckBrotherStatus: CheckBrotherStatusFn = (result) => {
    const everyChecked = result.every((d) => d.checked === 'checked');
    const someChecked = result.some((d) => d.checked === 'checked');
    const notNull = result.some((d) => d.checked === 'notNull');
    if (everyChecked && someChecked) return 'checked';
    if ((!everyChecked && someChecked) || notNull) return 'notNull';
    if (!everyChecked && !someChecked && !notNull) return 'uncheck';
    return null;
};
/**
 * 根据id查找兄弟
 * @param parentId 当前项
 * @param tile 平铺原始数据
 * @constructor
 */
type FindBrotherByIdFn = (parentId: string, tile: TileItem[]) => TileItem[];
const FindBrotherById: FindBrotherByIdFn = (parentId, tile) => (
    tile.filter((d) => d.parentId === parentId && !d.defaultDisabled)
);
/**
 * 根据id设置父级状态
 * @param parentId 当前项
 * @param tile 平铺原始数据
 * @param checkedData 选中的数据
 * @param props
 * @constructor
 */
type SetParentStatusByIdFn = (
    item: {parentId: string, tileData: TileItem[], checkedData?: TileItem[], props: Props}
) => void;
const SetParentStatusById: SetParentStatusByIdFn = ({
    parentId, tileData, checkedData, props
}) => {
    const { notNull = false, includeParent = true } = props;
    tileData.forEach((d) => {
        if (!d.defaultDisabled) {
            if (d.id === parentId) {
                d.checked = CheckBrotherStatus(FindBrotherById(parentId, tileData)) || '';
                if (checkedData && !checkedData.some((cd) => cd.id === d.id)) {
                    if (d.checked !== 'uncheck') {
                        if (d.checked === 'checked') {
                            if (includeParent) checkedData.push(d);
                        } else if (notNull) checkedData.push(d);
                    }
                }
                if (d.id !== '-1') {
                    SetParentStatusById({
                        parentId: d.parentId,
                        tileData,
                        checkedData,
                        props
                    });
                }
            }
        }
    });
};

// 可选面板是否拼接父级name
type GetBiasNameFn = (tileData: TileItem[], parentId: string, arr: string[]) => void;
const GetBiasName: GetBiasNameFn = (tileData, parentId, arr) => {
    const len = tileData.length;
    for (let i = 0; i < len; i++) {
        const { id, parentId: pid, name } = tileData[i];
        if (id === parentId) {
            arr.unshift(name);
            if (pid !== '-1') GetBiasName(tileData, pid, arr);
            break;
        }
    }
};

/**
 * 设置选中的数据name用斜线(/)拼接
 * @param tileData
 * @param checkedData
 * @constructor
 */
type SetBiasNameFn =(tileData: TileItem[], checkedData: StringAny[]) => StringAny[];
const SetBiasName: SetBiasNameFn = (tileData, checkedData) => {
    checkedData.forEach((d) => {
        const arr = [d.name];
        GetBiasName(tileData, d.parentId, arr);
        d.biasName = arr.join('/');
    });
    return checkedData;
};

/**
 * 获取选中的数据
 * @param tileData 平铺原始数据
 * @param props
 * @constructor
 */
type GetCheckedDataFn =(tileData: TileItem[], props: Props) => TileItem[];
const GetCheckedData: GetCheckedDataFn = (tileData, props) => {
    const {
        notNull, childDisable, includeParent = true, jointParent
    } = props;
    let result;
    if (childDisable) {
        // 此处处理 父级选中子级禁用，子级选中不影响父级，如果子级初始状态是禁用的，选中父级后不统计子级，父级取消选中统计默认禁用的子级
        const checkedObj = tileData.filter((d) => d.checked === 'checked');
        const everyLastNode = checkedObj.every((d) => d.lastNode);
        const someLastNode = checkedObj.some((d) => d.lastNode);
        const checkedIds = checkedObj.map((d) => d.id);
        if (everyLastNode) result = checkedObj;
        else if (someLastNode) result = checkedObj.filter((d) => !d.disabled || (d.defaultDisabled && !checkedIds.includes(d.parentId)));
        else result = checkedObj.filter((d) => !d.disabled);
    } else if (notNull && includeParent) result = tileData.filter((d) => (d.checked === 'checked' || d.checked === 'notNull'));
    else if (notNull && !includeParent) result = tileData.filter((d) => (d.checked === 'checked' && d.lastNode));
    else if (!notNull && includeParent) result = tileData.filter((d) => (d.checked === 'checked'));
    else result = tileData.filter((d) => (d.checked === 'checked' && d.lastNode));
    if (jointParent) SetBiasName(tileData, result);
    return result;
};

// 设置当前状态
type SetCurrentItemStatusFn =(
    tileData: TileItem[],
    status: string,
    id: string
) => TileItem[];
const SetCurrentItemStatus: SetCurrentItemStatusFn = (tileData, status, id) => {
    const len = tileData.length;
    for (let i = 0; i < len; i++) {
        const item = tileData[i];
        if (item.id === id) {
            item.checked = status;
            break;
        }
    }
    return tileData;
};

// 筛选已经选中的数据 - 通过id移除父级
type RemoveFn = (
    tileData: TileItem[], checkedData: StringAny[], parentId: string, idArr: string[]
) => void;
const RemoveParentByParentId: RemoveFn = (
    tileData, checkedData, parentId, idArr
) => {
    // const someLen = checkedData.filter(cd => cd.parentId === parentId).length;
    checkedData.forEach((d) => {
        // if (d.id === parentId && someLen === 1) idArr.push(d.id);
        if (d.id === parentId && !idArr.includes(d.id)) idArr.push(d.id);
    });
    const curs = tileData.filter((f) => f.id === parentId);
    if (curs && curs.length) {
        curs.forEach((d) => {
            RemoveParentByParentId(tileData, checkedData, d.parentId, idArr);
        });
    }
};
// 筛选已经选中的数据 - 通过id移除子级 idArr-需要移除的id
const RemoveChildById: RemoveFn = (tileData, checkedData, id, idArr) => {
    checkedData.forEach((d) => {
        if (d.id === id && !idArr.includes(d.id)) idArr.push(d.id);
    });
    const curs = tileData.filter((f) => f.parentId === id);
    if (curs && curs.length) {
        curs.forEach((d) => {
            RemoveChildById(tileData, checkedData, d.id, idArr);
        });
    }
};

// 查找子级id
type FindChildIdByParentIdFn = (tileData: TileItem[], id: string, arr: string[]) => void;
const FindChildIdByParentId: FindChildIdByParentIdFn = (tileData, id, arr) => {
    tileData.forEach((d) => {
        if (d.parentId === id) {
            arr.push(d.id);
            if (!d.lastNode) FindChildIdByParentId(tileData, d.id, arr);
        }
    });
};
// 筛选已经选中的数据
type FilterCheckedDataFn = (
    options: {
        tileData: TileItem[],
        checkedData: TileItem[],
        status: string,
        item: TileItem,
        props: Props
    }
) => TileItem[];
const FilterCheckedData: FilterCheckedDataFn = ({
    tileData, checkedData, status, item, props
}) => {
    const {
        linkage = true, lastStage, includeParent = true, childDisable
    } = props;
    const cData: TileItem[] = JSON.parse(JSON.stringify(checkedData));
    const { id, parentId = '' } = item;
    let data = cData;
    if (status === 'checked') {
        if (childDisable) {
            cData.push(item);
            const ids = [id];
            FindChildIdByParentId(tileData, id, ids);
            data = cData.filter((d) => !ids.includes(d.parentId));
        } else if (lastStage) {
            if (!checkedData.some((cd) => cd.id === item.id) && item.lastNode) data.push(item);
        } else if (linkage) {
            if (includeParent) {
                if (!checkedData.some((cd) => cd.id === item.id)) data.push(item);
            } else if (!checkedData.some((cd) => cd.id === item.id) && item.lastNode) {
                data.push(item);
            }
        } else if (!checkedData.some((cd) => cd.id === item.id)) {
            data.push(item);
        }
    } else {
        // status === 'uncheck'
        if (checkedData && checkedData.length) {
            const idArr = [id];
            if (linkage) {
                RemoveChildById(tileData, checkedData, id, idArr); // 移除子级
                RemoveParentByParentId(tileData, checkedData, parentId, idArr); // 移除父级
            }
            data = cData.filter((d) => !idArr.includes(d.id));
        }
    }
    return data;
};

/**
 * 设置当前项、子项、父项选中状态
 * @param item 当前项
 * @param tileList 平铺原始数据
 * @param props
 * @param state
 * @constructor
 */
interface RChecked {
    tileData: TileItem[]
    checkedIds: string[]
    checkedData: TileItem[]
}
type SetCheckedFn = (item: TileItem, tileData: TileItem[], props: Props, checkedDataYet?: TileItem[]) => RChecked
const SetChecked: SetCheckedFn = (item, tileList = [], props, checkedDataYet = []) => {
    const {
        linkage = true, includeParent = true, lastStage, childDisable, jointParent, sameParams
    } = props;
    const {
        id, parentId, sameId, checked
    } = item;
    const strategy = {
        checked: 'uncheck',
        uncheck: 'checked',
        notNull: 'checked'
    };
    // debugger;
    const status = strategy[checked];
    const data = JSON.parse(JSON.stringify(tileList));
    let tileData = SetCurrentItemStatus(data, status, id);
    item.checked = status;

    const checkedData = FilterCheckedData({
        tileData,
        checkedData: checkedDataYet,
        status,
        item,
        props
    });

    if (linkage) {
        if (childDisable) {
            // 父级选中子级禁用，子级选中不影响父级
            // 设置子项数据
            SetChildStatusById({
                id,
                tileData,
                status,
                childDisable,
                sameParams,
                init: false,
                checkedData
            });
        } else {
            // lastStage - 只能选择最后一级
            // linkage - 上下级联动
            // 设置子项数据
            SetChildStatusById({
                id,
                tileData,
                status,
                childDisable,
                init: false,
                checkedData,
                linkage,
                includeParent,
                lastStage
            });
            if (linkage || includeParent) {
                // 设置父项数据
                SetParentStatusById({
                    parentId,
                    tileData,
                    checkedData,
                    props
                });
            }
        }
    }
    if (sameParams) tileData = SetSameDisable(tileData, checkedData);
    if (jointParent) SetBiasName(tileData, checkedData);
    const checkedIds = checkedData.map((d) => d.id);
    return { tileData, checkedIds, checkedData: JSON.parse(JSON.stringify(checkedData)) };
};

/**
 * 设置当前项、子项、父项选中状态 - 按照tree的结构数据排序返回选中数据
 * @param item 当前项
 * @param tileData 平铺原始数据
 * @constructor
 */
const SetCheckedSortByTree: SetCheckedFn = (item, tileData, props) => {
    const {
        linkage = true, lastStage = false, childDisable = false
    } = props;
    const { id, parentId, checked } = item;
    const strategy = {
        checked: 'uncheck',
        uncheck: 'checked',
        notNull: 'checked'
    };
    const status = strategy[checked];
    item.checked = status;
    if (childDisable) {
        // 父级选中子级禁用，子级选中不影响父级
        // 设置子项数据
        SetChildStatusById({
            id,
            tileData,
            status,
            childDisable
        });
    } else {
        // linkage - 上下级联动
        if (linkage || lastStage) {
            // 设置子项数据
            SetChildStatusById({
                id,
                tileData,
                status
            });
            // 设置父项数据
            SetParentStatusById({
                parentId,
                tileData,
                props
            });
        }
    }
    const checkedData = GetCheckedData(tileData, props);
    const checkedIds = checkedData.map((d) => d.id);
    return { tileData, checkedIds, checkedData: JSON.parse(JSON.stringify(checkedData)) };
};

/**
 * 设置展开子项
 * @param id 当前项 id
 * @param status 当前状态
 * @param tileData 平铺原始数据
 * @constructor
 */
type OpenNodeFn = (id: string, status: boolean, tileData: TileItem[]) => TileItem[];
const OpenChildNode: OpenNodeFn = (id, status, tileData) => tileData.map((d) => {
    if (d.parentId === id) {
        d.show = status;
        if (!status && d.open) {
            d.open = false;
            OpenChildNode(d.id, false, tileData);
        }
    }
    return d;
});

/**
 * 设置相同项禁用
 * @param tile
 * @param checkedData 选中的项
 * @constructor
 */
type SetSameDisableFn = (tile: TileItem[], checkedData: TileItem[]) => TileItem[];
const SetSameDisable: SetSameDisableFn = (tile, checkedData) => {
    // first 获取父级的选中状态
    const getParentStatus = (parentId: String) => tile.find((d) => d.id === parentId)?.checked === 'checked';
    if (!checkedData || !checkedData.length) {
        return tile.map((d) => {
            if (d.sameId && !d.defaultDisabled) d.disabled = false;
            return d;
        });
    }
    // second 当选中的是顶级 返回原数据
    if (checkedData.length === 1 && checkedData[0].parentId === '-1') return tile;
    // third
    const objSames = checkedData?.filter((d) => d.sameId);
    const objArr = DeWeight(objSames, 'sameId', true); // 去重后的选中项
    const idArr = checkedData.map((d) => d.id) || [];
    const sameArr = objArr?.map((d: { sameId: string; }) => d.sameId) || [];
    return tile.map((d) => {
        if (d.sameId && !idArr.includes(d.parentId)) {
            d.disabled = getParentStatus(d.parentId)
                || (!idArr.includes(d.id) && sameArr.includes(d.sameId));
        }
        return d;
    });
};

/**
 * 设置子项数据选中状态
 * @param id
 * @param tileList
 * @param status
 * @param next 是否进行下一步子项设置
 * @constructor
 */
type SetChildrenStatusFn = (
    id: string, tileList: TileItem[], status: string, next: boolean
) => TileItem[];
const SetChildrenStatus: SetChildrenStatusFn = (id, tileList, status, next) => {
    tileList.forEach((d) => {
        // if (!d.defaultDisabled && !d.disabled && d.parentId === id) {
        if (d.parentId === id) {
            if (!d.defaultDisabled && !d.disabled) d.checked = status;
            if (next) SetChildrenStatus(d.id, tileList, status, next);
        }
    });
    return tileList;
};

/** *
 * 初始化组件 - 设置平铺列表的选中状态
 * @param tile 平铺列表
 * @param props
 * @return string
 */
type SetTileCheckedInitFn = (tile: TileItem[], props: Props) => any;
const SetTileCheckedInit: SetTileCheckedInitFn = async (
    tile, props
) => new Promise((resolve) => {
    const {
        value, multiple, linkage, lastStage, childDisable, sameParams
    } = props;
    let tileData = tile;
    if (multiple && value instanceof Array) {
        const items = tile.filter((d) => value.includes(d.id)); // 选中的项
        tileData = sameParams ? SetSameDisable(tile, items) : tile;

        if (childDisable) {
            const itemsFilter = items.filter((d) => !d.lastNode);
            itemsFilter.forEach((d) => {
                // 设置子项数据
                SetChildStatusById({
                    id: d.id, tileData, status: 'checked', childDisable, init: true
                });
            });
        } else {
            items.forEach((d) => {
                // 设置子项数据
                if (linkage || lastStage) {
                    SetChildStatusById({
                        id: d.id, tileData, status: 'checked', init: true, linkage, lastStage
                    });
                }
                // 设置父项数据
                if (linkage) SetParentStatusById({ parentId: d.parentId, tileData, props });
            });
        }
    }
    if (multiple) {
        const checkedData = GetCheckedData(tile, props);
        const checkedIds = checkedData.map((d) => d.id);
        resolve({ tileData, checkedIds, checkedData });
    } else {
        const checkedData = tileData.find((d) => d.id === value);
        const checkedIds = checkedData ? checkedData.id : '';
        resolve({ tileData, checkedIds, checkedData });
    }
});

interface RStrategyChange {
    tileData: TileItem[]
    checkedIds: string[]
    checkedData: TileItem[]
}
type StrategyChangeFn = (dropId: string, item: TileItem, props: Props, tileList: TileItem[]) => RStrategyChange;
const StrategyChange: StrategyChangeFn = (dropId, { id }, props, tileList) => {
    const strategy = {
        // 选择所有子级
        allChild() {
            return SetChildrenStatus(id, tileList, 'checked', true);
        },
        // 选择下一级
        nextChild() {
            return SetChildrenStatus(id, tileList, 'checked', false);
        },
        // 取消所有子级
        cancelAll() {
            return SetChildrenStatus(id, tileList, 'uncheck', true);
        }
    };
    const tileData = strategy[dropId]();
    const checkedData = GetCheckedData(tileData, props);
    const checkedIds = checkedData.map((d) => d.id);
    return {
        tileData,
        checkedIds,
        checkedData
    };
};

export {
    TileTool,
    PackageTool,
    OpenChildNode,
    SetTileCheckedInit,
    SetChecked,
    SetCheckedSortByTree,
    StrategyChange
};
