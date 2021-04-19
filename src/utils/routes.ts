import ButtonView from '../views/ButtonView';
import DropdownView from '../views/DropdownView';

export interface routerProps {
    name: string
    path: string
    component: any
}

const routes: routerProps[] = [
    { name: 'Button', path: '/buttonview', component: ButtonView },
    { name: 'Dropdown', path: '/dropdownview', component: DropdownView }
];

export default routes;
