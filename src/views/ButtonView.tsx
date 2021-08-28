import React, { FC } from 'react';
import Button from '@/components/button';

const ButtonView: FC = () => {
    const click = () => {
        console.log('click');
    };
    return (
        <div className="component-view">
            <Button click={click}>按钮</Button>
            <Button type="blue" loading width={120} click={click}>按钮</Button>
            <Button type="blue" disabled click={click}>按钮</Button>
            <Button type="green" click={click}>按钮</Button>
            <Button type="orange" click={click}>按钮</Button>
            <Button type="red" click={click}>按钮</Button>
            <Button type="word" click={click}>按钮</Button>
        </div>
    );
};

export default ButtonView;
