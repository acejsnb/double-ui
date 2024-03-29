import React from 'react';

import Button from '@/components/button/build';
import Message from '@/components/message/build';

function MessageView() {
    const info = () => {
        Message.info('aaaaaaaaaaaa', 5);
    };
    const success = () => {
        Message.success('success', 5);
    };
    const warning = () => {
        Message.warning('warning', 5);
    };
    const error = () => {
        Message.error('error', 10);
    };
    return (
        <div className="component-view">
            <Button type="blue" click={info}>info</Button>
            <Button type="green" click={success}>success</Button>
            <Button type="orange" click={warning}>warning</Button>
            <Button type="red" click={error}>error</Button>
        </div>
    );
}

export default MessageView;
