import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Cpu, Instagram, Mail, Menu, Play, Smartphone, Gamepad2, Monitor, Sparkles, X, Youtube, Zap } from 'lucide-react';
import { creator, videos, services } from './siteData';
import './styles.css';

const icons = { Smartphone, Gamepad2, Monitor, Sparkles, Cpu, Zap };

function Stat({ value, label }) {
  return <div className="stat"><strong>{value}</strong><span>{label}</span></div>;
}

function VideoCard({ video, onOpen }) {
  const [failed, setFailed] = useState(false);
  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(video.src || '') || (video.src || '').startsWith('/videos/');
  return (
    <button className="video-card" onClick={() => onOpen(video)} aria-label={`Play ${video.title}`}>
      <div className="video-thumb">
        {video.thumbnail ? <img src={video.thumbnail} alt="" loading="lazy" /> :
          isDirectVideo && !failed ? <video src={video.src} muted playsInline preload="metadata" onError={() => setFailed(true)} /> :
          <div className="thumb-placeholder"><span className="thumb-kicker">{video.category}</span><span className="thumb-title">{video.title}</span><span className="thumb-note">VIDEO PREVIEW</span></div>}
        <span className="play-button"><Play size={18} fill="currentColor" /></span>
        <span className="video-index">{String(video.id).padStart(2, '0')}</span>
      </div>
      <div className="video-meta"><span>{video.category}</span><ArrowUpRight size={16}/></div>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
    </button>
  );
}

