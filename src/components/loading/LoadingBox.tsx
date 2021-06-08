import './style.styl';
import React, { FC } from 'react';

import LoadingPng from '@/assets/loading/loading-png.png';
import LoadingMp4 from '@/assets/loading/loading-mp4.mp4';
import LoadingWebm from '@/assets/loading/loading-webm.webm';
import { Props } from './types';

const LoadingBox: FC<Props> = ({ width = 60, height = 60, type = 'global' }) => (
    <div
        className="d-loading"
    >
        <video
            className="d-video"
            autoPlay
            loop
            width={width}
            height={height}
            poster={LoadingPng}
        >
            <source src={LoadingMp4} type="video/mp4" />
            <source src={LoadingWebm} type="video/webm" />
            Your browser does not support the video tag.
        </video>
    </div>
);

export default LoadingBox;
