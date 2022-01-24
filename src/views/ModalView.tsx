import React, { useState } from 'react';

import Modal from '@/components/modal/build';
import Button from '@/components/button/build';
import Form from '@/components/form/build';

interface Params {
    [key: string]: string
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
    const formSubmit = (params: Params) => {
        console.log('confirm', params);
    };

    const [show2, setShow2] = useState(false);
    const [confirmBtnLoading, setLoading2] = useState(false);
    const close2 = () => {
        console.log('close');
        setShow2(false);
    };
    const confirm2 = () => {
        setLoading2(true);
        console.log('click');
    };

    return (
        <div className="component-view">
            <Button width={90} click={showModal}>按钮-show</Button>
            <Button width={90} click={() => setShow2(true)}>按钮-show2</Button>
            <Modal show={show} title="模态框" footer={false} close={close} confirm={confirm}>
                <div style={{ padding: '40px' }}>
                    <Form name="idForm" reset={close} submit={formSubmit}>
                        <Form.Item label="手机号" name="phone" rules={[{ check: 'required', message: '请输入手机号' }, { check: 'phone', message: '手机号不正确' }]}>
                            {/* <Form.Item label="手机号" name="phone" rules={[{ check: 'required', message: '请输入手机号' }]}> */}
                            <Form.Input maxLength={11} />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ check: 'required', message: '请输入密码' }, { check: 'passwordBetter', message: '密码格式不正确' }]}>
                            <Form.Input type="password" maxLength={20} defaultValue="123" />
                        </Form.Item>
                        <Form.Item className="custom-form-item">
                            <Button htmlType="reset">取消</Button>
                            <Button type="blue" htmlType="submit">确定</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <Modal show={show2} title="修改密码" mode="tip" type="info" close={close2} confirmBtnLoading={confirmBtnLoading} confirm={confirm2}>
                是否要修改密码？如确认，请在钉钉中点击BOSS应用推送消息中密码修改链接。
            </Modal>
        </div>
    );
};

export default ModalView;
