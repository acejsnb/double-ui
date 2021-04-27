import './style.styl';
import React, { FC } from 'react';

interface Props {
    type?: string
    title?: string
}

// type 线条展示方向，可选值【h-水平 v-垂直】
const Divider: FC<Props> = ({ type = 'h', title = '' }) => (
    <div className={`d-divider-${type}`} data-title={title} />
);

export default Divider;
