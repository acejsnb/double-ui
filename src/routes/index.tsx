import { ReactNode, ReactElement } from 'react';
import TestView from '@/views/TestView';

import ButtonView from '@/views/ButtonView';
import CascadeView from '@/views/CascadeView';
import CheckboxView from '@/views/CheckboxView';
import DividerView from '@/views/DividerView';
import DropGroupView from '@/views/DropGroupView';
import InputView from '@/views/InputView';
import LoadingView from '@/views/LoadingView';
import MessageView from '@/views/MessageView';
import MenuView from '@/views/MenuView';
import ModalView from '@/views/ModalView';
import ProgressView from '@/views/ProgressView';
import TreeView from '@/views/TreeView';
import SelectView from '@/views/SelectView';
import TreeSelectView from '@/views/TreeSelectView';
import TriggerView from '@/views/TriggerView';

interface RouteItem {
    name: string
    path: string
    element: ReactElement | ReactNode
}

const routes: RouteItem[] = [
    { name: 'Test', path: '/testview', element: <TestView /> },
    { name: 'Button', path: '/buttonview', element: <ButtonView /> },
    { name: 'Cascade', path: '/cascadeview', element: <CascadeView /> },
    { name: 'Checkbox', path: '/checkboxview', element: <CheckboxView /> },
    { name: 'Divider', path: '/dividerview', element: <DividerView /> },
    { name: 'DropGroup', path: '/dropgroupview', element: <DropGroupView /> },
    { name: 'Input', path: '/inputview', element: <InputView /> },
    { name: 'Loading', path: '/loadingview', element: <LoadingView /> },
    { name: 'Menu', path: '/menuview', element: <MenuView /> },
    { name: 'Message', path: '/messageview', element: <MessageView /> },
    { name: 'Modal', path: '/modalview', element: <ModalView /> },
    { name: 'Progress', path: '/progressview', element: <ProgressView /> },
    { name: 'Tree', path: '/treeview', element: <TreeView /> },
    { name: 'Select', path: '/selectview', element: <SelectView /> },
    { name: 'TreeSelect', path: '/treeselectview', element: <TreeSelectView /> },
    { name: 'Trigger', path: '/triggerview', element: <TriggerView /> }
];

export type { RouteItem };
export default routes;
