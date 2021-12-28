import { createContext } from 'react';
import { IItemContext } from './index';

const defaultValue = {
    name: '',
    change() {}
};
const ItemContext = createContext<IItemContext>(defaultValue);
ItemContext.displayName = 'ItemContext';

export default ItemContext;
