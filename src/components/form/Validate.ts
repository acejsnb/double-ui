// 表单验证
import {
    CheckEmail,
    CheckPassword,
    CheckPasswordBest,
    CheckPasswordBetter,
    CheckPhone
} from '@/utils/CheckText';

const ValidateStrategy = {
    CheckPhone,
    CheckEmail,
    CheckPassword,
    CheckPasswordBetter,
    CheckPasswordBest
};

// 表单验证
type TRule = {
    validate?: (value: string) => boolean
    check?: string
    message?: string
}
type CBFn = (value: string, message?: string) => void;

type TCheckRule = (rule: TRule, value: string, success?: CBFn, fail?: CBFn) => boolean | void;

const CheckRule: TCheckRule = (rule, value, success, fail) => {
    const { validate, check = '', message = '' } = rule;
    if (validate) {
        if (typeof validate === 'function') {
            if (validate?.(value)) {
                success?.(value);
                return true;
            }
            fail?.(value, message);
            return false;
        }
        console.error('The validate field must be a function!');
        return false;
    }
    if (!check) {
        console.error('The check field cannot be empty!');
        return false;
    }
    if (check === 'required') {
        if (value) {
            success?.(value);
            return true;
        }
        fail?.(value, message);
        return false;
    }
    const arr = check.split('');
    arr[0] = arr[0].toUpperCase();
    const str = arr.join('');
    if (ValidateStrategy[`Check${str}`]?.(value)) {
        success?.(value);
        return true;
    }
    fail?.(value, message);
    return false;
};

type TValidate = (rules: TRule[], value: string, success?: CBFn, fail?: CBFn) => void | boolean;
const Validate: TValidate = (rules, value, success, fail) => {
    // const arr = [];
    const len = rules?.length || 0;
    for (let i = 0; i < len; i++) {
        const status = CheckRule(rules[i], value, success, fail);
        // arr.push(status);
        if (!status) return false;
    }
    return true;
};

export default Validate;
