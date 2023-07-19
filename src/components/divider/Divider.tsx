import './style.styl';
import React, { memo } from 'react';

import { Props } from './index';
// type 线条展示方向，可选值【h-水平 v-垂直】
function Divider({ type = 'h', title = '' }: Props) {
    return <div className={`d-divider-${type}`} data-title={title} />;
}

export default memo(Divider);
