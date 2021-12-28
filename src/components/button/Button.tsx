import './style.styl';
import React, { FC, memo } from 'react';
import LoadingSvg from '@/assets/iconSvg/loading.svg';
import { Props } from './index';

const Button: FC<Props> = ({
    type = 'default',
    size = 'medium',
    htmlType, // form表单按钮类型
    disabled = false,
    loading = false,
    width = 0,
    className,
    children,
    click = () => {}
}) => {
    const btnClick = () => {
        if (disabled || loading || htmlType) return;
        click();
    };
    return (
        <button
            className={[
                'd-btn',
                `d-btn-${type}`,
                `d-btn-${size}`,
                `d-btn-${disabled ? 'disabled' : 'normal'}`,
                className
            ].join(' ')}
            style={width ? { width: `${width}px` } : {}}
            onClick={btnClick}
            type={htmlType ?? 'button'}
        >
            <section className="d-btn-content">
                {loading && <span className="d-btn-loading"><LoadingSvg /></span>}
                <span className="d-btn-text">{children}</span>
            </section>
        </button>
    );
};

export default memo(Button);
