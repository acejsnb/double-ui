import './style.styl';
import React from 'react';

type Fn = () => void;

interface Props {
    type?: string
    size?: string
    disabled?: boolean
    width?: string
    children?: any
    click?: Fn
}

const Button = (props: Props) => {
    const {
        type, size, disabled = false, width, children, click
    } = props;
    const clickHandle = (): void => {
        if (click) click();
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
            onClick={clickHandle}
        >
            <section className="d-btn-content">
                <span className="d-btn-text">{children}</span>
            </section>
        </div>
    );
};

Button.defaultProps = {
    type: 'default',
    size: 'medium',
    disabled: false,
    width: '80',
    children: 'button',
    click: () => {}
};

export default Button;
