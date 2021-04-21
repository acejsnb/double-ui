// 传送门
import React, { FC } from 'react';
import { createPortal } from 'react-dom';

let ele: HTMLDivElement;

const Teleport: FC<any> = ({ Component, ...options }) => {
    if (!ele) {
        ele = document.createElement('div');
        ele.style.position = 'absolute';
        ele.style.left = '0';
        ele.style.top = '0';
        ele.style.width = '100%';
        document.body.appendChild(ele);
    }
    /* useLayoutEffect(() => () => {
        unmountComponentAtNode(ele);
        document.body.removeChild(ele);
    }, []); */
    return createPortal(<Component {...options} />, ele);
};

export default Teleport;

