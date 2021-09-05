import MenuInstance from './Menu';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';

type TypeMenu = typeof MenuInstance
interface MenuInterface extends TypeMenu{
    SubMenu: typeof SubMenu
    Item: typeof MenuItem
}

const Menu = MenuInstance as MenuInterface;
Menu.SubMenu = SubMenu;
Menu.Item = MenuItem;

export default Menu;
