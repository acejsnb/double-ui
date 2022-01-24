import React, { FC, useState, useCallback } from 'react';
import Button from '@/components/button/build';

const ButtonView: FC = () => {
    const [loading, setLoading] = useState(false);
    const click = useCallback(() => {
        console.log('click');
    }, []);
    const click2 = useCallback(() => {
        setLoading(true);
        console.log('click2');
    }, [loading]);
    return (
        <div className="component-view">
            <Button click={click}>按钮</Button>
            <Button type="blue" loading width={120} click={click}>按钮</Button>
            <Button type="blue" disabled click={click}>按钮</Button>
            <Button type="green" click={click}>按钮</Button>
            <Button type="orange" click={click}>按钮</Button>
            <Button type="red" click={click}>按钮</Button>
            <Button type="word" click={click}>按钮</Button>
            <div>****测试****</div>
            <Button type="green" loading={loading} click={click2}>按钮</Button>
        </div>
    );
};

export default ButtonView;
