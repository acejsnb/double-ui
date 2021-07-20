import './style.styl';
import React, { FC, useState } from 'react';
import {
    Props, IForm, ItemProps, ParamItem
} from './types';
import Item from './Item';
import { FormContext } from './Context';
import useParams from './useParams';

// layout = vertical | horizontal
const Form: FC<Props> & IForm<FC<ItemProps>> = ({
    children,
    name = 'duiForm',
    layout = 'vertical',
    cancel: cancelHandle,
    reset: resetHandle,
    submit: confirmHandle
}) => {
    // 设置重置副作用
    const [isReset, setIsReset] = useState(false);
    // 改变checkName以达到check的目的
    const [checkName, setCheckName] = useState('');
    // params数据
    const { params, setParams } = useParams();

    // 验证输入参数是通过
    const validateChecked = (pms?: ParamItem) => {
        const p = pms ?? params;
        const item = Object.values(p).filter((d) => !d.checked)?.[0] || null;
        // console.log('===========', item);
        if (item) {
            setCheckName(item?.key || '');
            return false;
        }
        return true;
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
        setIsReset((status) => !status);
        resetHandle?.();
    };
    // 确定
    const submit = () => {
        if (!validateChecked()) return;

        Promise.resolve().then(() => {
            const obj = {};
            Object.values(params).forEach((d) => {
                obj[d.key] = d.value;
            });
            confirmHandle?.(obj);
        });
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
