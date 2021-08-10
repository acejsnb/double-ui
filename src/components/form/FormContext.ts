import { createContext } from 'react';
import { IFormContext } from './types';

const defaultValue = {
    params: {},
    openCheck: false,
    isReset: false,
    setCheckList() {},
    setParam() {}
};
const FormContext = createContext<IFormContext>(defaultValue);
FormContext.displayName = 'FormContext';

export default FormContext;
