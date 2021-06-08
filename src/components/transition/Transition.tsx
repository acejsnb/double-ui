// 过度组件
import React, {
    FC, useState, cloneElement, useLayoutEffect
} from 'react';

import ClickOutside from '@/utils/ClickOutside';

import { Props } from './types';

// 自定义下拉弹窗动画
const Transition: FC<Props> = ({
    show = false, setShow, classHidden, classPrefix, children
}) => {
    const oldClassName = children.props.className;
    const [className, setClassName] = useState(oldClassName);
    const cloneChildren: any = cloneElement(children, { className });
    // 关闭下拉弹窗
    const closeDrop = () => { setShow(false); };
    const clickOutside = (e: Event) => {
        ClickOutside(e, cloneChildren.ref.current, closeDrop);
    };

    useLayoutEffect(() => {
        if (show) {
            setClassName(`${oldClassName} ${classPrefix}-enter`);
            setTimeout(() => {
                setClassName(`${oldClassName} ${classPrefix}-enter ${classPrefix}-enter-active`);
                setTimeout(() => { setClassName(`${oldClassName} ${classPrefix}-leave`); }, 300);
                // 注册window事件
                window.addEventListener('click', clickOutside, true);
                window.addEventListener('blur', closeDrop, false);
            }, 16);
        } else {
            setClassName(`${oldClassName} ${classPrefix}-leave ${classPrefix}-leave-active`);
            setTimeout(() => {
                setClassName(`${oldClassName} ${classPrefix}-enter ${classHidden}`);
            }, 300);
        }
        return () => {
            window.removeEventListener('click', clickOutside);
            window.removeEventListener('blur', closeDrop);
        };
    }, [show]);

    return cloneChildren;
};

export default Transition;
