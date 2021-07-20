import React, {
    FC,
    useContext,
    useEffect,
    useState,
    cloneElement,
    Children
} from 'react';
import Validate from '@/utils/CheckText';
import { ItemProps, TChild } from './types';
import { FormContext } from './Context';

const Item: FC<ItemProps> = ({
    children,
    label, name = '',
    className,
    rules = []
}) => {
    const {
        setParam, checkName, cancel, reset, submit, isReset
    } = useContext(FormContext);
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    // 当input输入的值改变后提交value
    useEffect(() => {
        if (name) {
            setParam?.(name, value, !!Validate(rules, value));
            setMessage('');
        }
    }, [value]);

    // 验证成功
    const success = (value: string) => {
        setParam?.(name, value, true);
        setMessage('');
    };
    // 验证失败
    const fail = (value: string, message?: string) => {
        setParam?.(name, value, false);
        setMessage(message || '');
    };
    // 点击确定按钮 执行验证
    useEffect(() => {
        if (checkName) Validate(rules, value, success, fail);
    }, [checkName]);

    return (
        <div className={['d-form-item', className && className].join(' ')}>
            {label && <div className="d-form-item-label">{label}</div>}
            {Children.map(children, (child) => {
                const { type: { name = '' }, props: { htmlType = 'button' } } = child as any;
                let props;
                if (name === 'Input') {
                    props = {
                        value, setValue, isReset, message
                    };
                } else {
                    if (htmlType === 'submit') {
                        props = { submit };
                    } else if (htmlType === 'reset') {
                        props = { reset };
                    } else {
                        props = { cancel };
                    }
                }
                return cloneElement(
                    child as TChild,
                    props
                );
            })}
        </div>
    );
};

export default Item;
