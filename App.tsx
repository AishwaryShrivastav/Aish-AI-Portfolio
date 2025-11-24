
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ChevronDown, Lock, Unlock, X } from 'lucide-react';
import { SEED_DATA } from './constants';
import { SiteConfig } from './types';
import SectionRenderer from './components/SectionRenderer';
import CMS from './components/CMS';
import AIChat from './components/AIChat';

function App() {
  const [siteData, setSiteData] = useState<SiteConfig>(SEED_DATA);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  
  // Footer CMS Auth State
  const [showFooterAuth, setShowFooterAuth] = useState(false);
  const [footerAuthCode, setFooterAuthCode] = useState('');

  useEffect(() => {
    // Load and Update Analytics
    const stored = localStorage.getItem('site_data');
    let currentData = stored ? JSON.parse(stored) : SEED_DATA;

    // Ensure analytics object exists
    if (!currentData.analytics) {
        currentData.analytics = {
            totalVisits: 0,
            lastVisit: new Date().toISOString(),
            devices: { mobile: 0, desktop: 0 }
        };
    }

    // Update Visits
    currentData.analytics.totalVisits += 1;
    currentData.analytics.lastVisit = new Date().toISOString();

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        currentData.analytics.devices.mobile += 1;
    } else {
        currentData.analytics.devices.desktop += 1;
    }

    // Save updated data
    setSiteData(currentData);
    localStorage.setItem('site_data', JSON.stringify(currentData));
  }, []);

  // Rotating Text Logic
  useEffect(() => {
    if (!siteData.hero.rotatingWords || siteData.hero.rotatingWords.length === 0) return;
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % siteData.hero.rotatingWords.length);
    }, 2500); // Rotate every 2.5 seconds
    return () => clearInterval(interval);
  }, [siteData.hero.rotatingWords]);

  const handleSaveCMS = (newData: SiteConfig) => {
    setSiteData(newData);
    localStorage.setItem('site_data', JSON.stringify(newData));
  };
  
  const submitFooterAuth = () => {
    if (footerAuthCode.trim() === "iamSAI!^35") {
        setShowFooterAuth(false);
        setFooterAuthCode('');
        setIsCMSOpen(true);
    } else {
        alert("ACCESS DENIED");
        setFooterAuthCode('');
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden snap-y snap-proximity h-screen overflow-y-scroll no-scrollbar scroll-smooth">
      
      {/* CMS Modal */}
      <AnimatePresence>
        {isCMSOpen && (
            <CMS 
                data={siteData} 
                onSave={handleSaveCMS} 
                onClose={() => setIsCMSOpen(false)} 
            />
        )}
      </AnimatePresence>

      {/* AI Chat with Admin Access and Context */}
      <AIChat 
        config={siteData.aiConfig}
        fullSiteData={siteData} 
        onOpenCMS={() => setIsCMSOpen(true)}
      />

      {/* Hero Section */}
      <section id="hero" className="snap-start snap-always min-h-[100dvh] w-full relative flex items-center justify-center overflow-hidden">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-slate-950/70 z-10"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/80 z-10"></div>
             <img src={siteData.hero.bgImage} className="w-full h-full object-cover opacity-60" alt="Hero Background" />
         </div>
         
         {/* Grid Overlay */}
         <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
         
         {/* Content */}
         <div className="relative z-20 text-center px-4 w-full max-w-7xl mx-auto flex flex-col justify-center h-full pt-16 md:pt-0">
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center w-full"
             >
                 {/* Main Title - No Container */}
                 <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-50 to-slate-400 mb-6 md:mb-4 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)] tracking-tighter leading-[0.9] select-none">
                     {siteData.hero.title}
                 </h1>

                 {/* Subtitle Line */}
                 <p className="text-sm sm:text-xl md:text-2xl font-mono text-cyan-400/90 uppercase tracking-[0.3em] mb-4 md:mb-6 font-medium">
                     {siteData.hero.subtitle}
                 </p>
                 
                 {/* Rotating Text Line (Centered Below) */}
                 {siteData.hero.showRotatingText !== false && (
                    <div className="h-10 md:h-16 overflow-hidden flex justify-center items-center mb-8 md:mb-10">
                        <AnimatePresence mode='wait'>
                           <motion.span
                               key={rotatingIndex}
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               exit={{ opacity: 0, y: -20 }}
                               transition={{ duration: 0.4 }}
                               className="font-bold font-orbitron text-fuchsia-400 text-2xl sm:text-3xl md:text-5xl drop-shadow-[0_0_15px_rgba(232,121,249,0.4)]"
                           >
                               {siteData.hero.rotatingWords[rotatingIndex]}
                           </motion.span>
                       </AnimatePresence>
                    </div>
                 )}
                 
                 {/* Experience & Tech Chips */}
                 <div className="mb-10 md:mb-16 max-w-xs sm:max-w-xl md:max-w-4xl mx-auto">
                    <p className="text-slate-300 font-rajdhani text-lg sm:text-xl md:text-3xl mb-8 tracking-wide font-light leading-relaxed">
                        {siteData.hero.experienceText}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        {siteData.hero.techStack.map((tech, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (i * 0.05) }}
                                className="px-3 py-1.5 md:px-4 md:py-1.5 border border-cyan-500/20 text-cyan-200/80 rounded-sm text-[10px] md:text-xs font-mono uppercase tracking-widest hover:border-cyan-400/60 hover:text-cyan-100 hover:bg-cyan-950/30 transition-all cursor-default"
                             >
                                {tech}
                             </motion.div>
                        ))}
                    </div>
                 </div>
                 
                 {/* Social Actions */}
                 <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {siteData.footer.socials.linkedin && (
                        <a href={siteData.footer.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                            <Linkedin size={28} className="md:w-8 md:h-8" />
                        </a>
                    )}
                    {siteData.footer.socials.github && (
                        <a href={siteData.footer.socials.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                            <Github size={28} className="md:w-8 md:h-8" />
                        </a>
                    )}
                    {siteData.footer.socials.twitter && (
                        <a href={siteData.footer.socials.twitter} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-400 transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                            <Twitter size={28} className="md:w-8 md:h-8" />
                        </a>
                    )}
                    {siteData.footer.socials.email && (
                        <a href={siteData.footer.socials.email} className="text-slate-500 hover:text-fuchsia-400 transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]">
                            <Mail size={28} className="md:w-8 md:h-8" />
                        </a>
                    )}
                 </div>
             </motion.div>
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-6 md:bottom-10 z-20 animate-bounce text-cyan-500/50 hidden h-screen-sm:block pointer-events-none">
            <ChevronDown size={32} className="md:w-12 md:h-12 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
         </div>
      </section>

      {/* Dynamic Sections */}
      {siteData.sections.filter(s => s.isVisible).map(section => (
          <SectionRenderer key={section.id} data={section} />
      ))}

      {/* Connect / Footer Section */}
      <section id="footer" className="snap-start snap-always min-h-[60dvh] md:min-h-screen w-full relative flex flex-col items-center justify-center bg-slate-950 border-t border-slate-900/50 py-12">
          <div className="text-center px-6 max-w-3xl w-full">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold text-white mb-6 md:mb-8 tracking-tight"
              >
                  {siteData.footer.title}
              </motion.h2>
              <p className="text-lg md:text-xl text-slate-400 mb-8 md:mb-12 font-light break-words leading-relaxed">
                  {siteData.footer.message}
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 md:mb-16">
                  {siteData.footer.socials.github && (
                      <a href={siteData.footer.socials.github} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white hover:scale-125 transition-all">
                          <Github size={32} className="md:w-10 md:h-10" />
                      </a>
                  )}
                  {siteData.footer.socials.linkedin && (
                      <a href={siteData.footer.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-cyan-400 hover:scale-125 transition-all">
                          <Linkedin size={32} className="md:w-10 md:h-10" />
                      </a>
                  )}
                  {siteData.footer.socials.twitter && (
                      <a href={siteData.footer.socials.twitter} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-sky-400 hover:scale-125 transition-all">
                          <Twitter size={32} className="md:w-10 md:h-10" />
                      </a>
                  )}
                  {siteData.footer.socials.email && (
                      <a href={siteData.footer.socials.email} className="text-slate-600 hover:text-fuchsia-400 hover:scale-125 transition-all">
                          <Mail size={32} className="md:w-10 md:h-10" />
                      </a>
                  )}
              </div>

              <div className="text-slate-700 font-mono text-[10px] md:text-xs tracking-widest relative">
                  SYSTEM STATUS: ONLINE <br/>
                  © {new Date().getFullYear()} {siteData.hero.title}. ALL RIGHTS RESERVED.
                  
                  {/* Admin Footer Trigger */}
                  <div className="absolute top-0 right-0 md:-right-20">
                    <button 
                        onClick={() => setShowFooterAuth(!showFooterAuth)}
                        className="p-1 text-slate-800 hover:text-cyan-900 transition-colors"
                        title="System Config"
                    >
                        <Lock size={12} />
                    </button>
                    {showFooterAuth && (
                        <div className="absolute bottom-full right-0 mb-2 bg-slate-900 border border-slate-700 p-2 rounded flex items-center shadow-xl z-50">
                            <input 
                                type="password" 
                                className="bg-slate-950 border border-slate-700 text-xs text-cyan-500 w-24 px-1 py-0.5 rounded outline-none"
                                placeholder="CODE"
                                value={footerAuthCode}
                                onChange={(e) => setFooterAuthCode(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && submitFooterAuth()}
                                autoFocus
                            />
                            <button onClick={submitFooterAuth} className="ml-1 text-green-500 hover:text-green-400"><Unlock size={12}/></button>
                            <button onClick={() => setShowFooterAuth(false)} className="ml-1 text-red-500 hover:text-red-400"><X size={12}/></button>
                        </div>
                    )}
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}

export default App;
