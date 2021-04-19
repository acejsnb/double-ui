import React, { useState, useEffect } from 'react';

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
    { id: 'lowerLevel', name: '下级分项下级分项下级分项下级分项下级分项' },
    { id: 'lowerLevel2', name: '下级分项2' },
    { id: 'lowerLevel3', name: '下级分项3' },
    { id: 'lowerLevel4', name: '下级分项4' },
    { id: 'lowerLevel45', name: '下级分项5' },
    { id: 'average', name: '滑动平均滑动平均滑动平均滑动平均滑动平均滑动平均滑动平均滑动平均', disabled: true },
    { id: 'lowerLevel451', name: '下级分项6' }
];

const DropdownView = () => {
    const [value, setValue] = useState('totalEnergy');
    const [name, setName] = useState('总量');
    const [dropData, setDropData] = useState(data);
    const change = (item: Item) => {
        console.log(item);
        setValue(item.id);
        setName(item.name);
    };
    useEffect(() => {
        setTimeout(() => {
            setDropData([...data, {id: 'lowerLevel667', name: '下级分项7'}]);
        }, 5000);
    }, []);
    return (
        <div className="component-view">
            <Dropdown
                value={value}
                data={dropData}
                openSearch={true}
                change={change}
            >{name}</Dropdown>
        </div>
    );
};

export default DropdownView;
