import './style.styl';
import React, {
    FC, FormEvent, useEffect, useState
} from 'react';
import { Props } from './types';

const Input: FC<Props> = ({
    defaultValue = '',
    type = 'text', placeholder = '请输入', maxLength = 20,
    disabled = false,
    input, message = '',
    isReset = false, setValue
}) => {
    // 输入框的值
    const [inputValue, setInputValue] = useState('');
    // input input事件触发
    let timer: number;
    const inputHandle = (e: FormEvent) => {
        const v = (e.target as HTMLInputElement).value;
        setInputValue(v);
        input?.(v);
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            setValue?.((e.target as HTMLInputElement).value);
        }, 300);
    };

    useEffect(() => {
        // 重置input的值
        // if (isReset && inputValue) {
        if (inputValue) {
            setInputValue('');
            setValue?.('');
        }
    }, [isReset]);
    useEffect(() => {
        // 初始化input的值
        if (defaultValue) {
            setInputValue(defaultValue);
            setValue?.(defaultValue);
        }
    }, []);

    return (
        <span className={['d-input', `d-input-${disabled ? 'disabled' : 'normal'}`, message && 'd-input-err'].join(' ')}>
            <input
                className="d-input-el"
                value={inputValue}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
                onInput={inputHandle}
            />
            {message && <span className="d-input-err-text">{message}</span>}
        </span>
    );
};

export default Input;
