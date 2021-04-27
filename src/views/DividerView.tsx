import React, { FC } from 'react';

import Divider from '@/components/divider/Divider';

const DividerView: FC = () => (
    <div className="component-view">
        <Divider type="v" />
        <br />
        <br />
        <Divider title="123" />
    </div>
);

export default DividerView;
