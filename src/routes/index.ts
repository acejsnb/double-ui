import TestView from '@/views/TestView';

import ButtonView from '@/views/ButtonView';
import CascadeView from '@/views/CascadeView';
import CheckboxView from '@/views/CheckboxView';
import DividerView from '@/views/DividerView';
import DropGroupView from '@/views/DropGroupView';
import InputView from '@/views/InputView';
import LoadingView from '@/views/LoadingView';
import MessageView from '@/views/MessageView';
import ModalView from '@/views/ModalView';
import ProgressView from '@/views/ProgressView';
import TreeView from '@/views/TreeView';
import SelectView from '@/views/SelectView';
import TreeSelectView from '@/views/TreeSelectView';
import TriggerView from '@/views/TriggerView';

interface RouteItem {
    name: string
    path: string
    component: any
}

const routes: RouteItem[] = [
    { name: 'Test', path: '/testview', component: TestView },
    { name: 'Button', path: '/buttonview', component: ButtonView },
    { name: 'Cascade', path: '/cascadeview', component: CascadeView },
    { name: 'Checkbox', path: '/checkboxview', component: CheckboxView },
    { name: 'Divider', path: '/dividerview', component: DividerView },
    { name: 'DropGroup', path: '/dropgroupview', component: DropGroupView },
    { name: 'Input', path: '/inputview', component: InputView },
    { name: 'Loading', path: '/loadingview', component: LoadingView },
    { name: 'Message', path: '/messageview', component: MessageView },
    { name: 'Modal', path: '/modalview', component: ModalView },
    { name: 'Progress', path: '/progressview', component: ProgressView },
    { name: 'Tree', path: '/treeview', component: TreeView },
    { name: 'Select', path: '/selectview', component: SelectView },
    { name: 'TreeSelect', path: '/treeselectview', component: TreeSelectView },
    { name: 'Trigger', path: '/triggerview', component: TriggerView }
];

export type { RouteItem };
export default routes;
