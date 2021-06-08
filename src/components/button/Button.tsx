import './style.styl';
import React, { FC } from 'react';
import { Props } from './types';

const Button: FC<Props> = ({
    type = 'default',
    size = 'medium',
    disabled = false,
    width = 80,
    children,
    click = () => {}
}) => (
    <div
        className={[
            'd-btn',
            `d-btn-${type}`,
            `d-btn-${size}`,
            `d-btn-${disabled ? 'disabled' : 'normal'}`
        ].join(' ')}
        style={{ width: `${width}px` }}
        onClick={click}
    >
        <section className="d-btn-content">
            <span className="d-btn-text">{children}</span>
        </section>
    </div>
);

export default Button;
