import './style.styl';
import React, { memo } from 'react';
import { Props } from './index';

function LoadingBox({ type = 'global', size = 60, imgSrc }: Props) {
    return (
        <div className={['d-loading', `d-loading-${type}`].join(' ')}>
            <section className="d-loading-bg" />
            <div className="d-loading-item" style={{ width: `${size}px`, height: `${size}px` }}>
                <img src={imgSrc} alt="loading-gif" />
            </div>
        </div>
    );
}

export default memo(LoadingBox);
