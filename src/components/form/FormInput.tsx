import React, { memo, useContext } from 'react';
import Input from '../input/Input';
import { Props } from '../input';
import FormContext from './FormContext';
import ItemContext from './ItemContext';

function FormInput({
    defaultValue = '',
    type = 'text', placeholder = '请输入', maxLength = 20,
    disabled = false
}: Props) {
    const { isReset } = useContext(FormContext);
    const { name, change } = useContext(ItemContext);
    return (
        <Input {...{
            defaultValue,
            type,
            placeholder,
            maxLength,
            disabled,
            isReset,
            name,
            change
        }}
        />
    );
}

export default memo(FormInput);
