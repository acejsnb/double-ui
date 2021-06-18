/**
 * 2021.06.16
 * 把动态创建的组件挂载到body上
 */
import { render, unmountComponentAtNode } from 'react-dom';

interface Props {
    [key: string]: any
}
export interface Instance {
    isMount: boolean
    ele: HTMLDivElement
    component: Function
    props: Props
    unmount(): void
    update(props: Props): void
}
type TRender = (component: Function, props: Props) => Instance;

const RenderToBody: TRender = (component, props) => ({
    isMount: false,
    ele: document.createElement('div'),
    component,
    props,
    unmount() {
        if (!this.isMount) return;
        unmountComponentAtNode(this.ele);
        document.body.removeChild(this.ele);
        this.isMount = false;
    },
    update(props) {
        // if (!props.show) return;
        const that = this;
        new Promise<void>((resolve) => {
            if (!that.isMount) {
                that.ele.style.position = 'absolute';
                that.ele.style.left = '0';
                that.ele.style.top = '0';
                document.body.appendChild(that.ele);
                render(that.component(props), that.ele);
                // render(that.reactDom, that.ele);
            }
            resolve();
        }).then(() => {
            // render(component(props), that.ele);
            // render(cloneElement(that.reactDom, props), that.ele);
            that.isMount = true;
        });
    }
});

export default RenderToBody;
