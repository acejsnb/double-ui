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

type TGetFieldValue = (key: string) => string | void
// 表单验证
type TRule = {
    validate?: (value: string, getFieldValue?: TGetFieldValue) => boolean
    check?: string
    message?: string
}
type CBFn = (value: string, message?: string) => void;

interface RuleOption {
    rule: TRule, value: string, success?: CBFn, fail?: CBFn
    getFieldValue?: TGetFieldValue
}
type TCheckRule = (option: RuleOption) => boolean | void;

// type TCheckKey = (obj: TRule, key: string) => boolean;
// const checkKey: TCheckKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const CheckRule: TCheckRule = ({
    rule,
    value,
    success,
    fail,
    getFieldValue = () => {}
}) => {
    const { validate, check = '', message = '' } = rule;
    if (validate) {
        if (typeof validate === 'function') {
            if (validate(value, getFieldValue)) {
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

interface IValidate {
    rules: TRule[]
    value: string
    success?: CBFn
    fail?: CBFn
    getFieldValue?: TGetFieldValue
}
type TValidate = (option: IValidate) => void | boolean;
const Validate: TValidate = ({
    rules,
    value,
    success,
    fail,
    getFieldValue
}) => {
    const len = rules?.length || 0;
    for (let i = 0; i < len; i++) {
        const status = CheckRule({
            rule: rules[i], value, success, fail, getFieldValue
        });
        if (!status) return false;
    }
    return true;
};

export default Validate;
