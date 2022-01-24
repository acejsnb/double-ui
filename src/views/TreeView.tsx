import React from 'react';

import Tree from '@/components/tree/build';
import { TileItem, IMultiple } from '../components/tree/index';

const dataArr = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        open: true,
        children: [
            {
                id: '1',
                name: '一级1',
                // open: true,
                children: [
                    { id: '12', name: '二级2' },
                    { id: '121', name: '二级3' },
                    { id: '122', name: '二级4' },
                    {
                        id: '1321',
                        name: '二级1',
                        // open: true,
                        // defaultDisabled: true,
                        children: [
                            { id: '13', name: '三级2' },
                            { id: '131', name: '三级3' },
                            { id: '132', name: '三级4' }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: '一级2',
                children: [
                    { id: '222', name: '二级2' },
                    { id: '2221', name: '二级1' },
                    { id: '2222', name: '二级3' }
                ]
            },
            {
                id: '3',
                name: '一级3',
                children: [
                    { id: '322', name: '二级2' },
                    { id: '3220', name: '二级0' },
                    { id: '3221', name: '二级1' }
                ]
            }
        ]
    }
];

const TreeSelectView = () => {
    const change = (item: TileItem | IMultiple) => {
        console.log('change===', item);
    };
    const openNode = (item: TileItem) => {
        console.log('openNode===', item);
    };
    return (
        <div className="component-view">
            <Tree
                data={dataArr}
                change={change}
                openNode={openNode}
            />
            <div style={{ height: '50px' }} />
            <Tree
                multiple
                omit
                data={dataArr}
                change={change}
                openNode={openNode}
            />
        </div>
    );
};

export default TreeSelectView;
