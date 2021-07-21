type CB = () => void;
const ListenEsc = (e: KeyboardEvent, cb: CB | undefined) => {
    if (e.keyCode) cb?.();
};

export default ListenEsc;
