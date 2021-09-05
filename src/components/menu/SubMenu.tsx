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
    const { state: { openIds, collapsed = false } } = useContext(Context);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const [style, setStyle] = useState({});
    const [show, setShow] = useState(false);

    // 设置定位
    const setPositionStyle = () => {
        const { top = 0, right = 0 } = titleRef.current?.getBoundingClientRect() as DOMRect;
        setStyle({ top: `${top}px`, left: `${right + 20}px` });
    };
    // 设置style样式
    const changeStyle = (status: boolean) => {
        setStyle({ height: status ? `${Children.count(children) * 40}px` : 0 });
    };

    useEffect(() => {
        if (layout === 'position') return;
        changeStyle(!collapsed && openIds.includes(id));
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
            if (DUI_ITEM_TITLE_LEAVE) window.clearTimeout(DUI_ITEM_TITLE_LEAVE);
            DUI_ITEM_TITLE_ENTER = window.setTimeout(() => {
                setShow(status);
                setPositionStyle();
            }, 300);
        } else {
            DUI_ITEM_TITLE_LEAVE = window.setTimeout(() => {
                if (DUI_ITEM_TITLE_ENTER) window.clearTimeout(DUI_ITEM_TITLE_ENTER);
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
                hasChildNode={!!children}
                icon={icon}
                layout={layout}
                mouseHandle={mouseHandle}
            />
            {
                children && (
                    layout === 'position'
                        ? (
                            <CSSTransition in={show} timeout={120} mountOnEnter classNames="d-transition-menu">
                                <div
                                    className="d-sub-menu-children d-sub-menu-children-position"
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
