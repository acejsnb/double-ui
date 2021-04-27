import React, { FC, MouseEvent, useRef } from 'react';

import TextEllipsis from '@/utils/TextEllipsis';
import FindTarget from '@/utils/FindTarget';
import { OptionProps as Props, IItem } from '../Types';

import Transition from '../../transition/Transition';

const DGroup: FC<Props> = ({
    show, setShow, value, data, left, top, position, maxWidth, underline = false, onChange
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const optionClick = (e: MouseEvent) => {
        e.stopPropagation();
        const { tagName } = e.target as HTMLElement;
        if (tagName === 'DIV' || tagName === 'SECTION') return;
        const {
            dataset: {
                pid = '', id = '', name = '', disabled
            }
        } = FindTarget(e.target, ['ARTICLE']);
        if (disabled && disabled === 'true') return;
        onChange({ pid, id, name });
    };

    const optionHover = (e: MouseEvent) => {
        e.stopPropagation();
        if ((e.target as HTMLElement).tagName === 'DIV') return;
        TextEllipsis(e, ['ARTICLE']);
    };

    return (
        <Transition show={show} setShow={setShow} classHidden="d-drop-hidden" classPrefix={`d-transition-${position ? 'down' : 'up'}`}>
            <div
                ref={contentRef}
                className={['d-drop-group-box', 'd-drop-group-box-light'].join(' ')}
                style={{
                    left: `${left}px`,
                    top: `${top}px`,
                    maxWidth: `${maxWidth}px`
                }}
                onMouseOver={optionHover}
                onClick={optionClick}
            >
                {
                    data.map((group: IItem) => (
                        <div key={group.id}>
                            {group.name && <section className="d-drop-item-title">{group.name}</section>}
                            {underline && <article className="d-drop-item-underline" />}
                            {
                                group.children?.map((item: IItem) => (
                                    <article
                                        key={item.id}
                                        className={
                                            [
                                                'd-drop-group-option',
                                                value === item.id && 'd-drop-group-option-selected',
                                                item.disabled && 'd-drop-group-option-disable'
                                            ].join(' ')
                                        }
                                        data-pid={group.id}
                                        data-id={item.id}
                                        data-name={item.name}
                                        data-disabled={item.disabled}
                                    >
                                        {item.name}
                                    </article>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </Transition>
    );
};

export default DGroup;
