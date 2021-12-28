import {
    Props as TProps, TileItem, Item, IMultiple
} from '../tree';

export type { Item, TileItem, IMultiple };

export interface Props extends TProps{
    name?: string
    disabled?: boolean
}

declare function TreeSelect(props: Props): JSX.Element

export default TreeSelect;
