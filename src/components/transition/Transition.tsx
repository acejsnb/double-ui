// 过度组件
import React, {
    useState, cloneElement, useLayoutEffect
} from 'react';

import ClickOutside from '@/utils/ClickOutside';

interface Props {
    show: boolean
    setShow: (show: boolean) => void
    classHidden: string
    classPrefix: string
    children: any
}

// 自定义下拉弹窗动画
const Transition = (props: Props) => {
    const {
        show = false, setShow, classHidden, classPrefix, children
    } = props;
    const oldClassName = children.props.className;
    const [className, setClassName] = useState(oldClassName);
    useLayoutEffect(() => {
        if (show) {
            setClassName(`${oldClassName} ${classPrefix}-enter`);
            setTimeout(() => {
                setClassName(`${oldClassName} ${classPrefix}-enter ${classPrefix}-enter-active`);
                setTimeout(() => { setClassName(`${oldClassName} ${classPrefix}-leave`); }, 300);
                // 注册window事件
                window.addEventListener('click', clickOutside, false);
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
    const cloneChildren: any = cloneElement(children, { className });
    // 关闭下拉弹窗
    const closeDrop = () => { setShow(false); };
    const clickOutside = (e: any) => {
        ClickOutside(e, cloneChildren.ref.current, closeDrop);
    };

    return (
        <>{cloneChildren}</>
    );
};

/* Transition.defaultProps = {
    show: false,
    setShow: () => {},
    classHidden: '',
    classPrefix: '',
    children: ''
}; */

export default Transition;
