import React from 'react';

import Divider from '@/components/divider/Divider';

function DividerView() {
    return (
        <div className="component-view">
            <Divider type="v" />
            <br />
            <br />
            <Divider title="123" />
        </div>
    );
}

export default DividerView;
