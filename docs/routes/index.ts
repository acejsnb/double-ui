import { Modules } from './types';

const getModules = (files: any) => {
    const modules: Modules[] = [];
    const keys = files.keys();
    keys.forEach((key: any) => {
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
const Routes = () => {
    const files = require.context('docs/pages/md', true, /index.tsx$/);
    return getModules(files);
};

const BlogRoutes = () => {
    const files = require.context('docs/posts', true, /index.md$/);
    return getModules(files);
};

export { BlogRoutes };

export default Routes;
