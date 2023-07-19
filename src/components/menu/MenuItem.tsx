import React, { useCallback, useContext } from 'react';
import Context from './Context';
import { ItemProps } from './index';

function MenuItem({
    id = '', menuId,
    params = {},
    children
}: ItemProps) {
    const { state: { selectedIds, click }, dispatch } = useContext(Context);
    const itemClick = useCallback(() => {
        dispatch({ type: 'selected', payload: `${menuId},${id}` });
        click?.({ id, ...params });
    }, [menuId, id, params]);

    return (
        <div className={['d-menu-item', selectedIds.includes(id) && 'd-menu-item-active'].filter((d) => d).join(' ')} onClick={itemClick}>
            <div className="d-menu-text">{children}</div>
        </div>
    );
}

export default MenuItem;
