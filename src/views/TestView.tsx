import React, { FC, useEffect } from 'react';
import Test from '@/components/test/Test';
import RenderToBody, { Instance } from '@/utils/RenderToBody';

const TestView: FC = () => {
    let vm1: Instance; let vm2: Instance;
    const mount1 = () => {
        console.log('click');
        // vm1 = RenderToBody(<Test title="张三" />);
        vm1 = RenderToBody(Test, { title: 'zhangsan' });
    };
    const update1 = () => {
        console.log('更新');
        vm1.update({ title: '李四' });
    };
    const unmount1 = () => {
        console.log('卸载');
        vm1.unmount();
    };
    const mount2 = () => {
        console.log('click');
        vm2 = RenderToBody(Test, { title: '张三2' });
    };
    const update2 = () => {
        console.log('更新');
        vm2.update({ title: '7777' });
    };
    const unmount2 = () => {
        console.log('卸载');
        vm2.unmount();
    };
    useEffect(() => {
        console.log('挂载了。。。');
        return () => {
            vm1.unmount();
            vm2.unmount();
        };
    }, []);
    return (
        <div className="component-view">
            <h3>测试</h3>
            <button type="button" onClick={mount1}>挂载1</button>
            <button type="button" onClick={update1}>更新1</button>
            <button type="button" onClick={unmount1}>卸载1</button>
            <br />
            <br />
            <button type="button" onClick={mount2}>挂载2</button>
            <button type="button" onClick={update2}>更新2</button>
            <button type="button" onClick={unmount2}>卸载2</button>
            <br />
            <br />
            <div style={{
                marginBottom: '12px', width: '300px', height: '40px', backgroundColor: 'var(--blue-500)'
            }}
            />
            <div style={{
                marginBottom: '12px', width: '300px', height: '40px', backgroundColor: 'var(--green-500)'
            }}
            />
            <div style={{
                marginBottom: '12px', width: '300px', height: '40px', backgroundColor: 'var(--orange-500)'
            }}
            />
            <div style={{
                marginBottom: '12px', width: '300px', height: '40px', backgroundColor: 'var(--red-500)'
            }}
            />
            <div style={{
                marginBottom: '12px', width: '300px', height: '40px', backgroundColor: 'var(--grey-500)'
            }}
            />
        </div>
    );
};

export default TestView;

