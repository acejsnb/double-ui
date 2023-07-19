import './style.styl';
import React, {
    useRef, useState, useEffect, memo
} from 'react';

import IconClose from '@/assets/iconSvg/icon_close_white.svg';
import HintError from '@/assets/iconSvg/hint_error.svg';
import HintInfo from '@/assets/iconSvg/hint_info.svg';
import HintSuccess from '@/assets/iconSvg/hint_success.svg';
import HintWaring from '@/assets/iconSvg/hint_waring.svg';
import { Props } from './index';

enum ETypes {
    info = 'info',
    success = 'success',
    warning = 'warning',
    error = 'error'
}

const strategy = {
    info: () => <HintInfo />,
    success: () => <HintSuccess />,
    warning: () => <HintWaring />,
    error: () => <HintError />
};

const typesArr: string[] = ['info', 'success', 'warning', 'error'];

function MessageBox({
    type, message, time = 3, remove
}: Props) {
    const seconds = time * 1000;
    const msgRef = useRef<HTMLDivElement>(null);
    const [enter, setEnter] = useState(true);
    const [active, setActive] = useState(false);
    useEffect(() => {
        setTimeout(() => { setActive(true); }, 16);
        setTimeout(() => { setEnter(false); }, 316);
        const timer = setTimeout(() => { setActive(false); }, seconds - 300);
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, []);

    return (
        <div
            ref={msgRef}
            className={
                [
                    'd-message',
                    `d-message-${type}`,
                    enter ? 'd-fade-in-down-enter' : 'd-fade-in-down-leave',
                    active ? 'd-fade-in-down-enter-active' : 'd-fade-in-down-leave-active'
                ].join(' ')
            }
        >
            <section className="d-message-hint">{typesArr.includes(type) && strategy[type as keyof typeof ETypes]()}</section>
            <section className="d-message-text">{message}</section>
            <section className="d-message-close" onClick={remove}><IconClose /></section>
        </div>
    );
}
export default memo(MessageBox);
