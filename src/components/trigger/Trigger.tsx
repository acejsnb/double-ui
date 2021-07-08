import './style.styl';
import React, {
    ForwardRefRenderFunction, useState, useEffect, forwardRef
} from 'react';
import TriangleIcon from '@/assets/iconSvg/triangle.svg';
import DeleteIcon from '@/assets/iconSvg/delete_icon.svg';
import { Props } from './types';

import GetCaptionWidth from './GetCaptionWidth';

const Trigger: ForwardRefRenderFunction<HTMLDivElement, Props> = ({
    width = 120, title = '', placeholder = '请选择',
    text = '',
    disabled = false,
    show = false,
    border = true,
    triggerClick = () => {}
}, ref) => {
    const [captionWidth, setCaptionWidth] = useState(0);
    useEffect(() => {
        setCaptionWidth(GetCaptionWidth(title));
    }, [title]);
    return (
        <div
            ref={ref}
            className={['d-trigger', disabled && 'd-trigger-disabled', border ? 'd-trigger-border' : 'd-trigger-no-border'].join(' ')}
            style={border ? { width: `${width}px` } : {}}
            onClick={triggerClick}
        >
            {title && <div className="d-trigger-words d-trigger-title d-trigger-pl" style={{ width: `${captionWidth}px` }}>{title}</div>}
            {
                text
                    ? (
                        <div
                            className={['d-trigger-words', 'd-trigger-text', (border && !title) && 'd-trigger-pl'].join(' ')}
                            style={border ? { width: `calc(100% - ${captionWidth + 30}px)` } : {}}
                        >
                            {text}
                        </div>
                    )
                    : <div className="d-trigger-words d-trigger-placeholder">{placeholder}</div>
            }
            <div className={['d-trigger-icon', border && text && 'd-trigger-has-selected'].join(' ')}>
                <i className={['d-trigger-triangle', show && 'd-trigger-triangle-show'].join(' ')}><TriangleIcon /></i>
                {border && <i className="d-trigger-del"><DeleteIcon /></i>}
            </div>
            {show && <section className="d-trigger-shade" />}
        </div>
    );
};

export default forwardRef(Trigger);
