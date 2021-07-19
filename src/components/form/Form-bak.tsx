import './style.styl';
import React, {
    FC, useState, useRef, Children, cloneElement, useEffect
} from 'react';
import {
    Props, IForm, ItemProps, ParamItem, TChild
} from './types';
import Item from './Item';

// layout = vertical | horizontal
const Form: FC<Props> & IForm<FC<ItemProps>> = ({
    children,
    layout = 'vertical',
    cancel: cancelHandle,
    reset: resetHandle,
    confirm: confirmHandle
}) => {
    const params = useRef<ParamItem[]>([]);
    const [isReset, setIsReset] = useState(false);
    const [checkName, setCheckName] = useState('');
    // 设置参数
    const setParam = (name: string, value: string, checked: boolean) => {
        const item = { key: name, value, checked };
        let p = params.current;
        const ind = p.findIndex((d) => d.key === name);
        if (ind > -1) p[ind] = item;
        else p = [...p, item];
        params.current = p;
        setCheckName('');
        if (p.every((d) => d.checked)) confirm(p);
    };

    // 取消
    const cancel = () => {
        cancelHandle?.();
    };
    // 重置
    const reset = () => {
        setIsReset(true);
        Promise.resolve().then(() => {
            setIsReset(false);
        });
        resetHandle?.();
    };
    // 确定
    const confirm = (pms?: ParamItem[]) => {
        Promise.resolve().then(() => {
            const list = pms ?? params.current;
            const item = list.filter((d) => !d.checked)?.[0] || null;
            if (item) {
                setCheckName(item.key || '');
                return;
            }
            const obj = {};
            list.forEach((d) => {
                obj[d.key] = d.value;
            });
            confirmHandle?.(obj);
        });
    };

    useEffect(() => {
        // console.log(children);
    }, []);

    return (
        <div className={['d-form', `d-form-${layout}`].join(' ')}>
            {Children.map(children, (child) => (
                cloneElement(
                    child as TChild,
                    {
                        setParam, checkName, cancel, reset, confirm, isReset
                    }
                )
            ))}
        </div>
    );
};

Form.Item = Item;

export default Form;
