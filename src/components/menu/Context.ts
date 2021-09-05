import { createContext } from 'react';
import { ContextProps, Params } from './types';

const initState = {
    state: {
        selectedIds: [],
        openIds: [],
        collapsed: false,
        click(params: Params) {}
    },
    dispatch() {}
};
const Context = createContext<ContextProps>(initState);

export default Context;
