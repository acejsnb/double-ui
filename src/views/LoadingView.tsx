import React, { FC, useRef } from 'react';

// import LoadingPng from '@/assets/loading/loading-png.png';
// import LoadingMp4 from '@/assets/loading/loading-mp4.mp4';
// import LoadingWebm from '@/assets/loading/loading-webm.webm';


import Loading from '@/components/loading/Loading';
import Button from '@/components/button/Button';

const imgGlobal = 'http://47.95.122.141:8200/persagy_ui_kit/loading-static/global-60.gif';
const imgLocal = 'http://47.95.122.141:8200/persagy_ui_kit/loading-static/local.gif';

/* const poster = LoadingPng;
const sources = [
    { src: LoadingMp4, type: 'mp4' },
    { src: LoadingWebm, type: 'webm' }
]; */
const ButtonView: FC = () => {
    const divRef = useRef(null);
    const click = () => {
        const global = Loading({ imgSrc: imgGlobal });
        setTimeout(() => {
            global.close();
        }, 3000);
    };
    const clickLocal = () => {
        const local = Loading.local(imgLocal, divRef.current);
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
};

export default ButtonView;
