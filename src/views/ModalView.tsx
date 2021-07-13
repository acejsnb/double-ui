import React, { useState } from 'react';

import Modal from '@/components/modal/Modal';
import Button from '@/components/button/Button';

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
    return (
        <div className="component-view">
            <Button width={90} click={showModal}>按钮-show</Button>
            <Modal show={show} title="模态框" close={close} confirm={confirm}>
                <div style={{ height: `${800}px` }} />
            </Modal>
        </div>
    );
};

export default ModalView;
