// 传送门
import React, {
    FC, useRef, useEffect, PropsWithChildren
} from 'react';
import { createPortal } from 'react-dom';
import ClickOutside from '@/utils/ClickOutside';
import { Props } from './types';

const Teleport: FC<Props> = ({ isMounted, setShow, children }) => {
    const el = useRef<HTMLDivElement>(document.createElement('div'));
    // 关闭下拉弹窗
    const closeDrop = () => {
        setShow?.(false);
    };
    const clickOutside = (e: MouseEvent) => {
        const c = (children as PropsWithChildren<any>);
        if (!c.ref) return;
        ClickOutside(e, c.ref.current, closeDrop);
    };
    useEffect(() => {
        if (isMounted) {
            document.body.appendChild(el.current);
            if (setShow) {
                el.current.style.position = 'absolute';
                el.current.style.left = '0';
                el.current.style.top = '0';
                // 注册window事件
                window.addEventListener('click', clickOutside, true);
                window.addEventListener('blur', closeDrop, false);
            }
        }
        return () => {
            if (isMounted && setShow) {
                window.removeEventListener('click', clickOutside, true);
                window.removeEventListener('blur', closeDrop, false);
                document.body.removeChild(el.current);
            }
        };
    }, [isMounted]);

    return isMounted ? createPortal(children, el.current) : null;
};

export default Teleport;
