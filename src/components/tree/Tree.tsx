import './style.styl';
import React, {
    MouseEvent, Fragment, useState, useEffect, memo, useCallback
} from 'react';
import ArrowTriangle from '@/assets/iconSvg/arrow_triangle.svg';
import MorePointSvg from '@/assets/iconSvg/morePoint.svg';

import TextEllipsis from '@/utils/TextEllipsis';

import Checkbox from '../checkbox/Checkbox';
import Select from '../select/Select';
import {
    Item, Props, TileItem
} from './index';

import {
    TileTool, OpenChildNode, SetTileCheckedInit, SetChecked, SetCheckedSortByTree,
    StrategyChange
} from './TreeHandle';

// Select数据
const selectData = [
    { id: 'allChild', name: '选择所有子级' },
    { id: 'nextChild', name: '选择下一级' },
    { id: 'cancelAll', name: '取消所有子级' }
];

function Tree(props: Props) {
    const {
        value, data, multiple = false, omit = false,
        linkage, lastStage, childDisable,
        sameParams, sortByTree = false,
        change,
        openNode = () => {}
    } = props;
    // 平铺列表
    const [tileList, setTileList] = useState<TileItem[]>([]);
    // 平铺列表历史数据
    // const [tileListHistory, setTileListHistory] = useState([]);
    // 当前选中的id
    const [currentId, setCurrentId] = useState(value);
    // 选中的数据
    const [checkedData, setCheckedData] = useState<TileItem[]>([]);

    const initTileList = useCallback(async (data: Item[], value: string | string[] | undefined) => {
        setCurrentId(value);
        const strData = JSON.stringify(data);
        if (strData.length <= 4) {
            setTileList([]);
        } else {
            const nData = JSON.parse(strData);
            const tile = await TileTool([], nData, '-1', null, false, props);
            const { tileData, checkedData } = await SetTileCheckedInit(tile, props);
            setTileList(tileData);
            setCheckedData(checkedData);
        }
    }, [omit, value, multiple, linkage, lastStage, childDisable, sameParams]);

    useEffect(() => {
        initTileList(data, value).then();
    }, [value, data]);

    // 展开子项
    const openChildNode = useCallback((item: TileItem) => {
        const { id, open } = item;
        const status = !open;
        item.open = status;
        const tile = OpenChildNode(id, status, tileList);
        setTileList(tile);
        openNode(JSON.parse(JSON.stringify(item)));
    }, [tileList]);
    // 点击每项 status=true表示需要向父级提交数据并带确定操作
    const itemClick = useCallback((item: TileItem, status?: boolean) => {
        const curItem: TileItem = JSON.parse(JSON.stringify(item));
        const {
            id, sameId, disabled, showCheckbox, checked
        } = curItem;
        if (disabled || (multiple && !showCheckbox)) return;
        const strategy = {
            // 多选
            true() {
                const TD: TileItem[] = JSON.parse(JSON.stringify(tileList));
                const lists = sameParams ? TD.map((d) => {
                    const {
                        sameId: dSameId, defaultDisabled, disabled: dDisabled, id: dId
                    } = d;
                    if (sameId && dSameId && !defaultDisabled && !dDisabled && dId !== id && dSameId === sameId) {
                        d.disabled = checked !== 'checked';
                    }
                    return d;
                }) : TD;

                const { tileData, checkedIds, checkedData: checkedDataYet } = sortByTree
                    ? SetCheckedSortByTree(curItem, lists, props)
                    : SetChecked(curItem, lists, props, checkedData);

                // debugger;
                setTileList(tileData);
                setCheckedData(checkedDataYet);
                // 触发选中改变
                change({
                    item: curItem, checkedIds, checkedData: checkedDataYet
                }, status);
            },
            // 单选
            false() {
                setCurrentId(id);
                // 点击的当前项
                change(curItem);
            }
        };
        strategy[`${multiple}`]();
    }, [multiple, tileList, sortByTree]);

    // 通过类型设置选中状态
    const strategyChange = useCallback((id: string, item: TileItem) => {
        const { tileData, checkedIds, checkedData } = StrategyChange(id, item, props, tileList);
        setCheckedData(checkedData);
        setTileList(tileData);
        // emit('changeTileData', tileData);
        change({
            item, checkedIds, checkedData
        }, true);
    }, [tileList]);
    // Select选中状态改变回调
    const selectChange = useCallback((id: string, item: TileItem) => {
        strategyChange(id, item);
    }, []);

    return (
        <div className="d-tree">
            {
                tileList.map((item) => (
                    <Fragment key={item.id}>
                        {
                            item.show && (
                                <div
                                    className={
                                        [
                                            'd-tree-item',
                                            (!multiple && currentId === item.id) && 'd-tree-current',
                                            item.disabled && 'd-tree-disabled'
                                        ].join(' ')
                                    }
                                    style={{ paddingLeft: `${item.paddingLeft}px` }}
                                >
                                    <section className="d-tree-arrow">
                                        {
                                            !item.lastNode && (
                                                <i
                                                    className={['d-tree-arrow-svg', item.open && 'd-tree-triangle'].join(' ')}
                                                    onClick={(e: MouseEvent<HTMLElement>) => {
                                                        e.stopPropagation();
                                                        openChildNode(item);
                                                    }}
                                                >
                                                    <ArrowTriangle />
                                                </i>
                                            )
                                        }
                                    </section>
                                    <div
                                        className={['d-tree-main', multiple ? 'd-tree-multiple' : 'd-tree-single'].join(' ')}
                                        onClick={(e) => { e.stopPropagation(); itemClick(item); }}
                                    >
                                        {item.showCheckbox && (
                                            <section className="d-tree-checkbox">
                                                <Checkbox
                                                    disabled={item.disabled}
                                                    checked={item.checked}
                                                />
                                            </section>
                                        )}
                                        <section className={['d-tree-content', item.omit && 'd-tree-omit'].join(' ')}>
                                            {item.icon && <i className="d-tree-icon"><img src={item.icon} alt="" /></i>}
                                            <article className="d-tree-text" onMouseEnter={(e: MouseEvent<HTMLElement>) => { TextEllipsis(e, ['ARTICLE']); }}>{item.name}</article>
                                            {
                                                (multiple && omit) && (
                                                    <span
                                                        className={
                                                            ['d-tree-point-svg', item.omitStatus && 'd-tree-point-svg-active'].join(' ')
                                                        }
                                                    >
                                                        <Select
                                                            border={false}
                                                            triangle={false}
                                                            data={selectData}
                                                            // onGetStatus={(status) => getStatus(status, item)}
                                                            change={({ id }) => selectChange(id, item)}
                                                        >
                                                            <MorePointSvg />
                                                        </Select>
                                                    </span>
                                                )
                                            }
                                        </section>
                                    </div>
                                </div>
                            )
                        }
                    </Fragment>
                ))
            }
        </div>
    );
}

export default memo(Tree);
