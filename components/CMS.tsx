import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, Edit3, Settings, Eye, EyeOff } from 'lucide-react';
import { SiteConfig, SectionData } from '../types';

interface CMSProps {
    data: SiteConfig;
    onSave: (newData: SiteConfig) => void;
    onClose: () => void;
}

// Helper component to handle raw JSON editing without losing focus or state on invalid JSON
interface JsonEditorProps {
    value: any;
    onChange: (val: any) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
    const [text, setText] = useState(JSON.stringify(value, null, 2));
    const [error, setError] = useState<string | null>(null);

    // Sync from props only when value changes externally significantly
    // We use a simplified check here or just rely on key prop in parent to reset
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        try {
            const parsed = JSON.parse(newText);
            onChange(parsed);
            setError(null);
        } catch (err) {
            setError("Invalid JSON format");
        }
    };

    return (
        <div className="flex flex-col">
            <textarea 
                className={`w-full bg-slate-950 border ${error ? 'border-red-500' : 'border-fuchsia-900'} p-2 rounded text-xs text-fuchsia-100 h-64 font-mono focus:outline-none focus:border-cyan-500 transition-colors`}
                value={text} 
                onChange={handleChange} 
            />
            {error && <span className="text-red-400 text-[10px] mt-1">{error}</span>}
            <p className="text-[10px] text-slate-500 mt-1">Edit JSON array to manage cards. Ensure valid syntax.</p>
        </div>
    );
};

