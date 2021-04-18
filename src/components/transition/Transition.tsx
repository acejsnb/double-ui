import React, { useState, cloneElement, useLayoutEffect } from 'react';

interface Props {
    show: boolean
    classHidden: string
    classPrefix: string
    children: any
}

// 自定义下拉弹窗动画
const Transition = (props: Props) => {
    const { show, classHidden, classPrefix, children } = props;
    const oldClassName = children.props.className;
    const [className, setClassName] = useState(oldClassName)
    useLayoutEffect(() => {
        if (show) {
            setClassName(`${oldClassName} ${classPrefix}-enter`);
            setTimeout(() => {
                setClassName(`${oldClassName} ${classPrefix}-enter ${classPrefix}-enter-active`);
                setTimeout(() => { setClassName(`${oldClassName} ${classPrefix}-leave`); }, 300);
            }, 1000 / 60);
        } else {
            setClassName(`${oldClassName} ${classPrefix}-leave ${classPrefix}-leave-active`);
            setTimeout(() => {
                setClassName(`${oldClassName} ${classPrefix}-enter ${classHidden}`);
            }, 300);
        }
    }, [show]);
    return (
        <>{cloneElement(children, { className })}</>
    )
};

export default Transition;
