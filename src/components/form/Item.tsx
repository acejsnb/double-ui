import React, {
    FC, useContext, useEffect, useState, cloneElement, Children, useCallback
} from 'react';
import { ItemProps, TChild } from './types';
import { FormContext } from './Context';

const Item: FC<ItemProps> = ({
    children,
    label, name = '',
    className,
    rules = []
}) => {
    const {
        setParam, checkName, cancel, reset, confirm, isReset
    } = useContext(FormContext);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    // 当input输入的值改变后提交value
    useEffect(() => {
        if (name) {
            setParam?.(name, value, false);
            setMessage('');
        }
    }, [value]);

    // 点击确定按钮 执行验证
    useEffect(() => {
        if (checkName) {
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].required) {
                    if (!value) {
                        setMessage(rules[i].message);
                        setParam?.(name, value, false);
                    } else {
                        setParam?.(name, value, true);
                        setMessage('');
                    }
                    break;
                }
            }
        }
    }, [checkName]);

    return (
        <div className={['d-form-item', className && className].join(' ')}>
            {label && <div className="d-form-item-label">{label}</div>}
            {Children.map(children, (child) => (
                cloneElement(
                    child as TChild,
                    (label && name)
                        ? {
                            value, setValue, isReset, errText: message
                        }
                        : {
                            cancel, reset, confirm
                        }
                )
            ))}
        </div>
    );
};

export default Item;
