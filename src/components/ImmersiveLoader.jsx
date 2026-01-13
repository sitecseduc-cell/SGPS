import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const MESSAGES = [
    "Sincronizando threads assíncronas...",
    "Otimizando queries do banco de dados...",
    "Estabelecendo handshake seguro (TLS)...",
    "Compilando assets em tempo real...",
    "Verificando integridade de checksums...",
    "Hidratando árvore de componentes...",
    "Indexando metadados do sistema...",
    "Inicializando protocolos de rede..."
];

export default function ImmersiveLoader() {
    const [message, setMessage] = useState(MESSAGES[0]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Cycle messages every 2.5s
        const messsageInterval = setInterval(() => {
            setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        }, 2500);

        // Fake progress bar
        const progressInterval = setInterval(() => {
            setProgress(old => {
                if (old >= 100) return 0;
                return old + 1; // slow increment
            });
        }, 50);

        return () => {
            clearInterval(messsageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans">

            {/* Background Aurora */}
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Main Loader Container */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Animated Star (Pará Reference) */}
                <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
                    {/* Pulsing Outer Glow */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

                    {/* Rotating Ring (Stylized) */}
                    <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
                    <div className="absolute inset-4 border-2 border-white/20 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>

                    {/* The Star */}
                    <div className="relative z-10 animate-float">
                        <svg viewBox="0 0 24 24" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                            <defs>
                                <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ef4444" /> {/* Red-500 */}
                                    <stop offset="100%" stopColor="#b91c1c" /> {/* Red-700 */}
                                </linearGradient>
                            </defs>
                            {/* 5-Pointed Star Shape */}
                            <path
                                fill="url(#starGradient)"
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                className="animate-[pulse_3s_ease-in-out_infinite]"
                            />
                        </svg>

                        {/* Inner white sparkle/core to represent the "Virgem" star aspect perhaps? */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-md animate-ping"></div>
                    </div>
                </div>

                {/* Text & Message */}
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400 mb-4 tracking-tight animate-fadeIn">
                    CPS - Sistema de Gestão
                </h2>

                <div className="h-6 overflow-hidden relative w-80 text-center">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-slideInRight key={message}">
                        {message}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 w-64 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 bg-[length:200%_100%] animate-[shimmer_2s_infinite_linear]"
                        style={{ width: '100%' }} // Indeterminate for now, or use progress state
                    ></div>
                </div>

            </div>



            {/* Footer Hint */}
            <div className="absolute bottom-8 text-xs text-slate-400 animate-pulse">
                Preparando sua experiência...
            </div>

        </div>,
        document.body
    );
}
