import { createContext } from 'react';
import { IFormContext } from './index';

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
