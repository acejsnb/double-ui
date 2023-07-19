import React, {
    useCallback, useContext, useEffect, useState
} from 'react';
import { FormValidate } from 'js-func-tools';
import { ItemProps } from './index';
import FormContext from './FormContext';
import ItemContext from './ItemContext';

function Item({
    children,
    label, name = '', confirm = '',
    className,
    rules = []
}: ItemProps) {
    const {
        params, openCheck, isReset, setCheckList, setParam
    } = useContext(FormContext);

    const [message, setMessage] = useState('');

    // 验证成功
    const success = () => {
        setMessage('');
    };
    // 验证失败
    const fail = useCallback((value: string | undefined, message?: string | undefined): void => {
        if (!isReset && openCheck) setMessage(message || '');
    }, [isReset, openCheck]);

    // 输入的值
    const [value, setValue] = useState('');
    // 根据key获取输入的value
    // const getFieldValue = (key: string): string => params[key];
    // 验证输入的value
    const checkValidate = useCallback((value: string) => {
        // const confirmValue = getFieldValue(confirm);
        const confirmValue = params[confirm];
        const status = FormValidate({
            rules, value, success, fail, confirmValue
        });
        setCheckList(name, !!status);
    }, [params, rules, value, success, fail]);
    // 监听输入的值改变
    const change = useCallback((v: string) => {
        setValue(v);
        setParam(name, v);
        checkValidate(v);
    }, []);

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
}

export default Item;
