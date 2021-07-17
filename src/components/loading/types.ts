export interface Props {
    imgSrc: string
    type?: string
    size?: string | null
}
export interface IOptions extends Props {
    ele?: Element | DocumentFragment | null
}

export interface IReturn {
    close(): void
}
