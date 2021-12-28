import React, { ForwardRefRenderFunction, useContext, forwardRef } from 'react';
import TriangleSvg from '@/assets/iconSvg/triangle.svg';
import Context from './Context';
import { ItemTitleProps } from './index';

const ItemTitle: ForwardRefRenderFunction<HTMLDivElement, ItemTitleProps> = ({
    id, menuId, name,
    icon,
    layout,
    params = {},
    hasChildNode,
    mouseHandle,
    children
}, ref) => {
    const { state: { selectedIds, openIds, click }, dispatch } = useContext(Context);

    const titleClick = () => {
        if (hasChildNode) {
            if (layout === 'position') return;
            // 展开
            let payload: string;
            if (openIds.includes(id)) {
                const index = openIds.findIndex((d) => d === id);
                payload = openIds.filter((d, i) => i < index)?.join(',') ?? '';
            } else {
                payload = menuId;
            }
            dispatch({ type: 'open', payload });
        } else {
            dispatch({ type: 'selected', payload: `${menuId},${id}` });
            click?.({ id, ...params });
        }
    };
    // 鼠标移入移除
    const enter = () => {
        if (layout === 'tile' || !hasChildNode) return;
        mouseHandle(true);
    };
    const leave = () => {
        if (layout === 'tile' || !hasChildNode) return;
        mouseHandle(false);
    };

    return (
        <div
            ref={ref}
            className={[
                'd-sub-item',
                `d-sub-item-${hasChildNode ? 'has' : 'no'}-child`,
                selectedIds.includes(id) && `d-sub-item-active d-sub-item-${layout}`
            ].filter((d) => d).join(' ')}
            onClick={titleClick}
            onMouseEnter={enter}
            onMouseLeave={leave}
        >
            {icon && <section className="d-sub-icon">{icon}</section>}
            <section className={[
                'd-menu-text',
                icon
                    ? `d-menu-text-${hasChildNode ? 'i-c' : 'i'}`
                    : 'd-menu-text-normal'
            ].join(' ')}
            >
                {name}
            </section>
            {hasChildNode && (
                <section
                    className={['d-sub-triangle', (openIds.includes(id) && layout === 'tile') && 'd-sub-triangle-open'].filter((d) => d).join(' ')}
                >
                    <TriangleSvg />
                </section>
            )}
        </div>
    );
};

export default forwardRef(ItemTitle);