const CMS: React.FC<CMSProps> = ({ data, onSave, onClose }) => {
    const [localData, setLocalData] = useState<SiteConfig>(JSON.parse(JSON.stringify(data)));
    const [activeTab, setActiveTab] = useState<'general' | 'sections' | 'ai' | 'footer'>('general');
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

    const handleSave = () => {
        onSave(localData);
        onClose();
    };

    const updateHero = (field: string, value: any) => {
        setLocalData({ ...localData, hero: { ...localData.hero, [field]: value } });
    };

    const updateAI = (field: string, value: string) => {
        setLocalData({ ...localData, aiConfig: { ...localData.aiConfig, [field]: value } });
    };

    const updateFooter = (field: string, value: string) => {
        setLocalData({ ...localData, footer: { ...localData.footer, [field]: value } });
    };

    const updateSocials = (platform: string, value: string) => {
        setLocalData({ 
            ...localData, 
            footer: { 
                ...localData.footer, 
                socials: { ...localData.footer.socials, [platform]: value } 
            } 
        });
    };

    const handleAddSection = () => {
        const newSection: SectionData = {
            id: `new-section-${Date.now()}`,
            type: 'custom',
            title: 'New Section',
            isVisible: true,
            content: 'Add content here...'
        };
        setLocalData({ ...localData, sections: [...localData.sections, newSection] });
    };

    const handleRemoveSection = (id: string) => {
        if (confirm("Are you sure you want to delete this section?")) {
            setLocalData({ ...localData, sections: localData.sections.filter(s => s.id !== id) });
        }
    };

    const handleUpdateSection = (section: SectionData) => {
        setLocalData({
            ...localData,
            sections: localData.sections.map(s => s.id === section.id ? section : s)
        });
    };

    const renderSectionEditor = (section: SectionData) => {
        return (
            <div className="space-y-4 p-4 border border-slate-700 rounded bg-slate-900/50 mt-4">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-cyan-400 font-bold text-sm">Edit Section Content</h4>
                    <button 
                         onClick={() => handleUpdateSection({ ...section, isVisible: !section.isVisible })}
                         className={`text-xs flex items-center px-2 py-1 rounded border ${section.isVisible ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-red-900/30 border-red-500 text-red-400'}`}
                    >
                        {section.isVisible ? <Eye size={12} className="mr-1"/> : <EyeOff size={12} className="mr-1"/>}
                        {section.isVisible ? 'Visible' : 'Hidden'}
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-slate-400">Title</label>
                        <input 
                            className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyan-500 outline-none"
                            value={section.title} 
                            onChange={(e) => handleUpdateSection({ ...section, title: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400">Subtitle</label>
                        <input 
                            className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyan-500 outline-none"
                            value={section.subtitle || ''} 
                            onChange={(e) => handleUpdateSection({ ...section, subtitle: e.target.value })} 
                        />
                    </div>
                </div>

                {section.type === 'custom' || section.type === 'philosophy' ? (
                     <div>
                        <label className="text-xs text-slate-400">Content (Markdown)</label>
                        <textarea 
                            className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-sm text-white h-32 focus:border-cyan-500 outline-none"
                            value={section.content || ''} 
                            onChange={(e) => handleUpdateSection({ ...section, content: e.target.value })} 
                        />
                    </div>
                ) : null}
                
                {(section.type === 'projects' || section.type === 'experience' || section.type === 'education') && (
                     <div>
                        <label className="text-xs text-fuchsia-400">Items (JSON Data)</label>
                        {/* Use Key to force re-render JsonEditor when section changes, to reset internal state */}
                        <JsonEditor 
                            key={section.id} 
                            value={section.items || []} 
                            onChange={(newItems) => handleUpdateSection({ ...section, items: newItems })} 
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl h-[90vh] bg-slate-900 border border-cyan-500/30 shadow-2xl rounded-lg flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center bg-slate-900">
                    <div className="flex items-center space-x-2">
                        <Settings className="text-cyan-400" />
                        <h2 className="text-xl font-orbitron text-white">System Configuration // CMS</h2>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={handleSave} className="flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors text-sm font-bold shadow-[0_0_15px_rgba(8,145,178,0.5)]">
                            <Save size={16} className="mr-2" /> Save & Deploy
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-red-500/20 text-red-400 rounded transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-cyan-500/20 bg-slate-900/50 overflow-x-auto">
                    {['general', 'sections', 'ai', 'footer'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-6 py-3 text-sm font-bold tracking-wider transition-colors uppercase ${activeTab === tab ? 'bg-cyan-900/30 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-cyan-900">
                    {activeTab === 'general' && (
                        <div className="space-y-6 max-w-2xl">
                             <div className="bg-cyan-900/10 border border-cyan-500/30 p-4 rounded text-sm text-cyan-200 mb-6">
                                Configure the main landing visual parameters.
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Hero Title (Name)</label>
                                <input 
                                    value={localData.hero.title}
                                    onChange={(e) => updateHero('title', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Hero Subtitle (Static Prefix)</label>
                                <input 
                                    value={localData.hero.subtitle}
                                    onChange={(e) => updateHero('subtitle', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none"
                                    placeholder="e.g. Architecting The"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Rotating Words (Comma Separated)</label>
                                <input 
                                    value={localData.hero.rotatingWords.join(', ')}
                                    onChange={(e) => updateHero('rotatingWords', e.target.value.split(',').map(s => s.trim()))}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none"
                                    placeholder="Future, Cloud, System"
                                />
                            </div>
                             <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Experience Text</label>
                                <input 
                                    value={localData.hero.experienceText}
                                    onChange={(e) => updateHero('experienceText', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Tech Stack Chips (Comma Separated)</label>
                                <textarea 
                                    value={localData.hero.techStack.join(', ')}
                                    onChange={(e) => updateHero('techStack', e.target.value.split(',').map(s => s.trim()))}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none h-20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Hero Background URL</label>
                                <input 
                                    value={localData.hero.bgImage}
                                    onChange={(e) => updateHero('bgImage', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'ai' && (
                        <div className="space-y-6 max-w-2xl">
                            <div className="bg-fuchsia-900/10 border border-fuchsia-500/30 p-4 rounded text-sm text-fuchsia-200 mb-6">
                                Configure the persona of "Aish AI". Changes here affect how the Gemini model responds to users.
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">System Prompt</label>
                                <textarea 
                                    value={localData.aiConfig.systemPrompt}
                                    onChange={(e) => updateAI('systemPrompt', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none h-40"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Welcome Message</label>
                                <input 
                                    value={localData.aiConfig.welcomeMessage}
                                    onChange={(e) => updateAI('welcomeMessage', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Model Name</label>
                                <input 
                                    value={localData.aiConfig.modelName}
                                    onChange={(e) => updateAI('modelName', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none font-mono text-xs"
                                    placeholder="gemini-2.5-flash"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'footer' && (
                        <div className="space-y-6 max-w-2xl">
                             <div className="bg-cyan-900/10 border border-cyan-500/30 p-4 rounded text-sm text-cyan-200 mb-6">
                                Manage the connection details and social links.
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Section Title</label>
                                <input 
                                    value={localData.footer.title}
                                    onChange={(e) => updateFooter('title', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm text-cyan-400 font-bold">Message</label>
                                <textarea
                                    value={localData.footer.message}
                                    onChange={(e) => updateFooter('message', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white focus:border-cyan-500 outline-none h-24"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                                <div className="space-y-2">
                                    <label className="block text-sm text-slate-400">GitHub URL</label>
                                    <input 
                                        value={localData.footer.socials.github}
                                        onChange={(e) => updateSocials('github', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-white focus:border-cyan-500 outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm text-slate-400">LinkedIn URL</label>
                                    <input 
                                        value={localData.footer.socials.linkedin}
                                        onChange={(e) => updateSocials('linkedin', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-white focus:border-cyan-500 outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm text-slate-400">Twitter URL</label>
                                    <input 
                                        value={localData.footer.socials.twitter}
                                        onChange={(e) => updateSocials('twitter', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-white focus:border-cyan-500 outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm text-slate-400">Email (mailto:)</label>
                                    <input 
                                        value={localData.footer.socials.email}
                                        onChange={(e) => updateSocials('email', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-white focus:border-cyan-500 outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sections' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">Manage Sections</h3>
                                <button onClick={handleAddSection} className="flex items-center text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded border border-slate-600 transition-colors">
                                    <Plus size={14} className="mr-1" /> Add Section
                                </button>
                            </div>
                            
                            {localData.sections.map((section, idx) => (
                                <div key={section.id} className={`bg-slate-950/50 border ${editingSectionId === section.id ? 'border-cyan-500' : 'border-slate-800'} rounded-lg overflow-hidden transition-colors`}>
                                    <div 
                                        className="p-3 flex justify-between items-center bg-slate-900 cursor-pointer hover:bg-slate-800 transition-colors"
                                        onClick={() => setEditingSectionId(editingSectionId === section.id ? null : section.id)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-slate-500 font-mono text-xs">0{idx + 1}</span>
                                            <span className={`${section.isVisible ? 'text-cyan-400' : 'text-slate-500 line-through'} font-bold`}>{section.title}</span>
                                            <span className="text-xs text-slate-500 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{section.type}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Edit3 size={16} className={`${editingSectionId === section.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleRemoveSection(section.id); }}
                                                className="p-1 hover:text-red-400 text-slate-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {editingSectionId === section.id && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                {renderSectionEditor(section)}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default CMS;
