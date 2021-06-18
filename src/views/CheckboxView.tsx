import React, { useState, useEffect } from 'react';

import Checkbox from '@/components/checkbox/Checkbox';

const CheckboxView = () => {
    const [checked2, setChecked2] = useState('uncheck');
    const change1 = (checked: string) => {
        console.log('checked===', checked);
    };
    const change2 = (checked: string, other: any) => {
        console.log('checked===', checked);
        console.log('other===', other);
        setChecked2(checked);
    };
    useEffect(() => {
        setTimeout(() => {
            setChecked2('checked');
        }, 3000);
    }, []);
    return (
        <div className="component-view">
            {/* <Checkbox checked="checked" change={change1} /> */}
            <Checkbox checked={checked2} change={change2} id="z333">张三</Checkbox>
        </div>
    );
};

export default CheckboxView;
