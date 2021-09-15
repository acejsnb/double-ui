import './style.styl';
import React, {
    ForwardRefRenderFunction, useState, useEffect, forwardRef, memo
} from 'react';
import TriangleIcon from '@/assets/iconSvg/triangle.svg';
import DeleteIcon from '@/assets/iconSvg/delete_icon.svg';
import { Props } from './types';

import GetCaptionWidth from './GetCaptionWidth';

const Trigger: ForwardRefRenderFunction<HTMLDivElement, Props> = ({
    width = 120, title = '', placeholder = '请选择',
    triangle = true,
    disabled = false,
    show = false,
    border = true,
    clearIcon = true,
    click = () => {},
    clear = () => {},
    children
}, ref) => {
    const [captionWidth, setCaptionWidth] = useState(0);
    useEffect(() => {
        setCaptionWidth(GetCaptionWidth(title));
    }, [title]);
    return (
        <div
            ref={ref}
            className={['d-trigger', disabled && 'd-trigger-disabled', border ? 'd-trigger-border' : 'd-trigger-no-border', show && 'd-trigger-active'].join(' ')}
            style={border ? { width: `${width}px` } : {}}
            onClick={click}
        >
            {title && <div className="d-trigger-words d-trigger-title d-trigger-pl" style={{ width: `${captionWidth}px` }}>{title}</div>}
            {
                children
                    ? (
                        <div
                            className={['d-trigger-words', 'd-trigger-text', (border && !title) && 'd-trigger-pl'].join(' ')}
                            style={border ? { width: `calc(100% - ${captionWidth + 30}px)` } : {}}
                        >
                            {children}
                        </div>
                    )
                    : <div className={['d-trigger-words', 'd-trigger-placeholder', border && 'd-trigger-pl'].join(' ')}>{placeholder}</div>
            }
            <div className={['d-trigger-icon', (border && children && !disabled) && 'd-trigger-has-selected'].join(' ')}>
                {triangle && <i className={['d-trigger-triangle', show && 'd-trigger-triangle-show'].join(' ')}><TriangleIcon /></i>}
                {(border && !disabled && clearIcon) && <i className="d-trigger-del" onClick={clear}><DeleteIcon /></i>}
            </div>
            {show && <section className="d-trigger-shade" />}
        </div>
    );
};

export default memo(forwardRef(Trigger));
