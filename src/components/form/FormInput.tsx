import React, { FC, useContext } from 'react';
import Input from '@/components/input/Input';
import { Props } from '@/components/input/types';
import FormContext from './FormContext';
import ItemContext from './ItemContext';

const FormInput: FC<Props> = ({
    defaultValue = '',
    type = 'text', placeholder = '请输入', maxLength = 20,
    disabled = false
}) => {
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
};

export default FormInput;
