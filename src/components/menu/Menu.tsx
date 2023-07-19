import './style.styl';
import React, {
    FC, useReducer, useEffect, memo
} from 'react';
import { Props, Reducer } from './index';
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
        const stateOIds = state.openIds ?? [];
        const openIds = (stateOIds.length && stateOIds.join(',') === payload) ? [] : payload.split(',');
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

function Menu({
    selectedIds = [], openIds = [], collapsed, click,
    children
}: Props) {
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
        // listen collapsed
        dispatch({ type: 'collapsed', payload: collapsed });
    }, [collapsed]);

    return (
        <div className={['d-menu', collapsed ? 'd-menu-collapsed' : 'd-menu-normal'].filter((d) => d).join(' ')}>
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        </div>
    );
}

export default memo(Menu);
