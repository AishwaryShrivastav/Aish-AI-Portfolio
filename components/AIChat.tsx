
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Minimize2, Cpu, Lock, Unlock, X } from 'lucide-react';
import { generateAIResponse } from '../services/openaiService';
import { SiteConfig } from '../types';

interface AIChatProps {
    config: SiteConfig['aiConfig'];
    onOpenCMS: () => void;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

const AIChat: React.FC<AIChatProps> = ({ config, onOpenCMS }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    
    // Admin Auth State
    const [showAuth, setShowAuth] = useState(false);
    const [authCode, setAuthCode] = useState('');
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Welcome
    useEffect(() => {
        if (messages.length === 0 && config.welcomeMessage) {
            setMessages([{ role: 'model', text: config.welcomeMessage }]);
        }
    }, [config.welcomeMessage, messages.length]);

    // Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsThinking(true);

        // Convert simplistic message history for the service
        const history = messages.map(m => ({ role: m.role, content: m.text }));

        const response = await generateAIResponse(
            userMsg, 
            config.systemPrompt, 
            history,
            config.modelName
        );

        setIsThinking(false);
        setMessages(prev => [...prev, { role: 'model', text: response }]);
    };

    const handleVoice = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser. Try Chrome.");
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.start();
    };

    const submitAuth = () => {
        if (authCode === "iamSAI!^35") {
            setShowAuth(false);
            setAuthCode('');
            onOpenCMS();
        } else {
            alert("ACCESS DENIED. INCORRECT CREDENTIALS.");
            setAuthCode('');
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)] border border-cyan-400 bg-slate-900/90 backdrop-blur-md text-cyan-400 transition-all flex items-center space-x-2 font-orbitron font-bold tracking-wider hover:bg-cyan-900/50 ${isOpen ? 'hidden' : 'flex'}`}
                onClick={() => setIsOpen(true)}
            >
                <Cpu size={24} className="animate-pulse" />
                <span>AI</span>
            </motion.button>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-96 h-[500px] max-h-[80vh] flex flex-col rounded-xl overflow-hidden border border-cyan-500/50 bg-slate-950/95 shadow-[0_0_40px_rgba(34,211,238,0.2)] backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-cyan-950/30 border-b border-cyan-500/30 relative">
                            <div className="flex items-center space-x-2">
                                <Cpu size={20} className="text-cyan-400" />
                                <span className="font-orbitron text-cyan-100 font-bold tracking-widest">AISH_AI (GPT)</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => setShowAuth(!showAuth)}
                                    className={`transition-colors p-1 ${showAuth ? 'text-white' : 'text-cyan-700 hover:text-cyan-400'}`}
                                    title="Admin Access"
                                >
                                    <Lock size={16} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-cyan-400 hover:text-white transition-colors">
                                    <Minimize2 size={20} />
                                </button>
                            </div>

                            {/* Auth Overlay */}
                            <AnimatePresence>
                                {showAuth && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute top-full left-0 w-full bg-slate-900/95 border-b border-cyan-500/30 p-3 flex items-center space-x-2 backdrop-blur-xl shadow-lg"
                                    >
                                        <input 
                                            type="password"
                                            value={authCode}
                                            onChange={(e) => setAuthCode(e.target.value)}
                                            placeholder="ACCESS CODE"
                                            className="flex-1 bg-black/50 border border-cyan-900 rounded px-2 py-1 text-xs text-cyan-400 focus:border-cyan-400 outline-none font-mono tracking-widest"
                                            onKeyDown={(e) => e.key === 'Enter' && submitAuth()}
                                            autoFocus
                                        />
                                        <button onClick={submitAuth} className="p-1 text-green-400 hover:text-green-300">
                                            <Unlock size={16} />
                                        </button>
                                        <button onClick={() => setShowAuth(false)} className="p-1 text-red-400 hover:text-red-300">
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-700">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                                        msg.role === 'user' 
                                            ? 'bg-fuchsia-900/40 border border-fuchsia-500/40 text-fuchsia-100 rounded-br-none' 
                                            : 'bg-cyan-900/40 border border-cyan-500/40 text-cyan-100 rounded-bl-none'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className="bg-cyan-900/20 border border-cyan-500/20 text-cyan-400 p-3 rounded-lg rounded-bl-none text-xs animate-pulse">
                                        COMMUNICATING WITH OPENAI...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-900/50 border-t border-cyan-500/30 flex items-center space-x-2">
                            <button 
                                onClick={handleVoice} 
                                className={`p-2 rounded-full border transition-all ${isListening ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-slate-800 border-slate-600 text-slate-400 hover:text-cyan-400 hover:border-cyan-400'}`}
                            >
                                <Mic size={18} />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Execute command or ask query..."
                                className="flex-1 bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                            />
                            <button 
                                onClick={handleSend}
                                className="p-2 rounded-full bg-cyan-600/20 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
