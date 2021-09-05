import React, { FC, useState } from 'react';
import Menu from '@/components/menu';
import Button from '@/components/button';
import HomeSvg from '@/assets/iconSvg/home.svg';

const Icon = <HomeSvg />;
const menuData = [
    {
        id: '00', name: '首页首页首页首页首页首页首页首页首页', Icon, url: '/shouye'
    },
    {
        id: '111',
        name: '菜单11',
        icon: Icon,
        children: [
            {
                id: '1-1',
                name: '菜单11-item1菜单菜单菜单菜单菜单菜单菜单菜单',
                children: [
                    { id: '1-1-1', name: 'item1-1item1item1item1item1item1item1', url: '/111' },
                    { id: '1-1-2', name: 'item1-2', url: '/112' },
                    { id: '1-1-3', name: 'item1-3', url: '/113' },
                    { id: '1-1-4', name: 'item1-4', url: '/114' }
                ]
            },
            { id: '1-2', name: '菜单11-item2', url: '/12' },
            { id: '1-3', name: '菜单11-item3', url: '/13' },
            { id: '1-4', name: '菜单11-item4', url: '/14' }
        ]
    },
    {
        id: '222',
        name: '菜单22',
        icon: Icon,
        children: [
            { id: '2-1', name: '菜单2-item1', url: '/21' }
        ]
    },
    {
        id: '333',
        name: '菜单33',
        icon: Icon,
        children: [
            { id: '3-1', name: '菜单3-item1', url: '/31' },
            { id: '3-2', name: '菜单3-item2', url: '/32' }
        ]
    },
    {
        id: '444',
        name: '菜单44',
        icon: Icon,
        children: [
            { id: '4-1', name: '菜单4-item1', url: '/41' },
            { id: '4-2', name: '菜单4-item2', url: '/42' },
            { id: '4-3', name: '菜单4-item3', url: '/43' }
        ]
    },
    {
        id: '555',
        name: '菜单55',
        icon: Icon,
        children: [
            { id: '5-1', name: '菜单5-item1', url: '/51' },
            { id: '5-2', name: '菜单5-item2', url: '/52' },
            { id: '5-3', name: '菜单5-item3', url: '/53' },
            { id: '5-4', name: '菜单5-item4', url: '/54' }
        ]
    },
    {
        id: '666', name: '666', Icon, url: '/666'
    },
    {
        id: '777', name: '777777777777777777777777777777777777777', Icon, url: '/777'
    },
    {
        id: '888', name: '888', Icon, url: '/888'
    }
];

const MenuView: FC = () => {
    const click = ({ id, name, url }: {[key: string]: any}) => {
        console.log(id, name, url);
    };
    const [selectedIds] = useState(['111', '1-1', '1-1-2']);
    // const [selectedIds] = useState(['00']);
    const [openIds] = useState(['111']);
    const [collapsed, seCollapsed] = useState(false);
    return (
        <div className="component-view">
            <Button click={() => seCollapsed((status) => !status)}>{collapsed.toString()}</Button>
            <br />
            <br />
            <div className="menu-view" style={{ backgroundColor: 'var(--grey-50)', width: `${collapsed ? 48 : 224}px`, transition: 'width .12s' }}>
                <Menu selectedIds={selectedIds} openIds={openIds} collapsed={collapsed} click={click}>
                    {menuData.map(({
                        id, name, url = '', children
                    }) => (
                        <Menu.SubMenu key={id} menuId={id} id={id} name={name} params={{ name, url }} icon={<HomeSvg />}>
                            {children?.map(({
                                id: subId, name: subName, url: subUrl = '', children: subChildren
                            }) => (
                                (subChildren && subChildren.length)
                                    ? (
                                        <Menu.SubMenu key={subId} menuId={`${id},${subId}`} id={subId} name={subName} params={{ name: subName, url: subUrl }} layout="position">
                                            {subChildren.map(({ id: threeId, name: threeName, url: threeUrl = '' }) => (
                                                <Menu.Item key={threeId} menuId={`${id},${subId},${threeId}`} id={threeId} params={{ name: threeName, url: threeUrl }}>{threeName}</Menu.Item>
                                            ))}
                                        </Menu.SubMenu>
                                    )
                                    : <Menu.Item key={subId} menuId={`${id},${subId}`} id={subId} params={{ name: subName, url: subUrl }}>{subName}</Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu>
            </div>
        </div>
    );
};

export default MenuView;
