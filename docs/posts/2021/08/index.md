# react hooks/vue2/vue3 + qiankun微服务踩坑记

![预览效果](/blog/images/210830-view.gif)

### 一、开始前来点前奏
话说iframe是最好的微服务解决方案，不过它有一些无法解决的致命弱点，即使可以解决的问题体验上也不是很好，所以今天这篇文章就来学习一下使用蚂蚁开源的qiankun来解决一些场景的问题。

[qiankun优点请阅读官方吹牛逼的文档-click me]( https://qiankun.umijs.org/zh/guide)

本次升级使用qiankun也是看了qiankun官方吹牛逼的文档，说实话对个人而言，这个牛他们吹得还挺成功的（我没更好的选择）。

使用qiankun之前，个人在项目中也确实遇到了一些问题，这里我把个人在项目中使用iframe遇到的问题与qiankun做了一个对比，请看以下表格：
![question](/blog/images/210830-question.png)

### 二、技术栈
- 主应用：react hooks + webpack5
- 微应用：vue2/vue3 + webpack4 (目前针对webpack5的微应用还没研究过)

### 三、主应用实现
1. 项目结构
   ![项目结构](/blog/images/210830-xiangmujiegou.png)

2. 这里在App.tsx中定义了两个路由，`/` - Home、`/login` - Login

3. config.ts中导出一些配置，这里导出一个prefix，也就是basename（vue中叫base）

4. Login组件中什么功能也没有，这里用来做切换路由演示；Home组件注册微应用，监听主/微应用状态变化
   ![Login](/blog/images/210830-login.png)

5. 微应用在Home组件中注册，这里单独抽了一个registerApp.ts，请看代码
```ts
import {
    registerMicroApps, start, initGlobalState, MicroAppStateActions
} from 'qiankun';
import { prefix } from './config';

export interface AppItem {
    name: string
    entry: string
    container: string
    activeRule: string
}
export type { MicroAppStateActions };

// 注册微应用
const registerApp = (apps: AppItem[]) => {
    registerMicroApps(apps);
    // 启动
    start({ prefetch: true });
};

const initialState = { closeLoading: false };
// 全局方法
const globalActions: MicroAppStateActions = initGlobalState(initialState);

interface ILItem {
    name: string
    entry: string
}
// 微应用list
const appList: ILItem[] = [
    { name: 'app1', entry: '//192.168.1.6:2001' },
    { name: 'vue3', entry: '//192.168.1.6:2002' }
];
const microApps = appList?.map(({ name, entry }) => ({
    name,
    entry,
    container: '#microApp',
    activeRule: `${prefix}/${name}`,
    props: { prefix: `${prefix}/${name}`, entry }
})) ?? [];

export { globalActions, microApps };

export default registerApp;

```
- registerMicroApps - 注册微应用api
- start - 启动
- initGlobalState - 初始化全局参数（主应用与微应用的共享参数），返回的是一个函数
- MicroAppStateActions - 共享参数的type
- 导出registerApp、globalActions、microApps备用
- microApps
    - 建议name属性与微应用的打包打出属性名相同，避免混乱
    - entry: 原则上只需要配置子应用的IP + 端口（域名），不过在咱们真实生产或测试环境中，一个服务器（同一个IP）可能会配置N+个项目，如：
      子应用是用过 `http://192.168.1.6:2001/xxx` 来访问首页（这里xxx表示子应用部署的目录），***此时咱们需要把 `entry: '//192.168.1.6:2001'` 改成 `entry: '//192.168.1.6:2001/xxx/index.html'` ***，否则fetch请求不到js、css等静态资源，微应用也就不能加载成功，entry不用加http(s)，跟随主应用协议
    - container：子应用要挂载到的dom id
    - 微应用加载主要是匹配activeRule来激活，如果主应用不是部署到服务器根目录需要把config中的prefix传给子应用，所以子应用在注册路由时的base参数应设置为props.prefix
    - props: 子应用可在生命周期中拿到（以下会在子应用demo中演示）

6. 在Home组件倒入registerApp，待加载完成后注册微应用
   ![register](/blog/images/210830-register.png)
- 注意：这里建议在 'componentDidMount' 后注册微应用，以防止找不到dom
- 此例中做一屏展示，header部分高度为49px，且header会一直显示在页面上，所以main部分的高度需要减去49px
  ![header](/blog/images/210830-header.png)
- div[id^="__qiankun"]是个什么鬼？
  ![id="__qiankun_xxx"](/blog/images/210830-qiankun_xxx.png)
    - qinkun会自动在main中插入一个由他定义且有参数的div
    - 这里需要给这个div也设置一个高度，否则微应用内容不够会撑不满高度，***当然在您的项目中视情况而定***

### 四、微应用实现
1. 在src目录下新建 `public-path.js` ，并在 `main.js` 中引入
   ![public-path](/blog/images/210830-public-path.png)
2. main.js中需要导出 `bootstrap , mount, unmount ` 三个生命周期钩子，不管有没有用，按照要求导出就对了
- bootstrap 初始化
- mount 挂载
- unmount 卸载
3. 为了使微应用可以独立运行，这里获取qiankun的全局变量 `const isQK = window.__POWERED_BY_QIANKUN__` ，如果不是在qiankun环境下运行，获取到的isQK值为false
4. 设置vue实例和路由，这里建议把路由按照如下示例来写，在微应用卸载的时候将实例和路由有销毁，以便更好的垃圾回收
5. vue2🌰
```js
import './public-path';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './views/App';

Vue.use(VueRouter);

// qiankun window全局变量
const isQK = window.__POWERED_BY_QIANKUN__;

// 路由
let instance = null, // vue实例
    router = null; // 路由

// vue挂载函数
const render = (props = {}) => {
    router = new VueRouter({
        mode: 'history',
        base: isQK ? props.prefix : '/',
        routes
    });
    const { container } = props;
    instance = new Vue({
        router,
        render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app');
};
// 独立运行
if (!isQK) render();

/* 微应用运行 start */
export async function bootstrap(props) {
    // console.log('[vue] apm app bootstraped');
    // 微应用初始化 - 这里可以获取主应用传来的base前缀
}
export async function mount(props) {
    console.log('[vue] props from main framework', props);
    // 微应用挂载
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        // console.log('===子应用====', state, prev);
    });
    setTimeout(() => {
        // 例子 - 关闭局部loading
        props.setGlobalState({ closeLoading: true });
    }, 3000);
    render(props);
}
export async function unmount() {
    // 微应用卸载
    instance.$destroy(); // 销毁vue实例
    instance.$el.innerHTML = ''; // 将实例的dom设置为空
    instance = null; // 清空实例
    router = null; // 清空路由
}
/* 微应用运行 end */
```
6. vue3🌰
```js
import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App';
import routes from './routes';

// qiankun window全局变量
const isQK = window.__POWERED_BY_QIANKUN__;

let app = null,
    router = null;

const render = (props = {}) => {
    const { container } = props;
    router = createRouter({
        history: createWebHistory(isQK ? props.prefix : '/'),
        routes
    });
    app = createApp(App);
    app.use(router);

    app.mount(container ? container.querySelector('#vue3') : '#vue3');
};

// 独立运行
if (!isQK) render();

// 初始化
export async function bootstrap() {
    console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}
// 挂载
export async function mount(props) {
    setTimeout(() => {
        // 例子 - 关闭局部loading
        props.setGlobalState({ closeLoading: true });
        console.log('-------关闭局部loading---------');
    }, 3000);
    render(props);
    console.log('app=======', app);
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        // console.log('===子应用====', state, prev);
        console.log('===子应用====', state);
    });
}
// 销毁
export async function unmount() {
    app.unmount();
    app._container.innerHTML = '';
    app = null;
    router = null;
}
```
7. 主应用与微应用通信
- 主应用可以通过初始化时props把值传递给子应用
  ![props](/blog/images/210830-props.png)
- 主应用也可以通过 `globalActions.setGlobalState` 函数设置全局参数
  ![globalActions.setGlobalState](/blog/images/210830-globalActionssetGlobalState.png)
- 当主应用调用 globalActions.setGlobalState 后，子应用怎么接收呢？就是以上示例中的 `props.onGlobalStateChange` 方法，该方法接收一个函数，函数有两个参数：第一个（state）为变更后的状态，第二（prev）个为变更前的状态
  ![props.onGlobalStateChange](/blog/images/210830-propsonGlobalStateChange.png)
8. 微应用与主应用通信
- 微应用调用 `props.setGlobalState`
- 主应用在 `globalActions.onGlobalStateChange` 中监听微应用发送的参数
  ![props.setGlobalState](/blog/images/210830-propssetGlobalState.png)
- 微应用可以把mount接收到的props保存到Store中

### 五、使用qiankun遇到的坑及注意问题
1. 跨域问题
2. 微应用不是部署在根目录问题
3. css中引入的font问题
4. 静态资源使用相对路径问题
5. 微应用内容不够，高度问题（本🌰）

### 六、总结
如果站在巨人的高度纵观全局，微应用就是一个组件（这个我身边一个大佬一句话描述的），微应用提供一些方法给主应用，供主应用调用，如果您写过组件（npm包）会更好的理解这点。
期望不就得将来，新一代iframe面世就不用瞎折腾这些问题了。
***如果需要demo源码的小哥哥小姐姐可以在评论区留下邮箱***


