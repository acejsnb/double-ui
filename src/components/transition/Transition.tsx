// 过度组件
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import ClickOutside from '@/utils/ClickOutside';
import { Props } from './types';

// 自定义下拉弹窗动画
const Transition: FC<Props> = ({
    show = false, setShow, timeout, classPrefix, children
}) => {
    // 关闭下拉弹窗
    const closeDrop = () => {
        setShow(false);
    };
    const clickOutside = (e: MouseEvent) => {
        console.log(e);
        const c = (children as PropsWithChildren<any>);
        if (!c.ref) return;
        ClickOutside(e, c.ref.current, closeDrop);
    };

    useEffect(() => {
        // 注册window事件
        window.addEventListener('click', clickOutside, true);
        window.addEventListener('blur', closeDrop, true);
        return () => {
            window.removeEventListener('click', clickOutside, true);
            window.removeEventListener('blur', closeDrop, true);
        };
    }, []);

    return (
        <CSSTransition
            in={show}
            timeout={timeout}
            classNames={classPrefix}
        >
            {children}
        </CSSTransition>
    );
};

export default Transition;
