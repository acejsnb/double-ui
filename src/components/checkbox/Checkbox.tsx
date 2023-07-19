import './style.styl';
import React, {
    MouseEvent, useState, useEffect, memo
} from 'react';

import TextEllipsis from '@/utils/TextEllipsis';
import { Props } from './index';

function Checkbox({
    checked = 'uncheck', disabled = false, stopPropagation = false,
    change = () => {},
    children,
    ...other
}: Props) {
    const [status, setStatus] = useState(checked);
    useEffect(() => {
        setStatus(checked);
    }, [checked]);
    useEffect(() => {
        change(status, other);
    }, [status]);
    const handleChange = (e: MouseEvent<HTMLDivElement>) => {
        if (stopPropagation) e.stopPropagation();
        if (disabled) return;
        if (status !== 'checked') setStatus('checked');
        else setStatus('uncheck');
    };

    return (
        <div className={['d-checkbox', disabled && 'd-checkbox-disabled'].join(' ')} onClick={handleChange}>
            <i className={['d-checkbox-box', `d-checkbox-${status}`].join(' ')} />
            {
                children && (
                    <span
                        className="d-checkbox-text"
                        onMouseEnter={(e: MouseEvent<HTMLSpanElement>) => { TextEllipsis(e, ['SPAN']); }}
                    >
                        {children}
                    </span>
                )
            }
        </div>
    );
}

export default memo(Checkbox);
