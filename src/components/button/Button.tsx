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
                'd-button',
                `d-button-${type}`,
                `d-button-${size}`,
                `d-button-${disabled ? 'disabled' : 'normal'}`
            ].join(' ')}
            style={{ width: `${width}px` }}
            onClick={clickHandle}
        >
            <section className="d-button-content">
                <span className="d-button-text">{children}</span>
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
