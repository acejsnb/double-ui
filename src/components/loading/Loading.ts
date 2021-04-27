import { createElement } from 'react';
import { render } from 'react-dom';
import LoadingBox from './LoadingBox';

interface Options {
    width?: number
    height?: number
    ele?: HTMLElement | null | undefined
}
interface IOptions extends Options {
    type: string
}

let loadingEle: HTMLElement | undefined;
const Loading = ({
    width, height, type, ele
}: IOptions) => {
    const isLocal = type === 'local' && ele instanceof HTMLElement;
    if (ele && isLocal) {
        loadingEle = ele;
    } else {
        loadingEle = document.createElement('div');
        document.body.appendChild(loadingEle);
    }
    const span: HTMLSpanElement = document.createElement('span');
    if (loadingEle) loadingEle.appendChild(span);
    let timer: any;
    const close = () => {
        if (timer) clearTimeout(timer);
        if (span && loadingEle) loadingEle.removeChild(span);
    };
    render(createElement(LoadingBox, { width, height, type }), span);
    return { close };
};

Loading.global = () => Loading({ width: 60, height: 60, type: 'global' });
Loading.local = (ele: HTMLElement | null) => Loading({
    width: 60, height: 60, ele, type: 'local'
});

export default Loading;
