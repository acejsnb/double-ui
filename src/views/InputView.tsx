import React from 'react';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import Form from '@/components/form';

interface Params {
    [key: string]: any
}

const InputView = () => {
    const reset = () => {
        console.log('cancel');
    };
    const confirm = (params: Params) => {
        console.log('confirm', params);
    };
    return (
        <div className="component-view">
            <h3>Input</h3>
            <Input width={200} errText="错误提示" />
            <Input disabled />
            <h3 style={{ marginTop: `${32}px` }}>Form</h3>
            <Form reset={reset} confirm={confirm}>
                <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
                    <Input maxLength={11} />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input type="password" maxLength={20} defaultValue="123" />
                </Form.Item>
                <Form.Item className="custom-form-item">
                    <Button type="blue" handleType="confirm">确定</Button>
                    <Button handleType="reset">重置</Button>
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
