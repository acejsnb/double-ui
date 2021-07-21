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
