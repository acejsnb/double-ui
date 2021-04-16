import ButtonView from '../views/ButtonView';

export interface routerProps {
    name: string
    path: string
    component: any
}

const routes:routerProps[] = [
    { name: 'Button', path: '/buttonview', component: ButtonView }
];

export default routes;
