import './style.styl';
import React, { FC } from 'react';
import LoadingSvg from '@/assets/iconSvg/loading.svg';
import { Props } from './types';

const Button: FC<Props> = ({
    type = 'default',
    size = 'medium',
    htmlType, // form表单按钮类型
    disabled = false,
    loading = false,
    width = 0,
    children,
    click = () => {},
    cancel, reset, submit
}) => {
    const handle = {
        button: cancel, reset, submit
    };
    // const btnClick = (e: MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    const btnClick = () => {
        if (disabled || loading) return;
        if (htmlType) {
            handle[htmlType]?.();
        } else {
            click();
        }
    };
    return (
        <button
            className={[
                'd-btn',
                `d-btn-${type}`,
                `d-btn-${size}`,
                `d-btn-${disabled ? 'disabled' : 'normal'}`
            ].join(' ')}
            style={width ? { width: `${width}px` } : {}}
            onClick={btnClick}
            type="button"
        >
            <section className="d-btn-content">
                {loading && <span className="d-btn-loading"><LoadingSvg /></span>}
                <span className="d-btn-text">{children}</span>
            </section>
        </button>
    );
};

export default Button;
