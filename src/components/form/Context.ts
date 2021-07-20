// Form表单向下传的参数
import { createContext } from 'react';
import { IFormContext, ItemContext } from './types';

const FormContext = createContext<IFormContext>({
    setParam: () => {}, // 设置属性
    cancel: () => {}, // 取消按钮 回调
    reset: () => {}, // 重置按钮
    submit: () => {}, // 确定按钮
    checkName: '', // 验证Item的name属性
    isReset: false // 是否重置
});

const FormItemContext = createContext<ItemContext>({
    value: '', // 当前输入的值
    setValue: () => {} // 设置value
});

export { FormContext, FormItemContext };
