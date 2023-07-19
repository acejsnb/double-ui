export interface Props {
    imgSrc: string
    type?: string
    size?: string | number
}
export interface IOptions extends Props {
    ele?: Element | DocumentFragment | null
}

export interface IReturn {
    close(): void
}

declare function LoadingInstance(props: Props): JSX.Element
type TypeLoading = typeof LoadingInstance
interface LoadingInterface extends TypeLoading{
    global(imgSrc: string): TypeLoading
    local(imgSrc: string, ele?: Element | DocumentFragment | null): TypeLoading
}

declare const Loading: LoadingInterface;
export default Loading;
