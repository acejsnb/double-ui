import './style.styl';
import React, { FC, useState, useEffect } from 'react';
import TriangleIcon from '@/assets/iconSvg/triangle.svg';
import DeleteIcon from '@/assets/iconSvg/delete_icon.svg';
import { Props } from './types';

import GetCaptionWidth from './GetCaptionWidth';

const Trigger: FC<Props> = ({
    width = 120, title = '', placeholder = '请选择', text = '',
    disabled = false,
    show = false
}) => {
    console.log(111);
    const [captionWidth, setCaptionWidth] = useState(0);
    useEffect(() => {
        setCaptionWidth(GetCaptionWidth(title));
    }, [title]);
    return (
        <div
            className={['d-trigger', disabled && 'd-trigger-disabled'].join(' ')}
            style={{ width: `${width}px` }}
        >
            {title && <div className="d-trigger-words d-trigger-title d-trigger-pl" style={{ width: `${captionWidth}px` }}>{title}</div>}
            {
                text
                    ? (
                        <div
                            className={['d-trigger-words', 'd-trigger-text', !title && 'd-trigger-pl'].join(' ')}
                            style={{ width: `calc(100% - ${captionWidth + 30}px)` }}
                        >
                            {text}
                        </div>
                    )
                    : <div className="d-trigger-words d-trigger-placeholder">{placeholder}</div>
            }
            <div className={['d-trigger-icon', text && 'd-trigger-has-selected'].join(' ')}>
                <i className={['d-trigger-triangle', show && 'd-trigger-triangle-show'].join(' ')}><TriangleIcon /></i>
                <i className="d-trigger-del"><DeleteIcon /></i>
            </div>
        </div>
    );
};

export default Trigger;
