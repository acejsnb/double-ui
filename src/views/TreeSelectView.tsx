import React, { useState } from 'react';

import TreeSelect from '@/components/treeSelect';
import { TileItem, IMultiple } from '@/components/tree/types';
import GlobalPng from '@/assets/images/global.png';
import BuildingPng from '@/assets/images/building.png';

const dataArr = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        open: true,
        icon: GlobalPng,
        children: [
            {
                id: '1',
                name: '一级1',
                // open: true,
                icon: BuildingPng,
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

const TreeView = () => {
    const [value] = useState('1');
    const change = (item: TileItem | IMultiple) => {
        console.log('change===', item);
    };
    const openNode = (item: TileItem) => {
        console.log('openNode===', item);
    };
    return (
        <div className="component-view">
            <TreeSelect value={value} name="一级1" data={dataArr} change={change} />
            <div style={{ height: '50px' }} />
        </div>
    );
};

export default TreeView;
