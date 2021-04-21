import React from 'react';

import Button from '../components/button/Button';

const ButtonView = () => {
    const click = () => {
        console.log('click');
    };
    return (
        <div className="component-view">
            <Button width={90} click={click}>按钮</Button>
            <Button type="blue" width={120} click={click}>按钮</Button>
        </div>
    );
};

export default ButtonView;
