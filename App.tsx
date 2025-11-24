
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ChevronDown } from 'lucide-react';
import { SEED_DATA } from './constants';
import { SiteConfig } from './types';
import SectionRenderer from './components/SectionRenderer';
import CMS from './components/CMS';
import AIChat from './components/AIChat';

function App() {
  const [siteData, setSiteData] = useState<SiteConfig>(SEED_DATA);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('site_data');
    if (stored) {
        setSiteData(JSON.parse(stored));
    }
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

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 overflow-y-scroll h-screen snap-y snap-mandatory scroll-smooth">
      
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

      {/* AI Chat with Admin Access */}
      <AIChat 
        config={siteData.aiConfig} 
        onOpenCMS={() => setIsCMSOpen(true)}
      />

      {/* Hero Section */}
      <section id="hero" className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-slate-950/80 z-10"></div>
             <img src={siteData.hero.bgImage} className="w-full h-full object-cover opacity-60" alt="Hero Background" />
         </div>
         
         {/* Grid Overlay */}
         <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         
         {/* Content */}
         <div className="relative z-20 text-center px-4 max-w-5xl">
             <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
             >
                 <h1 className="text-6xl md:text-9xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-6 neon-text tracking-tighter">
                     {siteData.hero.title}
                 </h1>

                 {/* Rotating One-Liner */}
                 <div className="text-xl md:text-3xl font-mono text-cyan-400 mb-8 h-12 flex items-center justify-center space-x-3">
                    <span className="opacity-80 uppercase tracking-widest">{siteData.hero.subtitle}</span>
                    <AnimatePresence mode='wait'>
                        <motion.span
                            key={rotatingIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="font-bold text-fuchsia-400 bg-fuchsia-950/30 px-2 py-1 rounded border border-fuchsia-500/20"
                        >
                            {siteData.hero.rotatingWords[rotatingIndex]}
                        </motion.span>
                    </AnimatePresence>
                 </div>
                 
                 {/* Experience & Tech Chips */}
                 <div className="mb-10 max-w-3xl mx-auto">
                    <p className="text-slate-300 font-rajdhani text-lg mb-4 tracking-wide border-b border-slate-800 pb-2 inline-block">
                        {siteData.hero.experienceText}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {siteData.hero.techStack.map((tech, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-4 py-2 bg-slate-900/80 border border-cyan-500/30 text-cyan-300 rounded-lg text-sm font-mono flex items-center shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 transition-all cursor-default"
                             >
                                {tech}
                             </motion.div>
                        ))}
                    </div>
                 </div>
                 
                 {/* Social Actions (Replacing CTA) */}
                 <div className="flex justify-center gap-6">
                    {siteData.footer.socials.linkedin && (
                        <a href={siteData.footer.socials.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-slate-900/50 backdrop-blur border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white rounded-xl transition-all hover:scale-110 group">
                            <Linkedin size={24} />
                        </a>
                    )}
                    {siteData.footer.socials.github && (
                        <a href={siteData.footer.socials.github} target="_blank" rel="noreferrer" className="p-4 bg-slate-900/50 backdrop-blur border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white rounded-xl transition-all hover:scale-110 group">
                            <Github size={24} />
                        </a>
                    )}
                    {siteData.footer.socials.twitter && (
                        <a href={siteData.footer.socials.twitter} target="_blank" rel="noreferrer" className="p-4 bg-slate-900/50 backdrop-blur border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white rounded-xl transition-all hover:scale-110 group">
                            <Twitter size={24} />
                        </a>
                    )}
                    {siteData.footer.socials.email && (
                        <a href={siteData.footer.socials.email} className="p-4 bg-slate-900/50 backdrop-blur border border-slate-700 hover:border-fuchsia-400 text-slate-400 hover:text-white rounded-xl transition-all hover:scale-110 group">
                            <Mail size={24} />
                        </a>
                    )}
                 </div>
             </motion.div>
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-10 z-20 animate-bounce text-slate-500">
            <ChevronDown size={32} />
         </div>
      </section>

      {/* Dynamic Sections */}
      {siteData.sections.filter(s => s.isVisible).map(section => (
          <SectionRenderer key={section.id} data={section} />
      ))}

      {/* Connect / Footer Section */}
      <section id="footer" className="h-screen w-full snap-start relative flex flex-col items-center justify-center bg-slate-900 border-t border-slate-900">
          <div className="text-center px-6 max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-8"
              >
                  {siteData.footer.title}
              </motion.h2>
              <p className="text-xl text-slate-400 mb-12 font-light">
                  {siteData.footer.message}
              </p>
              
              <div className="flex justify-center gap-8 mb-16">
                  {siteData.footer.socials.github && (
                      <a href={siteData.footer.socials.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white hover:scale-125 transition-all">
                          <Github size={40} />
                      </a>
                  )}
                  {siteData.footer.socials.linkedin && (
                      <a href={siteData.footer.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 hover:scale-125 transition-all">
                          <Linkedin size={40} />
                      </a>
                  )}
                  {siteData.footer.socials.twitter && (
                      <a href={siteData.footer.socials.twitter} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-400 hover:scale-125 transition-all">
                          <Twitter size={40} />
                      </a>
                  )}
                  {siteData.footer.socials.email && (
                      <a href={siteData.footer.socials.email} className="text-slate-500 hover:text-fuchsia-400 hover:scale-125 transition-all">
                          <Mail size={40} />
                      </a>
                  )}
              </div>

              <div className="text-slate-600 font-mono text-xs">
                  SYSTEM STATUS: ONLINE <br/>
                  © {new Date().getFullYear()} {siteData.hero.title}. ALL RIGHTS RESERVED.
              </div>
          </div>
      </section>
    </div>
  );
}

export default App;
