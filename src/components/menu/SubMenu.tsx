import './style.styl';
import React, {
    FC, useContext, useState, Children, useEffect, useRef
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { SubMenuProps } from './types';
import Context from './Context';
import ItemTitle from './ItemTitle';

let DUI_ITEM_TITLE_ENTER: number; // children 显示timer
let DUI_ITEM_TITLE_LEAVE: number;
const SubMenu: FC<SubMenuProps> = ({
    id, menuId, name,
    params = {},
    icon,
    layout = 'tile',
    children
}) => {
    const { state: { selectedIds, openIds, collapsed = false } } = useContext(Context);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const [style, setStyle] = useState({});
    const [show, setShow] = useState(false);
    const [hasChildNode, setHasChildNode] = useState(false);
    useEffect(() => {
        setHasChildNode(!!Children.count(children));
    }, [children]);

    // 设置定位
    const setPositionStyle = () => {
        const { top = 0, right = 0 } = titleRef.current?.getBoundingClientRect() as DOMRect;
        setStyle({ top: `${top}px`, left: `${right + (collapsed ? 8 : 20)}px`, maxHeight: '100vh' });
    };
    // 设置style样式
    const changeStyle = (status: boolean) => {
        if (status) setStyle({ maxHeight: '100vh' });
        else setStyle({ maxHeight: 0 });
    };

    // 监听折叠/收起
    useEffect(() => {
        if (!collapsed) changeStyle(!collapsed && openIds.includes(id));
    }, [collapsed]);
    // 监听展开项数据ids
    useEffect(() => {
        if (layout === 'position') {
            setPositionStyle();
            return;
        }
        changeStyle(openIds.includes(id));
    }, [openIds]);

    // 监听鼠标在当前title上移入移除
    const mouseHandle = (status: boolean) => {
        if (status) {
            DUI_ITEM_TITLE_ENTER = window.setTimeout(() => {
                if (DUI_ITEM_TITLE_LEAVE) window.clearTimeout(DUI_ITEM_TITLE_LEAVE);
                setShow(status);
                setPositionStyle();
            }, 300);
        } else {
            if (DUI_ITEM_TITLE_ENTER) window.clearTimeout(DUI_ITEM_TITLE_ENTER);
            DUI_ITEM_TITLE_LEAVE = window.setTimeout(() => {
                setShow(status);
            }, 300);
        }
    };
    // 监听鼠标进入子项dom上
    const childrenEnter = () => {
        if (DUI_ITEM_TITLE_LEAVE) window.clearTimeout(DUI_ITEM_TITLE_LEAVE);
    };
    // 监听鼠标离开子项dom上
    const childrenLeave = () => {
        mouseHandle(false);
    };

    useEffect(() => () => {
        // 选中
        setShow(false);
    }, [selectedIds]);

    useEffect(() => () => {
        if (DUI_ITEM_TITLE_ENTER) window.clearTimeout(DUI_ITEM_TITLE_ENTER);
        if (DUI_ITEM_TITLE_LEAVE) window.clearTimeout(DUI_ITEM_TITLE_LEAVE);
    }, []);

    return (
        <div className="d-sub-menu">
            <ItemTitle
                ref={titleRef}
                id={id}
                menuId={menuId}
                params={params}
                name={name}
                hasChildNode={hasChildNode}
                icon={icon}
                layout={layout}
                mouseHandle={mouseHandle}
            />
            {
                hasChildNode && (
                    layout === 'position'
                        ? (
                            <CSSTransition in={show} timeout={120} mountOnEnter classNames="d-transition-menu">
                                <div
                                    className={['d-sub-menu-children', 'd-sub-menu-children-position', collapsed && 'd-sub-menu-children-collapsed'].filter((d) => d).join(' ')}
                                    data-name={collapsed ? name : ''}
                                    data-id={id}
                                    style={style}
                                    onMouseEnter={childrenEnter}
                                    onMouseLeave={childrenLeave}
                                >
                                    {children}
                                </div>
                            </CSSTransition>
                        )
                        : (
                            <div
                                className="d-sub-menu-children d-sub-menu-children-tile"
                                style={style}
                            >
                                {children}
                            </div>
                        )
                )
            }
        </div>
    );
};

export default SubMenu;
