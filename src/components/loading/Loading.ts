import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import LoadingBox from './LoadingBox';
import { IOptions, IReturn } from './types';

function Loading({
    imgSrc, type, size, ele
}: IOptions): IReturn {
    const loadingEle: HTMLDivElement = document.createElement('div');
    const isLocal = type === 'local' && ele instanceof HTMLElement;
    if (ele && isLocal) ele.appendChild(loadingEle);
    else document.body.appendChild(loadingEle);
    const close = () => {
        unmountComponentAtNode(loadingEle);
        (loadingEle.parentNode as HTMLElement).removeChild(loadingEle);
    };
    render(createElement(LoadingBox, { type, size, imgSrc }), loadingEle);
    return { close };
}

Loading.global = (imgSrc: string) => Loading({ type: 'global', imgSrc });
Loading.local = (imgSrc: string, ele?: Element | DocumentFragment | null) => Loading({
    type: 'local', ele, imgSrc
});

export default Loading;
