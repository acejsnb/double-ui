import { createContext } from 'react';
import { IItemContext } from './types';

const defaultValue = {
    name: '',
    change() {}
};
const ItemContext = createContext<IItemContext>(defaultValue);
ItemContext.displayName = 'ItemContext';

export default ItemContext;
