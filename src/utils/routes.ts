import ButtonView from '@/views/ButtonView';
import DropdownView from '@/views/DropdownView';
import DropGroupView from '@/views/DropGroupView';
import MessageView from '@/views/MessageView';

export interface routerProps {
    name: string
    path: string
    component: any
}

const routes: routerProps[] = [
    { name: 'Button', path: '/buttonview', component: ButtonView },
    { name: 'Dropdown', path: '/dropdownview', component: DropdownView },
    { name: 'DropGroup', path: '/dropgroupview', component: DropGroupView },
    { name: 'Message', path: '/messageview', component: MessageView }
];

export default routes;
