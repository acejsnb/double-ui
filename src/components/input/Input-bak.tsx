import './style.styl';
import React, { FC, FormEvent } from 'react';

import { Props } from './types';

const Input: FC<Props> = ({
    type = 'text', placeholder = '请输入', maxLength = 20,
    width = 120, disabled = false,
    input, change, errText = ''
}) => {
    const inputHandle = (e: FormEvent) => {
        input?.((e.target as HTMLInputElement).value);
    };
    const changeHandle = (e: FormEvent) => {
        change?.((e.target as HTMLInputElement).value);
    };
    return (
        <div className={['d-input', `d-input-${disabled ? 'disabled' : 'normal'}`].join(' ')} style={{ width: `${width}px` }}>
            <input
                className="d-input-el"
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
                onInput={inputHandle}
                onChange={changeHandle}
            />
            {errText && <span className="d-input-err">{errText}</span>}
        </div>
    );
};

export default Input;
