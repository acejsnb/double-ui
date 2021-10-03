import 'docs/public/app.styl';
import React from 'react';
import {
    HashRouter, Switch, Route, Redirect
} from 'react-router-dom';
import Header from 'docs/components/layout/Header';
// import Footer from './layout/Footer';
import Home from './layout/Home';
import DoubleUI from './double-ui/DoubleUI';
import JsTools from './js-func-tools/index';
import Blog from './blog/Blog';

const App = () => (
    <div className="docs-app">
        <HashRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/double-ui" component={DoubleUI} />
                <Route path="/jstools" component={JsTools} />
                <Route path="/blog" component={Blog} />
                <Redirect to="/" />
            </Switch>
        </HashRouter>
        {/* <Footer /> */}
    </div>
);

export default App;
