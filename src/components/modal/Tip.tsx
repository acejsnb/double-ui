import React, { FC } from 'react';
import { TipProps } from './index';
import HintInfoSVG from '@/assets/iconSvg/hint_info.svg';

const Tip: FC<TipProps> = ({ type = 'info', title }) => (
    <header className={['d-modal-header-tip', `d-modal-header-tip-${type}`].join(' ')}>
        <HintInfoSVG />
        <h3>{title}</h3>
    </header>
);

export default Tip;
