import TestView from '@/views/TestView';

import ButtonView from '@/views/ButtonView';
import CheckboxView from '@/views/CheckboxView';
import DividerView from '@/views/DividerView';
import DropdownView from '@/views/DropdownView';
import DropGroupView from '@/views/DropGroupView';
import LoadingView from '@/views/LoadingView';
import MessageView from '@/views/MessageView';
import TreeView from '@/views/TreeView';
import TriggerView from '@/views/TriggerView';

export interface routerProps {
    name: string
    path: string
    component: any
}

const routes: routerProps[] = [
    { name: 'Test', path: '/testview', component: TestView },
    { name: 'Button', path: '/buttonview', component: ButtonView },
    { name: 'Checkbox', path: '/checkboxview', component: CheckboxView },
    { name: 'Divider', path: '/dividerview', component: DividerView },
    { name: 'Dropdown', path: '/dropdownview', component: DropdownView },
    { name: 'DropGroup', path: '/dropgroupview', component: DropGroupView },
    { name: 'Loading', path: '/loadingview', component: LoadingView },
    { name: 'Message', path: '/messageview', component: MessageView },
    { name: 'Tree', path: '/treeview', component: TreeView },
    { name: 'Trigger', path: '/triggerview', component: TriggerView }
];

export default routes;
