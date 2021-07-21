import React, {
    FC,
    useContext,
    useEffect,
    useState
} from 'react';
import Validate from './Validate';
import { ItemProps } from './types';
import { FormContext, FormItemContext } from './Context';

const Item: FC<ItemProps> = ({
    children,
    label, name = '',
    className,
    rules = []
}) => {
    const { setParam, checkName } = useContext(FormContext);
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
            <FormItemContext.Provider value={{ value, setValue, message }}>
                <>{children}</>
            </FormItemContext.Provider>
            {message && <div className="d-form-item-message">{message}</div>}
        </div>
    );
};

export default Item;
