import './style.styl';
import React, { FC } from 'react';
import LoadingSvg from '@/assets/iconSvg/loading.svg';
import { Props } from './types';

const Button: FC<Props> = ({
    type = 'default',
    size = 'medium',
    handleType = '', // form表单按钮类型
    disabled = false,
    loading = false,
    width = 80,
    children,
    click = () => {},
    cancel = () => {},
    reset = () => {},
    confirm = () => {}
}) => {
    const handle = {
        cancel, reset, confirm
    };
    return (
        <div
            className={[
                'd-btn',
                `d-btn-${type}`,
                `d-btn-${size}`,
                `d-btn-${disabled ? 'disabled' : 'normal'}`
            ].join(' ')}
            style={{ width: `${width}px` }}
            onClick={() => {
                if (disabled || loading) return;
                if (handleType) {
                    handle[handleType]?.();
                } else {
                    click();
                }
            }}
        >
            <section className="d-btn-content">
                {loading && <span className="d-btn-loading"><LoadingSvg /></span>}
                <span className="d-btn-text">{children}</span>
            </section>
        </div>
    );
};

export default Button;
