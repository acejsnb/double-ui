// 获取路由
export interface Modules {
    id: string
    name: string
    path: string
    component: any
}
const Routes = () => {
    const modules: Modules[] = [];
    const files = require.context('docs/posts', true, /index.md$/);
    const keys = files.keys();
    keys.forEach((key) => {
        const path = key.substring(2).split('/')[0];
        const na = path.split('');
        na[0] = na[0].toUpperCase();
        const name = na.join('');
        modules.push({
            id: Math.random().toString(), name, path: `/${path}`, component: files(key).default ?? files(key)
        });
    });
    return modules;
};

export default Routes;

