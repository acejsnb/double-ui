import {
    Props as TProps, TileItem, Item, IMultiple
} from '@/components/tree/types';

export type { Item, TileItem, IMultiple };

export interface Props extends TProps{
    disabled?: boolean
}
