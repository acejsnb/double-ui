import './style.styl';
import React, { FC, useState } from 'react';
import {
    Props, IForm, ItemProps, ParamItem
} from './types';
import Item from './Item';
import { FormContext } from './Context';

// layout = vertical | horizontal
const Form: FC<Props> & IForm<FC<ItemProps>> = ({
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
    const [params, setParams] = useState<ParamItem>({});

    // 验证输入参数是通过
    const validateChecked = () => {
        const list = Object.values(params);
        if (list.length) {
            const item = list.find((d) => !d.checked);
            if (item) {
                setCheckName(item?.key || '');
                return false;
            }
            setCheckName('');
            return true;
        }
        setCheckName('checked');
        return false;
    };

    // 设置参数
    const setParam = (name: string, value: string, checked: boolean) => {
        let pms = {};
        setParams((p) => {
            pms = { ...p, [name]: { key: name, value, checked } };
            return pms;
        });
        setCheckName('');
    };

    // 取消
    const cancel = () => {
        cancelHandle?.();
    };
    // 重置
    const reset = () => {
        setIsReset(!isReset);
        setParams({});
        resetHandle?.();
    };
    // 确定
    const submit = () => {
        if (!validateChecked()) return;
        const obj = {};
        Object.values(params).forEach((d) => {
            obj[d.key] = d.value;
        });
        submitHandle?.(obj);
    };

    return (
        <form id={name} className={['d-form', `d-form-${layout}`].join(' ')}>
            <FormContext.Provider value={{
                setParam, cancel, reset, submit, checkName, isReset
            }}
            >
                <>{children}</>
            </FormContext.Provider>
        </form>
    );
};

Form.Item = Item;

export default Form;
