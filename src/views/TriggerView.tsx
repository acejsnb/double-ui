import React from 'react';

import Trigger from '@/components/trigger/Trigger';

const TriggerView = () => {
    const click = () => {
        console.log('click');
    };
    return (
        <div className="component-view">
            <Trigger
                width={180}
                title="选择项目："
                // text="下级分项"
            />
            <div style={{ height: '60px' }} />
            <Trigger
                border={false}
            />
        </div>
    );
};

export default TriggerView;
