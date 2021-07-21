import './style.styl';
import React, {
    FC, useEffect, useRef, useState
} from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '@/components/button/Button';
import Teleport from '@/components/teleport/Teleport';
import CloseSvg from '@/assets/iconSvg/icon_close.svg';
import { Props } from './types';
import ListenEsc from './Tools';


const Modal: FC<Props> = ({
    show, esc = false, shade = false, footer = true,
    title, mode = 'default',
    close, confirm,
    children
}) => {
    const refMain = useRef<HTMLElement>(null);
    const [isMounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [hasShade, setHasShade] = useState(false);

    useEffect(() => {
        if (!isMounted && show) setMounted(true);
        Promise.resolve().then(() => {
            setVisible(show);
        });
        const { clientHeight = 0, scrollHeight = 0 } = (refMain?.current as HTMLElement) || {};
        setHasShade((scrollHeight > clientHeight));
    }, [show]);
    useEffect(() => {
        const { clientHeight = 0, scrollHeight = 0 } = (refMain?.current as HTMLElement) || {};
        setHasShade((scrollHeight > clientHeight));
    }, [visible]);

    // 监听esc
    const listenEsc = (e: KeyboardEvent) => {
        ListenEsc(e, close);
    };
    useEffect(() => {
        if (esc) window.addEventListener('keyup', listenEsc, false);
        return () => {
            if (esc) window.removeEventListener('keyup', listenEsc, false);
        };
    }, []);

    return (
        <Teleport isMounted={isMounted}>
            <CSSTransition in={visible} timeout={120} unmountOnExit><div className="d-modal-shade" onClick={close} /></CSSTransition>
            <CSSTransition in={visible} timeout={120} classNames="d-modal-transition">
                <div className="d-modal">
                    <div className={['d-modal-container', `d-modal-container-${mode}`].join(' ')}>
                        <header className="d-modal-header">
                            <section className="d-modal-title">{title}</section>
                            <span className="d-modal-icon" onClick={close}><CloseSvg /></span>
                        </header>
                        <main className="d-modal-main d-modal-main-mh" ref={refMain}>{children}</main>
                        {
                            (typeof footer === 'boolean' && footer)
                                && (
                                    <footer className={['d-modal-footer', hasShade && 'd-modal-footer-bs'].join(' ')}>
                                        <Button click={close}>取消</Button>
                                        <Button type="blue" click={confirm}>确定</Button>
                                    </footer>
                                )
                        }
                    </div>
                </div>
            </CSSTransition>
        </Teleport>
    );
};

export default Modal;
