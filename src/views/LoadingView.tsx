import React, { useRef } from 'react';
import Loading from '@/components/loading/Loading';
import Button from '@/components/button/Button';
import AvatarImg from '@/assets/images/avatarimg.jpg';

function ButtonView() {
    const divRef = useRef(null);
    const click = () => {
        const global = Loading({ imgSrc: AvatarImg });
        setTimeout(() => {
            global.close();
        }, 3000);
    };
    const clickLocal = () => {
        const local = Loading.local(AvatarImg, divRef.current);
        // const local = Loading({ ele: divRef.current, imgSrc: imgLocal });
        setTimeout(() => {
            local.close();
        }, 3000);
    };
    return (
        <div className="component-view">
            <Button width={120} click={click}>global loading</Button>
            <br />
            <br />
            <br />
            <Button width={120} click={clickLocal}>local loading</Button>
            <div
                ref={divRef}
                style={{
                    position: 'relative', marginTop: '20px', width: '300px', height: '300px', background: 'blue'
                }}
            >
                123456
            </div>
        </div>
    );
}

export default ButtonView;
