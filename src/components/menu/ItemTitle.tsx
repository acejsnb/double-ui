import React, { ForwardRefRenderFunction, useContext, forwardRef } from 'react';
import TriangleSvg from '@/assets/iconSvg/triangle.svg';
import Context from './Context';
import { ItemTitleProps } from './types';

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
            dispatch({ type: 'open', payload: menuId });
        } else {
            dispatch({ type: 'selected', payload: `${menuId},${id}` });
            click?.({ id, ...params });
        }
    };
    // 鼠标移入移除
    const enter = () => {
        if (layout === 'tile') return;
        mouseHandle(true);
    };
    const leave = () => {
        if (layout === 'tile') return;
        mouseHandle(false);
    };

    return (
        <div
            ref={ref}
            className={[
                'd-sub-item',
                hasChildNode ? 'd-sub-item-has-child' : 'd-sub-item-no-child',
                selectedIds.includes(id) && `d-sub-item-active d-sub-item-active-${layout}`,
                (selectedIds.includes(id) && !hasChildNode) && 'd-sub-item-selected'
            ].filter((d) => d).join(' ')}
            onClick={titleClick}
            onMouseEnter={enter}
            onMouseLeave={leave}
        >
            {icon && <section className="d-sub-icon">{icon}</section>}
            <section className="d-menu-text">{name}</section>
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
