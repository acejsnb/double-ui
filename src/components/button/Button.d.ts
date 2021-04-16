import './style.styl';
declare type Fn = () => void;
interface Props {
    type?: string;
    size?: string;
    disabled?: boolean;
    width?: string;
    children?: any;
    click?: Fn;
}
declare const Button: {
    (props: Props): JSX.Element;
    defaultProps: {
        type: string;
        size: string;
        disabled: boolean;
        width: string;
        children: string;
        click: () => void;
    };
};
export default Button;
