import './style.styl';
import React, {
    FC, useRef, useState, Children, cloneElement
} from 'react';
import {
    Props, ParamItem, TChild
} from './types';

// layout = vertical | horizontal
const Form: FC<Props> = ({
    children,
    name = 'duiForm',
    layout = 'vertical',
    cancel: cancelHandle,
    reset: resetHandle,
    submit: submitHandle
}) => {
    // 设置重置副作用
    const [isReset, setIsReset] = useState(false);
    // 改变checkName以达到check的目的
    const [checkName, setCheckName] = useState('');
    // params数据
    // const [params, setParams] = useState<ParamItem>({});
    const params = useRef<ParamItem>({});

    // 验证输入参数是通过
    const validateChecked = () => {
        const list = Object.values(params.current);
        if (list.length) {
            const item = list.find((d) => !d.checked);
            if (item) {
                setCheckName(item?.key || '');
                return false;
            }
            // setCheckName('');
            return true;
        }
        setCheckName('checked');
        return false;
    };

    // 设置参数
    const setParam = (name: string, value: string, checked: boolean, confirm?: string) => {
        params.current[name] = { key: name, value, checked };
        const item = params.current?.[confirm || ''];
        if (confirm && item) {
            const { key, value } = item;
            if (value) {
                params.current[confirm].checked = false;
                setCheckName(key);
            }
        }
        // setCheckName('');
    };

    // 根据key获取输入的value
    const getFieldValue = (key: string) => params.current[key].value;

    // 取消
    const cancel = () => {
        cancelHandle?.();
    };
    // 重置
    const reset = () => {
        // params.current = {};
        setIsReset(!isReset);
        resetHandle?.();
    };
    // 确定
    const submit = () => {
        if (!validateChecked()) return;
        const obj = {};
        Object.values(params.current).forEach((d) => {
            obj[d.key] = d.value;
        });
        submitHandle?.(obj);
    };

    return (
        <form id={name} className={['d-form', `d-form-${layout}`].join(' ')}>
            {Children.map(children, (child) => cloneElement(child as TChild, {
                setParam, cancel, reset, submit, checkName, setCheckName, isReset, getFieldValue
            }))}
        </form>
    );
};

export default Form;
