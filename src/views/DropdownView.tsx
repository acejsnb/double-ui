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
    const [dropData, setDropData] = useState(JSON.parse(JSON.stringify(data)));
    const change = (item: Item) => {
        console.log(item);
        setValue(item.id);
        setName(item.name);
    };
    useEffect(() => {
        setTimeout(() => {
            setDropData([...JSON.parse(JSON.stringify(data)), { id: 'lowerLevel667', name: '下级分项7' }]);
        }, 5000);
    }, []);

    const [value2, setValue2] = useState('singleParty');
    const [name2, setName2] = useState('单平米');
    const [dropData2, setDropData2] = useState(JSON.parse(JSON.stringify(data)));
    const change2 = (item: Item) => {
        console.log(item);
        setValue2(item.id);
        setName2(item.name);
    };
    return (
        <div className="component-view">
            <Dropdown
                value={value}
                data={dropData}
                change={change}
            >
                {name}
            </Dropdown>

            <div style={{ textAlign: 'right' }}>
                <Dropdown
                    maxWidth={240}
                    maxCount={5}
                    value={value2}
                    data={dropData2}
                    alignRight
                    // openSearch={true}
                    triangle={false}
                    // disabled={true}
                    placeholder="请搜索哟"
                    change={change2}
                >
                    {name2}
                </Dropdown>
            </div>
            <div style={{ height: '800px' }} />

            <Dropdown
                maxWidth={240}
                maxCount={5}
                value={value2}
                data={dropData2}
                // alignRight={true}
                // openSearch={true}
                triangle={false}
                // disabled={true}
                placeholder="请搜索哟"
                change={change2}
            >
                {name2}
            </Dropdown>
        </div>
    );
};

export default DropdownView;
