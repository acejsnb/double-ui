import './style.styl';
import React, { FC, memo } from 'react';

import { Props } from './index';
// type 线条展示方向，可选值【h-水平 v-垂直】
const Divider: FC<Props> = ({ type = 'h', title = '' }) => (
    <div className={`d-divider-${type}`} data-title={title} />
);

export default memo(Divider);
