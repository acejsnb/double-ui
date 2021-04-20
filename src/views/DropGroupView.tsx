import React, { useState } from 'react';

import DropGroup from '../components/dropGroup/DropGroup';

const data = [
    {
        id: 'id_xcxm',
        name: '新城项目',
        children: [
            {
                id: 'xincehng',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目'
            }
        ]
    },
    {
        id: 'id_index',
        name: '首页首页首页首页首页首页首页首页首页首页',
        children: [
            {
                id: 'tencent',
                url: 'https://cloud.tencent.com',
                name: '腾讯云'
            },
            {
                id: 'animate',
                url: 'https://daneden.github.io/animate.css',
                name: 'animate',
                disabled: true
            },
            {
                id: 'aliyun',
                url: 'https://www.aliyun.com/',
                name: '阿里云'
            }
        ]
    }
];
interface Item {
    pid?: string
    id: string
    name?: string
}

const DropGroupView = () => {
    const [value, setValue] = useState('id_index');
    const [name, setName] = useState('首页');
    const change = ({ pid, id, name: cName = '' }: Item): void => {
        setValue(id);
        setName(cName);
    };
    return (
        <div className="component-view">
            <DropGroup
                value={value}
                data={data}
                change={change}
            >
                {name}
            </DropGroup>
        </div>
    );
};

export default DropGroupView;
