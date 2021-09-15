import React, { FC, useCallback, useContext } from 'react';
import Context from '@/components/menu/Context';
import { ItemProps } from './types';

const MenuItem: FC<ItemProps> = ({
    id = '', menuId,
    params = {},
    children
}) => {
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
};

export default MenuItem;
