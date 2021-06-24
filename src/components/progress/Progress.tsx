import './style.styl';
import React, { FC } from 'react';
import { Props } from './types';

const Progress: FC<Props> = ({
    play, running, time = 3, end, color = '#0091ff'
}) => (
    <div
        className={['d-progress', play ? 'd-progress-play' : 'd-progress-pause'].join(' ')}
        style={{
            backgroundColor: color,
            animationDuration: `${time * 1000}ms`,
            animationName: `${running ? 'progressPlay' : 'progressReplay'}`
        }}
        onAnimationEnd={end}
    />
);

export default Progress;
