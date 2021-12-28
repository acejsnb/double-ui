import { SubmitParams, CheckList } from './index';

// form 提交/重置
const FormHandle = (target: any, type: 'submit' | 'reset') => new Promise<SubmitParams>((resolve) => {
    const obj: SubmitParams = {};
    Array.from(target.elements).forEach((el) => {
        const node = el as HTMLInputElement;
        if (node.tagName !== 'BUTTON') {
            if (type === 'submit') {
                const { name, value } = node;
                obj[name] = value;
            } else {
                node.value = '';
            }
        }
    });
    resolve(obj);
});

// onSubmit 验证输入状态是否为true
const CheckKeyStatus = (obj: SubmitParams, checkList: CheckList) => new Promise<boolean>((resolve) => {
    const objLen = Object.keys(obj).length;
    const clv = Object.values(checkList);
    if (objLen === clv.length) {
        resolve(clv.every((d) => d));
        return;
    }
    resolve(false);
});

export { CheckKeyStatus };
export default FormHandle;
