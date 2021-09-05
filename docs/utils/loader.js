const MD = require('markdown-it');

const tags = ['h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'pre', 'p', 'table'];

const ReactMdComponent = (jsx) => `
    import React from 'react';
    const Component = () => (<div className="dui-md-container">${jsx.replace(/class=/g, 'className=').replace(/tabindex/g, 'tabIndex')}</div>);
    export default Component;
    `;
const VueMdComponent = (html) => `<templete><div class="dui-md-container">${html}</div></templete>`;

exports.default = async function (source) {
    const loaderContext = this;
    const { async, query } = loaderContext;
    const type = query?.type ?? 'react';
    const callback = async();
    try {
        const md = new MD({
            html: true,
            xhtmlOut: true,
            breaks: true,
            linkify: true,
            typographer: false
        });

        let html = md.render(source)
            .replace(/{/g, '{"{"{')
            .replace(/}/g, '{"}"}')
            .replace(/{"{"{/g, '{"{"}')
            .replace(/(\n)/g, '{"\\n"}');
        tags.forEach((tag) => {
            html = html.replace(new RegExp(`<${tag}(([\s\S])*?)>`, 'gi'), `<${tag} class="dui-md-${tag}">`);
        });
        let result;
        if (type === 'react') result = ReactMdComponent(html);
        else if (type === 'vue') result = VueMdComponent(html);
        else result = html;

        callback(null, result);
    } catch (err) {
        callback(null, err.toString());
    }
};
