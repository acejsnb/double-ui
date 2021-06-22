import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import LoadingBox from './LoadingBox';
import { IOptions, TLoading } from './types';

const Loading: TLoading = ({
    type, size, ele, imgSrc
}: IOptions) => {
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
};

// @ts-ignore
Loading.global = (imgSrc: string) => Loading({ type: 'global', imgSrc });
// @ts-ignore
Loading.local = (ele?: Element | DocumentFragment | null, imgSrc: string) => Loading({
    type: 'local', ele, imgSrc
});

export default Loading;
