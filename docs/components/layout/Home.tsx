import './home.styl';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'docs/public/avatar.jpeg';
import Footer from './Footer';

const Home = () => {
    // 设置动画状态
    const [play, setPlay] = useState(true);
    const transitionEnd = () => {
        setPlay(false);
    };
    const mouseEnter = () => {
        if (!play) setPlay(true);
    };

    return (
        <>
            <main className="docs-main docs-h">
                <Link to="/double-ui" className="docs-head-portrait"><img src={Avatar} alt="" /></Link>
                <section className="docs-username"><strong>我友几个逗逼</strong></section>
                <section
                    className={['docs-desc', play && 'docs-desc-play'].join(' ')}
                    onAnimationEnd={transitionEnd}
                    onMouseEnter={mouseEnter}
                >
                    一个爱学习的前端码农。
                </section>
                <section className="docs-tip">**博客系统完善中...**</section>
                <Link className="docs-entry" to="/double-ui">
                    <span className="docs-soon">👉</span>
                    <span className="docs-start"><strong>ENTER</strong></span>
                </Link>
            </main>
            <Footer />
        </>
    );
};

export default Home;
