import React, { useState, useEffect } from 'react';

import Select from '@/components/select/Select';

interface Item {
    id: string
    name: string
    disabled?: boolean
    icon?: boolean
}

const data = [
    { id: '1', name: 'AAA' },
    { id: '2', name: 'BBB' },
    { id: '3', name: 'CCCCCCCCCCCCCCCCCC' },
    { id: '4', name: 'DDD' },
    { id: '5', name: 'EEE' },
    { id: '6', name: 'FFFF' },
    { id: '7', name: 'GGGGGGG' },
    { id: '8', name: 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH', disabled: true },
    { id: '9', name: 'IIIIIIIIIIIIIIIIIII' }
];

const SelectView = () => {
    const [value, setValue] = useState('4');
    const [name, setName] = useState('DDD');
    const [dropData, setDropData] = useState(JSON.parse(JSON.stringify(data)));
    const change = (item: Item) => {
        console.log(item);
        setValue(item.id);
        setName(item.name);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setDropData([...JSON.parse(JSON.stringify(data)), { id: '10', name: 'JJJJJJJJ' }]);
        }, 5000);
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, []);

    const [value2, setValue2] = useState('7');
    const [name2, setName2] = useState('GGGGGGG');
    const [dropData2, setDropData2] = useState(JSON.parse(JSON.stringify(data)));
    const change2 = (item: Item) => {
        console.log(item);
        setValue2(item.id);
        setName2(item.name);
    };
    return (
        <div className="component-view">
            <Select
                title="选择："
                width={180}
                disabled
                value={value}
                data={dropData}
                change={change}
            >
                {name}
            </Select>
            <div style={{ height: `${40}px` }} />
            <Select
                border={false}
                value={value}
                data={dropData}
                change={change}
            >
                {name}
            </Select>

            <div style={{ textAlign: 'right' }}>
                <Select
                    width={180}
                    maxCount={5}
                    value={value2}
                    data={dropData2}
                    reverse
                    // openSearch={true}
                    // disabled={true}
                    placeholder="请搜索哟"
                    change={change2}
                >
                    {name2}
                </Select>
            </div>
            {/* <div style={{ height: '800px' }} /> */}

            <Select
                maxCount={5}
                value=""
                data={dropData2}
                // alignRight={true}
                // openSearch={true}
                // disabled={true}
                placeholder="请搜索哟"
                change={change2}
            >
                {null}
            </Select>
        </div>
    );
};

export default SelectView;
