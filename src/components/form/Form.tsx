import './style.styl';
import React, {
    FC, FormEvent, useCallback, useRef, useState, memo
} from 'react';
import {
    Props, SubmitParams, CheckList
} from './types';
import FormContext from './FormContext';
import FormHandle, { CheckKeyStatus } from './utils';

const Form: FC<Props> = ({
    children,
    name = 'duiForm',
    layout = 'vertical',
    reset,
    submit
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    FormContext.displayName = name;
    // 设置重置副作用
    const [isReset, setIsReset] = useState(false);
    // 改变checkName以达到check的目的
    const checkList = useRef<CheckList>({});
    const setCheckList = useCallback((name: string, v: boolean) => {
        checkList.current[name] = v;
    }, []);

    const [params, setParams] = useState<SubmitParams>({});
    const setParam = useCallback((name: string, v: string) => {
        setOpenCheck(false);
        setParams((params) => ({ ...params, [name]: v }));
    }, [params]);
    // 开启验证
    const [openCheck, setOpenCheck] = useState(false);

    const checkParams = useCallback(async (params: SubmitParams) => {
        const status = await CheckKeyStatus(params, checkList.current);
        if (status) {
            submit?.(params);
            return;
        }
        setOpenCheck(true);
    }, []);

    // 提交
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = await FormHandle(e.target, 'submit');
        await checkParams(params);
    };

    // 重置
    const onReset = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsReset(true);
        await FormHandle(e.target, 'reset');
        setOpenCheck(false);
        setIsReset(false);
        setParams({});
        reset?.();
    };

    return (
        <form ref={formRef} onSubmit={onSubmit} onReset={onReset} name={name} className={['d-form', `d-form-${layout}`].join(' ')}>
            <FormContext.Provider value={{
                params,
                openCheck,
                isReset,
                setCheckList,
                setParam
            }}
            >
                {children}
            </FormContext.Provider>
        </form>
    );
};

export default memo(Form);
