import React, { useState, cloneElement, useEffect, useLayoutEffect } from 'react';

import ClickOutside from "@/utils/ClickOutside";

interface Props {
    show: boolean
    setShow: (show: boolean) => void
    classHidden: string
    classPrefix: string
    children: any
}

// 自定义下拉弹窗动画
const Transition = (props: Props) => {
    const { show, setShow, classHidden, classPrefix, children } = props;
    const oldClassName = children.props.className;
    const [className, setClassName] = useState(oldClassName);
    useLayoutEffect(() => {
        if (show) {
            setClassName(`${oldClassName} ${classPrefix}-enter`);
            setTimeout(() => {
                setClassName(`${oldClassName} ${classPrefix}-enter ${classPrefix}-enter-active`);
                setTimeout(() => { setClassName(`${oldClassName} ${classPrefix}-leave`); }, 300);
            }, 16);
        } else {
            setClassName(`${oldClassName} ${classPrefix}-leave ${classPrefix}-leave-active`);
            setTimeout(() => {
                setClassName(`${oldClassName} ${classPrefix}-enter ${classHidden}`);
            }, 300);
        }
    }, [show]);
    const cloneChildren: any = cloneElement(children, { className });
    // 关闭下拉弹窗
    const closeDrop = () => {setShow(false);};
    const clickOutside = (e: any) => {
        ClickOutside(e, cloneChildren.ref.current, closeDrop);
    };

    useEffect(() => {
        if (show) {
            window.setTimeout(() => {
                window.addEventListener('click', clickOutside, false);
                window.addEventListener('blur', closeDrop, false);
            }, 16)
        }
        return () => {
            window.removeEventListener('click', clickOutside);
            window.removeEventListener('blur', closeDrop);
        }
    }, [show]);
    return (
        <>{cloneChildren}</>
    )
};

export default Transition;
