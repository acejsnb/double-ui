import './style.styl';
import React, {
    FC, FormEvent, useEffect, memo
} from 'react';
import { Props } from './types';

const Input: FC<Props> = ({
    defaultValue = '',
    type = 'text', placeholder = '请输入', maxLength = 20,
    disabled = false, isReset = false,
    change,
    message = '',
    name = ''
}) => {
    // input change事件触发
    const changeHandle = (e: FormEvent) => {
        const v = (e.target as HTMLInputElement).value;
        change?.(v);
    };

    useEffect(() => {
        if (isReset) change?.('');
    }, [isReset]);

    useEffect(() => {
        if (defaultValue) change?.(defaultValue);
    }, [defaultValue]);

    return (
        <span className={['d-input', `d-input-${disabled ? 'disabled' : 'normal'}`, message && 'd-input-err'].join(' ')}>
            <input
                className="d-input-el"
                defaultValue={defaultValue}
                name={name}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
                onChange={changeHandle}
            />
            {message && <span className="d-input-err-text">{message}</span>}
        </span>
    );
};

export default memo(Input);
