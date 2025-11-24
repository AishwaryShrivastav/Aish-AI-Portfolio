import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionData, Project, Experience, Education } from '../types';
import { Calendar, Award, User } from 'lucide-react';

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

  const isScrollableSection = data.type === 'experience' || data.type === 'education' || data.type === 'custom';

  const renderContent = () => {
    switch (data.type) {
      case 'projects':
        return (
          <div className="w-full relative group/slider">
             {/* Decorative Background */}
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none hidden md:block"></div>
             
             <div className="w-full overflow-x-auto pb-8 md:pb-12 pt-4 no-scrollbar snap-x snap-mandatory px-4 md:px-20">
                 <div className="flex space-x-4 md:space-x-10 min-w-max">
                    {(data.items as Project[])?.map((project) => (
                      <motion.div 
                        key={project.id}
                        variants={itemVariants}
                        className="snap-center w-[85vw] sm:w-[60vw] md:w-[500px] bg-slate-900/60 border border-slate-700/50 hover:border-cyan-500/80 rounded-sm overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col relative group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                      >
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          {/* Image Area */}
                          <div className="h-[180px] md:h-[220px] overflow-hidden relative border-b border-slate-800">
                              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                              
                              <div className="absolute top-4 right-4 bg-slate-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs font-mono px-2 md:px-3 py-1 rounded backdrop-blur-sm">
                                  {project.year}
                              </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-4 md:p-6 flex-1 flex flex-col">
                              <h3 className="text-lg md:text-2xl font-orbitron text-white mb-2 md:mb-3 group-hover:text-cyan-300 transition-colors tracking-wide truncate">
                                {project.title}
                              </h3>
                              
                              <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed flex-1 font-light border-l-2 border-slate-800 pl-3 group-hover:border-cyan-500/30 transition-colors line-clamp-4 md:line-clamp-none">
                                {project.description}
                              </p>
                              
                              <div className="mt-auto">
                                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                                      {project.techStack.map(tech => (
                                          <span key={tech} className="text-[9px] md:text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 md:px-2 md:py-1 bg-slate-800 text-slate-300 rounded-sm border border-slate-700 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors">
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
          <div className="max-w-5xl mx-auto px-4 w-full pb-10 md:pb-20">
            <div className="relative border-l border-cyan-500/30 ml-2 md:ml-0 space-y-8 md:space-y-12">
              {(data.items as Experience[])?.map((exp) => (
                <motion.div key={exp.id} variants={itemVariants} className="relative pl-6 md:pl-12">
                   {/* Timeline dot */}
                   <span className="absolute -left-[5px] top-1 md:top-0 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></span>
                   
                   <div className="bg-slate-900/50 border border-slate-800 p-4 md:p-6 rounded-lg hover:bg-slate-800/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1">
                        <h3 className="text-lg md:text-xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <span className="text-cyan-400 font-mono text-xs md:text-sm bg-cyan-950/30 px-2 md:px-3 py-0.5 md:py-1 rounded border border-cyan-500/20 inline-block w-fit">
                          {exp.period}
                        </span>
                      </div>
                      <h4 className="text-sm md:text-lg text-slate-400 font-orbitron mb-3 md:mb-4">{exp.company}</h4>
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-3 md:mb-4 font-light">{exp.description}</p>
                      
                      {exp.reportsTo && (
                        <div className="flex items-center pt-3 border-t border-slate-800 text-[10px] md:text-xs text-slate-500 font-mono">
                            <User size={10} className="mr-1.5 md:mr-2 text-cyan-600" />
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
             <div className="max-w-6xl mx-auto px-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pb-10 md:pb-20">
                {(data.items as Education[])?.map((edu) => (
                    <motion.div key={edu.id} variants={itemVariants} className="bg-slate-900/30 border border-slate-700 p-4 md:p-6 rounded-xl hover:border-cyan-500/50 transition-all group">
                        <Award size={24} className="text-cyan-500 mb-3 md:mb-4 group-hover:scale-110 transition-transform md:w-8 md:h-8" />
                        <h3 className="text-lg md:text-xl text-white font-bold mb-1">{edu.degree}</h3>
                        <p className="text-fuchsia-400 text-xs md:text-sm mb-3 md:mb-4 font-mono">{edu.institution}</p>
                        <div className="w-full h-px bg-slate-800 my-3 md:my-4"></div>
                        <span className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest flex items-center">
                            <Calendar size={10} className="mr-2" /> Class of {edu.year}
                        </span>
                    </motion.div>
                ))}
             </div>
        );

      case 'philosophy':
      case 'custom':
        return (
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-left pb-10 md:pb-20">
             <div className="prose prose-sm sm:prose-base md:prose-xl prose-invert prose-cyan max-w-none">
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
      className={`w-full relative flex flex-col py-12 md:py-20 ${isScrollableSection ? 'min-h-[100dvh] h-auto' : 'min-h-[100dvh] justify-center overflow-hidden'}`}
    >
        {/* Background Decorative Elements - reduced blur on mobile for perf */}
        <div className="absolute top-0 right-0 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[50px] md:blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-fuchsia-500/5 rounded-full blur-[40px] md:blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 mb-8 md:mb-12 z-10">
            <motion.div variants={itemVariants} className="mb-6 md:mb-10 ml-2 md:ml-12 border-l-2 md:border-l-4 border-cyan-500 pl-4 md:pl-6">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-tighter">
                    {data.title}
                </h2>
                {data.subtitle && (
                    <p className="text-cyan-400 font-mono mt-1 md:mt-2 tracking-widest uppercase text-xs md:text-base">
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