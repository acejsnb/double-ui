import { createElement } from 'react';
import { render } from 'react-dom';
import MessageBox from './MessageBox';
import { Options } from './index';

let msgEle: HTMLDivElement;
function Message({ type, message, time = 3.6 }: Options): void {
    if (!msgEle) {
        msgEle = document.createElement('div');
        msgEle.className = 'd-message-box';
        document.body.appendChild(msgEle);
    }
    (() => {
        const span: HTMLSpanElement = document.createElement('span');
        span.style.marginBottom = '24px';
        msgEle.appendChild(span);
        let timer: any;
        const remove = () => {
            if (timer) clearTimeout(timer);
            if (span) msgEle.removeChild(span);
        };

        render(createElement(MessageBox, {
            type, message, time, remove
        }), span);
        timer = setTimeout(remove, time * 1000);
    })();
}

const separate = (type: string) => (message: string, time?: number) => Message({
    type,
    message,
    time
});

Message.info = separate('info');
Message.success = separate('success');
Message.warning = separate('warning');
Message.error = separate('error');

export default Message;
