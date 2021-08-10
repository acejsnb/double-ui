import React, {
    FC, useContext, useEffect, useState
} from 'react';
import Validate from './Validate';
import { ItemProps } from './types';
import FormContext from './FormContext';
import ItemContext from './ItemContext';

const Item: FC<ItemProps> = ({
    children,
    label, name = '', confirm = '',
    className,
    rules = []
}) => {
    const {
        params, openCheck, isReset, setCheckList, setParam
    } = useContext(FormContext);

    const [message, setMessage] = useState('');

    // 验证成功
    const success = (value: string) => {
        setMessage('');
    };
    // 验证失败
    const fail = (value: string, message?: string) => {
        if (!isReset && openCheck) setMessage(message || '');
    };

    // 输入的值
    const [value, setValue] = useState('');
    // 根据key获取输入的value
    // const getFieldValue = (key: string): string => params[key];
    // 验证输入的value
    const checkValidate = (value: string) => {
        // const confirmValue = getFieldValue(confirm);
        const confirmValue = params[confirm];
        const status = Validate({
            rules, value, success, fail, confirmValue
        });
        setCheckList(name, !!status);
    };
    // 监听输入的值改变
    const change = (v: string) => {
        setValue(v);
        setParam(name, v);
        checkValidate(v);
    };

    useEffect(() => {
        // 存在confirm 当值改变后 验证当前值
        if (confirm && params[confirm]) {
            checkValidate(value);
        }
    }, [params]);
    // 点击确定按钮 执行验证
    useEffect(() => {
        if (name && openCheck) {
            checkValidate(value);
        }
    }, [openCheck]);

    useEffect(() => {
        // 重置
        if (name && isReset) {
            setCheckList(name, false);
            setMessage('');
        }
    }, [isReset]);

    return (
        <div className={['d-form-item', message && 'd-form-item-err', className && className].join(' ')}>
            {label && <div className={['d-form-item-label', (rules && rules.length) && 'd-form-item-required'].join(' ')}>{label}</div>}
            <ItemContext.Provider value={{ name, change }}>
                {children}
            </ItemContext.Provider>
            {message && <span className="d-form-item-message">{message}</span>}
        </div>
    );
};

export default Item;
