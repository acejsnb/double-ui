import React, { FC, useState } from 'react';

import Progress from '@/components/progress/build';

const ProgressView: FC = () => {
    console.log('ProgressBarView');
    const [play, setPlay] = useState(false); // 是否播放
    const [running, setRunning] = useState(false); // 是否播放中
    const [count, setCount] = useState(0); // 播放次数
    // 暂停 && 播放
    const handleVideo = () => {
        setPlay(!play);
    };

    // 重播
    const replay = () => {
        setPlay(true);
        setRunning(!running);
    };
    const end = () => {
        setCount(count + 1); // 播放次数 +1
        replay(); // 重新开始播放
    };

    return (
        <div className="component-view">
            <Progress play={play} running={running} end={end} />
            <button type="button" onClick={handleVideo}>{ play ? '暂停' : '播放' }</button>
            <button type="button" onClick={replay}>重播</button>
            <span>{ `播放次数为：${count}` }</span>
        </div>
    );
};

export default ProgressView;
