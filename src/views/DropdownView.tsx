import React, { useState } from 'react';

import Dropdown from '../components/dropdown/Dropdown';

interface Item {
    id: string
    name: string
    disabled?: boolean
    icon?: boolean
}

const data = [
    { id: 'totalEnergy', name: '总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项' },
    { id: 'lowerLevel2', name: '下级分项2' },
    { id: 'lowerLevel3', name: '下级分项3' },
    { id: 'lowerLevel4', name: '下级分项4' },
    { id: 'lowerLevel45', name: '下级分项5' },
    { id: 'average', name: '滑动平均滑动平均滑动平均滑动平均', disabled: true },
    { id: 'lowerLevel451', name: '下级分项6' }
];

const DropdownView = () => {
    const [value, setValue] = useState('totalEnergy');
    const [name, setName] = useState('总量');
    const change = (item: Item) => {
        console.log(item);
        setValue(item.id);
        setName(item.name);
    };
    return (
        <div className="component-view">
            <Dropdown value={value} data={data} change={change}>{name}</Dropdown>
        </div>
    );
};

export default DropdownView;
