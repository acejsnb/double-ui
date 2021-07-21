import React, { useState } from 'react';

import Modal from '@/components/modal/Modal';
import Button from '@/components/button/Button';
import Form from '@/components/form';
import Input from '@/components/input';

interface Params {
    [key: string]: any
}

const ModalView = () => {
    const [show, setShow] = useState(false);
    const close = () => {
        console.log('close');
        setShow(false);
    };
    const showModal = () => {
        console.log('showModal');
        setShow(true);
    };
    const confirm = () => {
        console.log('click');
    };
    const reset = () => {
        console.log('reset');
    };
    const formSubmit = (params: Params) => {
        console.log('confirm', params);
    };
    return (
        <div className="component-view">
            <Button width={90} click={showModal}>按钮-show</Button>
            <Modal show={show} title="模态框" footer={false} close={close} confirm={confirm}>
                <div style={{ padding: '40px' }}>
                    <Form name="idForm" cancel={close} submit={formSubmit}>
                        <Form.Item label="手机号" name="phone" rules={[{ check: 'required', message: '请输入手机号' }, { check: 'phone', message: '手机号不正确' }]}>
                            {/* <Form.Item label="手机号" name="phone" rules={[{ check: 'required', message: '请输入手机号' }]}> */}
                            <Input maxLength={11} />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ check: 'required', message: '请输入密码' }, { check: 'password', message: '密码不正确' }]}>
                            <Input type="password" maxLength={20} defaultValue="123" />
                        </Form.Item>
                        <Form.Item className="custom-form-item">
                            <Button htmlType="button">取消</Button>
                            <Button type="blue" htmlType="submit">确定</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default ModalView;
