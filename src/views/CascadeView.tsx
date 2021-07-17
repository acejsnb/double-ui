import React from 'react';
import Cascade from '@/components/cascade';

const data = [
    {
        parentId: '-1',
        id: '111',
        name: '切换集团',
        subhead: '万达实业集团',
        children: [
            { parentId: '111', id: '111-1', name: '万达实业集团' },
            { parentId: '111', id: '111-2', name: '华润发展' },
            { parentId: '111', id: '111-3', name: '龙湖世纪地产集团' }
        ]
    },
    {
        parentId: '-1',
        id: '222',
        name: '四川省',
        children: [
            { parentId: '222', id: '222-1', name: '成都市' },
            { parentId: '222', id: '222-2', name: '内江市' },
            {
                parentId: '222',
                id: '222-3',
                name: '双流区',
                children: [
                    { parentId: '222-3', id: '222-3-1', name: '东升街道' },
                    { parentId: '222-3', id: '222-3-2', name: '华阳街道' },
                    { parentId: '222-3', id: '222-3-3', name: '怡兴湖街道' }
                ]
            }
        ]
    },
    { parentId: '-1', id: '333', name: '修改手机号' },
    { parentId: '-1', id: '444', name: '退出登录' }
];

const CascadeView = () => {
    const change = (id: string, pid: string, item: any) => {
        console.log('change', id, pid, item);
    };
    return (
        <div className="component-view">
            <Cascade data={data} />
            <div style={{ paddingTop: '40px', textAlign: 'right' }}>
                <Cascade width={240} border={false} data={data} reverse change={change} />
            </div>
        </div>
    );
};

export default CascadeView;
