import React from 'react';

import Button from '@/components/button/Button';
import Form from '@/components/form';

interface Params {
    [key: string]: any
}

const validate = (value: string, confirmValue: string) => {
    console.log('value', value);
    console.log('FieldValue', confirmValue);
    return !(confirmValue === value);
};

const InputView = () => {
    const reset = () => {
        console.log('reset');
    };
    const submit = (params: Params) => {
        console.log('confirm', params);
    };
    return (
        <div className="component-view">
            <h3>Input</h3>
            {/* <Input width={200} message="错误提示" /> */}
            <div style={{ height: '40px' }} />
            {/* <Input disabled /> */}
            <h3 style={{ marginTop: `${32}px` }}>Form</h3>
            <Form reset={reset} submit={submit}>
                <Form.Item label="手机号" name="phone" rules={[{ check: 'required', message: '请输入手机号' }]}>
                    {/* <Form.Item label="手机号" name="phone" rules={[{ check: 'required', message: '请输入手机号' }]}> */}
                    <Form.Input defaultValue="123" maxLength={11} />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ check: 'required', message: '请输入密码' }]}>
                    <Form.Input type="password" maxLength={20} />
                </Form.Item>
                <Form.Item label="确认密码" name="password2" confirm="password" rules={[{ check: 'required', message: '请输入密码' }, { validate, message: '两次输入的密码不能相同' }]}>
                    <Form.Input type="password" maxLength={20} />
                </Form.Item>
                <Form.Item className="custom-form-item">
                    <Button type="blue" htmlType="submit">确定</Button>
                    <Button htmlType="reset">重置</Button>
                </Form.Item>
            </Form>
            {/* <h3>horizontal</h3>
            <Form layout="horizontal">
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input type="password" />
                </Form.Item>
                <Form.Item>
                    <Input />
                </Form.Item>
            </Form> */}
        </div>
    );
};

export default InputView;
