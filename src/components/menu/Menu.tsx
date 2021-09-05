import './style.styl';
import React, { FC, useReducer, useEffect } from 'react';
import { Props, Reducer } from './types';
import Context from './Context';

const reducer: Reducer = (state, { type, payload }) => {
    switch (type) {
    case 'selectedIds':
        return { ...state, selectedIds: payload };
    case 'openIds':
        return { ...state, openIds: payload };
    case 'collapsed':
        return { ...state, collapsed: payload };
    case 'open': {
        const openIds = state.openIds.join(',') === payload ? [] : payload.split(',');
        return { ...state, openIds };
    }
    case 'selected': {
        const selectedIds = payload.split(',');
        return { ...state, selectedIds };
    }
    default:
        return state;
    }
};

let DUI_MENU_TIMER: number;

const Menu: FC<Props> = ({
    selectedIds = [], openIds = [], collapsed, click,
    children
}) => {
    const [state, dispatch] = useReducer(reducer, {
        selectedIds, openIds, collapsed, click
    });
    useEffect(() => {
        if (DUI_MENU_TIMER) window.clearTimeout(DUI_MENU_TIMER);
        DUI_MENU_TIMER = window.setTimeout(() => {
            dispatch({ type: 'selectedIds', payload: selectedIds });
            dispatch({ type: 'openIds', payload: openIds });
        }, 120);

        return () => window.clearTimeout(DUI_MENU_TIMER);
    }, [selectedIds, openIds]);
    useEffect(() => {
        dispatch({ type: 'collapsed', payload: collapsed });
    }, [collapsed]);

    return (
        <div className={['d-menu', collapsed && 'd-menu-collapsed'].filter((d) => d).join(' ')}>
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        </div>
    );
};

export default Menu;