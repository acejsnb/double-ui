export interface Props {
    type?: string
    size?: string | null
    imgSrc: string
}
export interface IOptions extends Props {
    ele?: Element | DocumentFragment | null
}

interface IReturn {
    close(): void
}

export type TLoading = (options: IOptions) => IReturn


