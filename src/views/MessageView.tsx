import React from 'react';

import Button from '@/components/button/Button';
import Message from '@/components/message/Message';
// import Message from '@/components/message/MessageBox';

const MessageView = () => {
    const click = () => {
        console.log('click');
        // console.log(Message);
        Message.success('success', 5);
        /* Message({
            message: 'aaaaaaaaaaaa',
            type: 'success',
            time: 5
        }); */
    };
    return (
        <div className="component-view">
            <Button width={90} click={click}>按钮</Button>
        </div>
    );
};

export default MessageView;
