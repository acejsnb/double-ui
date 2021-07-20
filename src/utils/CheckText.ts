// 验证文本
const duiRegPhone = /^1[3456789]\d{9}$/;
const duiRegEmail = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
// 弱：纯数字，纯字母，纯特殊字符
const duiRegPassword = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
// 强：字母+数字+特殊字符
const duiRegPasswordBest = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
// 中：字母+数字，字母+特殊字符，数字+特殊字符
const duiRegPasswordBetter = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;

type CheckFn = (str: string) => boolean;

// 验证手机
export const CheckPhone: CheckFn = (str) => duiRegPhone.test(str);
// 验证邮箱
export const CheckEmail: CheckFn = (str) => duiRegEmail.test(str);

// 验证密码
// good
export const CheckPassword: CheckFn = (str) => duiRegPassword.test(str);
// better
export const CheckPasswordBetter: CheckFn = (str) => duiRegPasswordBetter.test(str);
// best
export const CheckPasswordBest: CheckFn = (str) => duiRegPasswordBest.test(str);

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