function VideoModal({ video, onClose }) {
  if (!video) return null;
  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(video.src || '') || (video.src || '').startsWith('/videos/');
  return <div className="modal-backdrop" onClick={onClose} role="presentation">
    <div className="video-modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Close video"><X size={20}/></button>
      {isDirectVideo && video.src ? <video className="modal-player" src={video.src} controls autoPlay playsInline /> :
        video.embedUrl ? <iframe className="modal-player" src={video.embedUrl} title={video.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> :
        <div className="modal-empty"><Play size={30}/><h3>Add this video's direct MP4 URL</h3><p>Open <code>src/siteData.js</code> and replace this video's <code>src</code> with a direct video file URL.</p></div>}
      <div className="modal-caption"><span>{video.category}</span><h2>{video.title}</h2><p>{video.description}</p></div>
    </div>
  </div>;
}

function App() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [['About', '#about'], ['Portfolio', '#portfolio'], ['Partnerships', '#partnerships'], ['Contact', '#contact']];
  return <div className="site-shell">
    <div className="announcement"><span className="status-dot"/> SOUTH AFRICAN TECH CREATOR <span className="announce-divider">/</span> MEDIA KIT 2026</div>
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label="TechThabelo home"><span className="wordmark-icon"><Cpu size={19}/></span><span>TECH<span className="wordmark-light">THABELO</span></span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>{navLinks.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact">Work with me <ArrowUpRight size={15}/></a></nav>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> INDEPENDENT TECH CREATOR · CAPE TOWN, SA</div>
          <h1>Making tech<br/>make <em>sense.</em></h1>
          <p className="hero-intro">I'm Thabelo — a South African creator making technology easier to understand, more exciting to explore, and simpler to shop for.</p>
          <div className="hero-actions"><a className="button button-light" href="#portfolio">Explore my work <ArrowDownRight size={17}/></a><a className="text-link" href={`mailto:${creator.email}`}>Discuss a partnership <ArrowUpRight size={16}/></a></div>
          <div className="hero-footnote"><span>01 / CREATOR PORTFOLIO</span><span>TECH · GAMING · SMARTPHONES</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract technology-inspired artwork">
          <div className="art-grid"></div><div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div><div className="art-core"><Cpu size={56} strokeWidth={1.1}/></div>
          <div className="art-label art-label-top">TECHTHABELO® <span>2026</span></div>
          <div className="art-label art-label-bottom"><span>BUILT FOR THE CURIOUS</span><ArrowUpRight size={18}/></div>
          <div className="art-number">TT—026</div>
        </div>
      </section>

      <section className="stats-band">
        <div className="stats-inner">
          <div className="stats-heading"><span className="section-number">01</span><p>THE COMMUNITY</p></div>
          <Stat value={creator.tiktokFollowers} label="TikTok followers"/>
          <Stat value={creator.youtubeSubscribers} label="YouTube subscribers"/>
          <Stat value={creator.instagramFollowers} label="Instagram followers"/>
          <div className="stats-note">Audience figures should be updated from your latest platform analytics.</div>
        </div>
      </section>

      <section className="about section-wrap" id="about">
        <div className="section-heading"><div><span className="section-number">02 / ABOUT</span><h2>Curiosity meets<br/><em>technology.</em></h2></div><p className="section-aside">Useful tech. Real opinions.<br/>Content made for everyday people.</p></div>
        <div className="about-grid">
          <div className="about-quote"><span className="quote-mark">“</span><p>Helping people discover the right tech and make smarter buying decisions — without making it complicated.</p><span className="quote-caption">THE TECHTHABELO APPROACH</span></div>
          <div className="about-copy"><p>TechThabelo is a South African tech content brand focused on smartphones, gaming, PC builds, accessories and emerging technology. I create short-form videos that break down products, compare options and help viewers understand what is actually worth their money.</p><p>From budget gaming setups to smartphone buying advice, the goal is to make tech practical, entertaining and accessible.</p><div className="topic-tags">{creator.topics.map(t => <span key={t}>{t}</span>)}</div></div>
        </div>
      </section>

      <section className="portfolio section-wrap" id="portfolio">
        <div className="section-heading"><div><span className="section-number">03 / SELECTED WORK</span><h2>Made to be<br/><em>watched.</em></h2></div><p className="section-aside">A selection of content across tech,<br/>gaming and buying advice.</p></div>
        <div className="portfolio-topline"><span>VIDEO PORTFOLIO</span><span>{String(videos.length).padStart(2, '0')} FEATURED PROJECTS <span className="tiny-dot"/></span></div>
        <div className="video-grid">{videos.map(video => <VideoCard key={video.id} video={video} onOpen={setActiveVideo}/>)}</div>
        <p className="portfolio-tip"><Play size={14}/> Select a project to play it. Add your direct MP4 URLs in <code>src/siteData.js</code>.</p>
      </section>

      <section className="partnerships" id="partnerships">
        <div className="section-wrap partnership-inner">
          <div className="section-heading"><div><span className="section-number">04 / PARTNERSHIPS</span><h2>Let's make<br/><em>something useful.</em></h2></div><p className="section-aside">Creative collaborations built around<br/>products people want to understand.</p></div>
          <div className="service-grid">{services.map((service, i) => { const Icon = icons[service.icon] || Zap; return <div className="service-card" key={service.title}><span className="service-num">0{i+1}</span><div className="service-icon"><Icon size={21} strokeWidth={1.5}/></div><h3>{service.title}</h3><p>{service.description}</p><ArrowUpRight className="service-arrow" size={18}/></div>; })}</div>
          <div className="partnership-note"><Sparkles size={17}/><p>Have a product or campaign in mind? Get in touch and let's discuss a collaboration that fits the brand and the audience.</p></div>
        </div>
      </section>

      <section className="contact section-wrap" id="contact">
        <div className="contact-top"><span className="section-number">05 / GET IN TOUCH</span><span className="contact-open"><span className="status-dot"/> OPEN TO SELECT PARTNERSHIPS</span></div>
        <h2>Got something<br/>worth <em>showing?</em></h2>
        <p className="contact-intro">For product reviews, sponsored content, unboxings and other tech partnerships, reach out directly.</p>
        <a className="email-link" href={`mailto:${creator.email}`}><span><Mail size={20}/>{creator.email}</span><ArrowUpRight size={22}/></a>
        <div className="social-links">
          <a href={creator.tiktokUrl} target="_blank" rel="noreferrer">TikTok <ArrowUpRight size={15}/></a>
          <a href={creator.youtubeUrl} target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={15}/></a>
          <a href={creator.instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15}/></a>
        </div>
      </section>
    </main>
    <footer className="footer"><a className="wordmark" href="#top"><span className="wordmark-icon"><Cpu size={17}/></span><span>TECH<span className="wordmark-light">THABELO</span></span></a><span>INDEPENDENT TECH CREATOR · SOUTH AFRICA</span><span>© 2026 TECHTHABELO</span></footer>
    <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)}/>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);