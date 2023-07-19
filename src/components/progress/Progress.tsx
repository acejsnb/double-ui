import './style.styl';
import React from 'react';
import { Props } from './index';

function Progress({
    play, running, time = 3, end, color = '#2196F3'
}: Props) {
    return (
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
}

export default Progress;
