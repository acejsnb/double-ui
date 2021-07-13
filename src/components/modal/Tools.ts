type CB = () => void;
const ListenEsc = (e: KeyboardEvent, cb: CB) => {
    if (e.keyCode) cb();
};

export default ListenEsc;
