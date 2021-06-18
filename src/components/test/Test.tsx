import React, { FC } from 'react';

interface Props {
    title: string
}
const Test: FC<Props> = ({ title }) => (
    <div>
        <h3>{title}</h3>
        <ul>
            <li>111</li>
            <li>222</li>
            <li>333</li>
        </ul>
    </div>
);

export default Test;

