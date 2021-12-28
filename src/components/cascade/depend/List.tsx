import React, { FC } from 'react';
import { LProps } from '../index';

const List: FC<LProps> = ({ tier, id, data = [] }) => (
    <div className={['d-cascade-list', `d-cascade-list-${tier}`].join(' ')}>
        {
            data.map((item) => (
                <section className={['d-cascade-item', item.id === id && 'd-cascade-item-active'].join(' ')} key={item.id} data-tier={tier} data-id={item.id} data-pid={item.parentId}>
                    <article className="d-cascade-name">{item.name}</article>
                    <article className="d-cascade-subhead">{item.subhead}</article>
                </section>
            ))
        }
    </div>
);

export default List;
