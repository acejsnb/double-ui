import React from 'react';

import Button from '@/components/button/Button';

const ButtonView = () => {
    const click = () => {
        console.log('click');
    };
    return (
        <div className="component-view">
            <Button width={90} click={click}>按钮</Button>
            <Button type="blue" loading width={120} click={click}>按钮</Button>
            <Button type="blue" disabled width={120} click={click}>按钮</Button>
        </div>
    );
};

export default ButtonView;
