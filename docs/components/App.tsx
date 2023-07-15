import 'docs/public/app.styl';
import React from 'react';
import {
    HashRouter, Routes, Route
} from 'react-router-dom';
import Header from 'docs/components/layout/Header';
// import Footer from './layout/Footer';
import Home from './layout/Home';
import DoubleUI from './double-ui/DoubleUI';
import JsTools from './js-func-tools/index';
import Blog from './blog/Blog';

function App() {
    return (
        <div className="docs-app">
            <HashRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/double-ui" element={<DoubleUI />} />
                    <Route path="/jstools" element={<JsTools />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </HashRouter>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
