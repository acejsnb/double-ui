type Fn = (str: string) => number;
const GetCaptionWidth: Fn = (str) => {
    const { body } = document;
    const div = document.createElement('div');
    div.className = 'd-trigger-words d-trigger-title';
    div.innerText = str;
    div.style.position = 'absolute';
    div.style.zIndex = '-1';
    div.style.left = '0';
    div.style.bottom = '0';
    div.style.height = '0px';
    body.appendChild(div);
    const { width } = div.getBoundingClientRect();
    // const w = Math.ceil(width) + 8;
    const w = Math.ceil(width) + 8;
    body.removeChild(div);
    if (w > 98) return 98;
    // if (w > 106) return 106;
    return w;
};

export default GetCaptionWidth;
