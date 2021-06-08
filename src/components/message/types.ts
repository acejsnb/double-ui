export interface Options {
    message: string
    type: string
    time?: number
}

export interface Props extends Options{
    remove(): void
}
