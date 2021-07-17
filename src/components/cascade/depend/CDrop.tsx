import React, {
    FC, MouseEvent, useEffect, useState
} from 'react';
import { CSSTransition } from 'react-transition-group';
import FindTarget from '@/utils/FindTarget';
import List from './List';
import { Item, CProps } from '../types';

const initItem = { id: '', name: '', children: [] };

// 目前最多支持3级联
const CDrop: FC<CProps> = ({
    reverse, selectedId, data = [], itemClick
}) => {
    // 1级数据
    const [firstId, setFirstId] = useState('');
    const [firstItem, setFirstItem] = useState<Item>(initItem);
    // 2级数据
    const [secondId, setSecondId] = useState('');
    const [secondItem, setSecondItem] = useState<Item>(initItem);
    const [secondShow, setSecondShow] = useState(false);
    const [secondData, setSecondData] = useState<Item[]>([]);
    useEffect(() => {
        setSecondShow(!!(secondData && secondData.length));
    }, [secondData]);
    // 3级数据
    const [thirdId, setThirdId] = useState('');
    const [thirdItem, setThirdItem] = useState<Item>(initItem);
    const [thirdShow, setThirdShow] = useState(false);
    const [thirdData, setThirdData] = useState<Item[]>([]);
    useEffect(() => {
        setThirdShow(!!(thirdData && thirdData.length));
    }, [thirdData]);

    useEffect(() => {
        // 清空选择的数据
        if (!selectedId) {
            setFirstId('');
            setFirstItem(initItem);
            setSecondId('');
            setSecondItem(initItem);
            setSecondData([]);
            setThirdId('');
            setThirdItem(initItem);
            setThirdData([]);
        }
    }, [selectedId]);

    // 点击item
    const dropClick = (e: MouseEvent) => {
        e.stopPropagation();
        const target = FindTarget(e.target, ['SECTION']);
        if (target?.tagName === 'SECTION') {
            const { dataset: { tier, id = '', pid = '' } } = target;
            if (tier === '1') {
                const item = data.find((d) => d.id === id);
                setFirstId(id);
                itemClick?.(id, pid, item);
            } else if (tier === '2') {
                const item = secondData.find((d) => d.id === id);
                setSecondId(id);
                itemClick?.(id, pid, item);
            } else {
                const item = thirdData.find((d) => d.id === id);
                setThirdId(id);
                itemClick?.(id, pid, item);
            }
        }
    };
    // hover item
    const moseOver = (e: MouseEvent) => {
        const target = FindTarget(e.target, ['SECTION']);
        if (target?.tagName === 'SECTION') {
            const { dataset: { tier, id = '', pid = '' } } = target;
            if (tier === '1') {
                // setFirstId('')
                setSecondId('');
                setThirdId('');
                // 设置2级数据
                const item = data.find((d) => d.id === id) || initItem;
                setFirstItem(item);
                setThirdData([]);
                const { children = [] } = item as Item;
                if (children && children.length) setSecondData(children);
                else setSecondData([]);
            } else if (tier === '2') {
                // setSecondId('')
                setThirdId('');
                // 设置3级数据
                const item = firstItem.children?.find((d) => d.id === id) || initItem;
                setSecondItem(item);
                setFirstId(firstItem.id || '');
                const { children } = item as Item;
                if (children && children.length) setThirdData(children);
                else setThirdData([]);
            } else {
                // 设置3级item
                const item = secondItem.children?.find((d) => d.id === id) || initItem;
                setThirdItem(item);
                setSecondId(secondItem.id || '');
            }
        }
    };
    let timer: number;
    const dropHover = (e: MouseEvent) => {
        e.stopPropagation();
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => { moseOver(e); }, 300);
    };
    const dropOut = () => {
        if (timer) window.clearTimeout(timer);
    };

    return (
        <div className={['d-cascade-drop', reverse ? 'd-cascade-drop-reverse' : 'd-cascade-drop-normal'].join(' ')} onClick={dropClick} onMouseOver={dropHover} onMouseOut={dropOut}>
            <List key="first" tier="1" id={firstId} data={data} />
            <CSSTransition key="second" in={secondShow} mountOnEnter unmountOnExit timeout={120} classNames={reverse ? 'd-slide-left' : 'd-slide-right'}>
                <List key="second" tier="2" id={secondId} data={secondData} />
            </CSSTransition>
            <CSSTransition key="third" in={thirdShow} mountOnEnter unmountOnExit timeout={120} classNames={reverse ? 'd-slide-left' : 'd-slide-right'}>
                <List key="third" tier="3" id={thirdId} data={thirdData} />
            </CSSTransition>
        </div>
    );
};

export default CDrop;
