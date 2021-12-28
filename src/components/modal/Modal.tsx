import './style.styl';
import React, {
    FC, memo, useEffect, useRef, useState
} from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '@/components/button/Button';
import Teleport from '@/components/teleport/Teleport';
import CloseSvg from '@/assets/iconSvg/icon_close.svg';
import { Props } from './index';
import ListenEsc from './Tools';
import Tip from './Tip';


const Modal: FC<Props> = ({
    show, esc = false, shade = false, confirmBtnLoading, header = true, footer = true,
    title,
    mode = 'default',
    type,
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
                        {
                            mode === 'tip'
                                ? (
                                    <Tip title={title} type={type} />
                                )
                                : (
                                    header && (
                                        typeof header === 'boolean'
                                            ? (
                                                <header className="d-modal-header">
                                                    <section className="d-modal-title">{title}</section>
                                                    <span className="d-modal-icon" onClick={close}><CloseSvg /></span>
                                                </header>
                                            )
                                            : header
                                    )
                                )
                        }
                        <main className="d-modal-main d-modal-main-mh" ref={refMain}>{children}</main>
                        {
                            footer && (
                                <footer className={['d-modal-footer', hasShade && 'd-modal-footer-bs'].join(' ')}>
                                    {
                                        typeof footer === 'boolean' ? (
                                            <>
                                                <Button click={close}>取消</Button>
                                                <Button type="blue" loading={confirmBtnLoading} click={confirm}>确定</Button>
                                            </>
                                        ) : footer
                                    }
                                </footer>
                            )
                        }
                    </div>
                </div>
            </CSSTransition>
        </Teleport>
    );
};

export default memo(Modal);
