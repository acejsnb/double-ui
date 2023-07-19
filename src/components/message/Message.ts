import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
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
        msgEle.appendChild(span);
        const root = createRoot(span);
        let timer: any;
        const remove = () => {
            if (timer) clearTimeout(timer);
            if (span) msgEle.removeChild(span);
            root.unmount();
        };

        root.render(createElement(MessageBox, {
            type, message, time, remove, zIndex: 900 + msgEle.children.length
        }));
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
