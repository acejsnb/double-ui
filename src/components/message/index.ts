export interface Options {
    message: string
    type: string
    time?: number
    zIndex?: number
}

export interface Props extends Options{
    remove(): void
}

declare function MessageInstance(props: Props): void
type TypeMessage = typeof MessageInstance
type MessageFunction = (message: string, time?: number) => TypeMessage
type Separate = (type: string) => MessageFunction

export interface MessageInterface extends TypeMessage{
    info(message: string, time?: number): Separate
    success(message: string, time?: number): Separate
    warning(message: string, time?: number): Separate
    error(message: string, time?: number): Separate
}

declare const Message: MessageInterface;
export default Message;
