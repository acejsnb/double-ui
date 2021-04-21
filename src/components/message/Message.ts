import './style.styl';
import { createElement } from 'react';
import { render } from 'react-dom';
import MessageBox from './MessageBox';

interface Options {
    message: string
    type: string
    time?: number
}


let msgBox: HTMLDivElement;
const Message = ({ type, message, time = 3.6 }: Options) => {
    if (!msgBox) {
        msgBox = document.createElement('div');
        msgBox.className = 'd-message-box';
        document.body.appendChild(msgBox);
    }
    (() => {
        const span: HTMLSpanElement = document.createElement('span');
        span.style.marginBottom = '24px';
        msgBox.appendChild(span);
        let timer: any;
        const remove = () => {
            if (timer) clearTimeout(timer);
            if (span) msgBox.removeChild(span);
        };

        render(createElement(MessageBox, {
            type, message, time, remove
        }), span);
        timer = setTimeout(remove, time * 1000);
    })();
};

const separate = (type: string) => (message: string, time: number) => Message({
    type,
    message,
    time
});

Message.info = separate('info');
Message.success = separate('success');
Message.warning = separate('warning');
Message.error = separate('error');

export default Message;
