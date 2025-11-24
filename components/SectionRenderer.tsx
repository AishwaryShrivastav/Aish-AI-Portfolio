
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionData, Project, Experience, Education } from '../types';
import { Calendar, Award, User, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: SectionData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const SectionRenderer: React.FC<Props> = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isScrollableSection = data.type === 'experience' || data.type === 'education' || data.type === 'custom';

  const scrollProjects = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (data.type) {
      case 'projects':
        return (
          <div className="w-full relative group/slider h-full flex flex-col justify-center">
             {/* Decorative Background */}
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none hidden md:block"></div>
             
             {/* Navigation Buttons */}
             <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-6 z-20 pointer-events-none">
                <button 
                  onClick={() => scrollProjects('left')}
                  className="pointer-events-auto p-3 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-110"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scrollProjects('right')}
                  className="pointer-events-auto p-3 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-110"
                >
                  <ChevronRight size={24} />
                </button>
             </div>

             <div 
                ref={scrollContainerRef}
                className="w-full overflow-x-auto pb-8 pt-4 no-scrollbar snap-x snap-mandatory px-6 md:px-24"
             >
                 <div className="flex space-x-6 md:space-x-12 min-w-max items-center">
                    {(data.items as Project[])?.map((project) => (
                      <motion.div 
                        key={project.id}
                        variants={itemVariants}
                        className="snap-center w-[85vw] sm:w-[60vw] md:w-[500px] h-[55vh] md:h-[60vh] max-h-[550px] bg-slate-900/60 border border-slate-700/50 hover:border-cyan-500/80 rounded-sm overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col relative group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                      >
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          {/* Image Area - Reduced height relative to card */}
                          <div className="h-[35%] overflow-hidden relative border-b border-slate-800 shrink-0">
                              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                              
                              <div className="absolute top-4 right-4 bg-slate-950/90 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded backdrop-blur-sm">
                                  {project.year}
                              </div>
                          </div>
                          
                          {/* Content - Scrollable description */}
                          <div className="p-5 md:p-6 flex-1 flex flex-col overflow-hidden">
                              <h3 className="text-lg md:text-2xl font-orbitron text-white mb-2 md:mb-3 group-hover:text-cyan-300 transition-colors tracking-wide truncate shrink-0">
                                {project.title}
                              </h3>
                              
                              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 pr-2 mb-4">
                                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light border-l-2 border-slate-800 pl-4 group-hover:border-cyan-500/30 transition-colors">
                                    {project.description}
                                </p>
                              </div>
                              
                              <div className="mt-auto shrink-0 pt-2 border-t border-slate-800/50">
                                  <div className="flex flex-wrap gap-2">
                                      {project.techStack.map(tech => (
                                          <span key={tech} className="text-[10px] md:text-xs uppercase tracking-wider font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded-sm border border-slate-700 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors">
                                              {tech}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                    ))}
                 </div>
             </div>
          </div>
        );

      case 'experience':
        return (
          <div className="max-w-6xl mx-auto px-4 w-full pb-16 md:pb-32">
            <div className="relative border-l-2 border-cyan-500/30 ml-3 md:ml-6 space-y-10 md:space-y-16">
              {(data.items as Experience[])?.map((exp) => (
                <motion.div key={exp.id} variants={itemVariants} className="relative pl-8 md:pl-16">
                   {/* Timeline dot */}
                   <span className="absolute -left-[9px] top-1.5 md:top-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] border-4 border-slate-950"></span>
                   
                   <div className="bg-slate-900/50 border border-slate-800 p-6 md:p-8 rounded-lg hover:bg-slate-800/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <span className="text-cyan-400 font-mono text-xs md:text-sm bg-cyan-950/40 px-3 py-1 rounded border border-cyan-500/20 inline-block w-fit whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <h4 className="text-base md:text-xl text-slate-400 font-orbitron mb-4 md:mb-6">{exp.company}</h4>
                      <p className="text-slate-300 leading-relaxed text-base md:text-lg mb-4 md:mb-6 font-light max-w-4xl">{exp.description}</p>
                      
                      {exp.reportsTo && (
                        <div className="flex items-center pt-4 border-t border-slate-800 text-xs md:text-sm text-slate-500 font-mono">
                            <User size={14} className="mr-2 text-cyan-600" />
                            <span>Reported to: <span className="text-cyan-400/80">{exp.reportsTo}</span></span>
                        </div>
                      )}
                   </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 'education':
        return (
             <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-16 md:pb-32">
                {(data.items as Education[])?.map((edu) => (
                    <motion.div key={edu.id} variants={itemVariants} className="bg-slate-900/30 border border-slate-700 p-6 md:p-8 rounded-xl hover:border-cyan-500/50 transition-all group hover:bg-slate-800/30">
                        <Award size={32} className="text-cyan-500 mb-4 md:mb-6 group-hover:scale-110 transition-transform md:w-10 md:h-10" />
                        <h3 className="text-xl md:text-2xl text-white font-bold mb-2">{edu.degree}</h3>
                        <p className="text-fuchsia-400 text-sm md:text-base mb-4 md:mb-6 font-mono">{edu.institution}</p>
                        <div className="w-full h-px bg-slate-800 my-4"></div>
                        <span className="text-slate-500 text-xs md:text-sm uppercase tracking-widest flex items-center">
                            <Calendar size={14} className="mr-2" /> Class of {edu.year}
                        </span>
                    </motion.div>
                ))}
             </div>
        );

      case 'philosophy':
        return (
          <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-32">
             <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-900/30 border-l-4 border-cyan-500 p-8 md:p-14 rounded-r-2xl backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <Quote className="absolute top-6 right-6 md:top-10 md:right-12 text-cyan-500/10 w-24 h-24 md:w-40 md:h-40 rotate-180" />
                <div className="prose prose-base sm:prose-lg md:prose-2xl prose-invert max-w-none relative z-10">
                    <p className="whitespace-pre-wrap text-slate-200 font-light leading-relaxed tracking-wide text-justify md:text-left">
                        {data.content}
                    </p>
                </div>
             </div>
          </div>
        );

      case 'custom':
        return (
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-left pb-16 md:pb-32">
             <div className="prose prose-base sm:prose-lg md:prose-2xl prose-invert prose-cyan max-w-none">
                <div className="whitespace-pre-wrap text-slate-300 font-light leading-relaxed tracking-wide">
                    {data.content}
                </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.section 
      ref={ref}
      id={data.id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`snap-start snap-always w-full relative flex flex-col ${data.type === 'projects' ? 'h-[100dvh] py-0 justify-center' : 'py-16 md:py-24'} ${isScrollableSection ? 'min-h-[100dvh] h-auto' : 'min-h-[100dvh] justify-center overflow-hidden'}`}
    >
        {/* Background Decorative Elements - reduced blur on mobile for perf */}
        <div className="absolute top-0 right-0 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-cyan-500/5 rounded-full blur-[60px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-fuchsia-500/5 rounded-full blur-[50px] md:blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className={`container mx-auto px-6 z-10 ${data.type === 'projects' ? 'mb-4 md:mb-8 absolute top-8 left-0 right-0' : 'mb-12 md:mb-20'}`}>
            <motion.div variants={itemVariants} className="ml-2 md:ml-8 border-l-4 md:border-l-8 border-cyan-500 pl-6 md:pl-10">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-tighter">
                    {data.title}
                </h2>
                {data.subtitle && (
                    <p className="text-cyan-400 font-mono mt-2 md:mt-4 tracking-widest uppercase text-sm md:text-lg font-medium">
                        // {data.subtitle}
                    </p>
                )}
            </motion.div>
        </div>

        {renderContent()}
    </motion.section>
  );
};

export default SectionRenderer;
