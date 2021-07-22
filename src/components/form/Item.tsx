import React, {
    FC,
    useEffect, useState,
    Children, cloneElement
} from 'react';
import Validate from './Validate';
import { ItemProps, TChild } from './types';

const Item: FC<ItemProps> = ({
    children,
    label, name = '', confirm = '',
    className,
    rules = [],
    setParam,
    cancel, reset, submit,
    checkName,
    setCheckName,
    isReset,
    getFieldValue
}) => {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    // 当input输入的值改变后提交value
    useEffect(() => {
        if (name) {
            setParam?.(name, value, !!Validate({ rules, value, getFieldValue }), confirm);
            setMessage('');
        }
    }, [value]);

    // 验证成功
    const success = (value: string) => {
        setParam?.(name, value, true, confirm);
        setMessage('');
    };
    // 验证失败
    const fail = (value: string, message?: string) => {
        setParam?.(name, value, false, confirm);
        setMessage(message || '');
    };
    // 点击确定按钮 执行验证
    useEffect(() => {
        if (checkName) {
            Validate({
                rules, value, success, fail, getFieldValue
            });
            Promise.resolve().then(() => {
                setCheckName?.('');
            });
        }
    }, [checkName]);

    return (
        <div className={['d-form-item', className && className].join(' ')}>
            {label && <div className="d-form-item-label">{label}</div>}
            {Children.map(children, (child) => cloneElement(child as TChild, {
                isReset,
                value,
                setValue,
                message,
                cancel,
                reset,
                submit
            }))}
            {/* {message && <div className="d-form-item-message">{message}</div>} */}
        </div>
    );
};

export default Item;
