import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const MOCK_PLAYERS = [
    { id: "1", username: "WolfMaster", role: "Werewolf", isAlive: true, avatar: "🐺", votes: 2 },
    { id: "2", username: "SeerQueen", role: "Seer", isAlive: true, avatar: "🔮", votes: 0 },
    { id: "3", username: "Villager01", role: "Villager", isAlive: false, avatar: "👨‍🌾", votes: 4 },
    { id: "4", username: "DocStrange", role: "Doctor", isAlive: true, avatar: "⚕️", votes: 1 },
    { id: "5", username: "HunterX", role: "Hunter", isAlive: true, avatar: "🏹", votes: 0 },
    { id: "6", username: "Villager02", role: "Villager", isAlive: true, avatar: "👩‍🌾", votes: 1 },
];

const GameRoomPageTest = () => {
    const { user } = useAuth();
    const [phase, setPhase] = useState<'day' | 'night'>('day');
    const [dayCount, setDayCount] = useState(2);
    const [timeLeft, setTimeLeft] = useState(45);
    const [players] = useState(MOCK_PLAYERS);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    const [chatMessages, setChatMessages] = useState<{ sender: string, message: string, type?: 'system' | 'chat' }[]>([
        { sender: "System", message: "Night 1: Werewolves eliminated Villager01", type: 'system' },
        { sender: "System", message: "Day 2 begins. Discuss and vote!", type: 'system' },
        { sender: "WolfMaster", message: "I think the doctor saved someone last night", type: 'chat' },
        { sender: "SeerQueen", message: "We need to think carefully about this", type: 'chat' },
    ]);
    const [messageInput, setMessageInput] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 60));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const togglePhase = () => {
        setPhase(prev => (prev === 'day' ? 'night' : 'day'));
        setTimeLeft(60);
        if (phase === 'night') setDayCount(prev => prev + 1);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        setChatMessages([...chatMessages, { sender: user?.username || "Guest", message: messageInput, type: 'chat' }]);
        setMessageInput("");
    };

    const progress = (timeLeft / 60) * 283;

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white font-sans relative">

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-600/30 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/30 to-transparent rounded-full blur-3xl"
                />
            </div>

            {/* Header */}
            <header className="relative z-20 h-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="h-full max-w-[2000px] mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-violet-500/50"
                        >
                            W
                        </motion.div>
                        <div>
                            <h1 className="text-xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                Werewolf Game
                            </h1>
                            <p className="text-xs text-slate-400 font-medium">
                                {phase === 'day' ? '☀️ Day' : '🌙 Night'} {dayCount} • {players.filter(p => p.isAlive).length}/{players.length} Alive
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={togglePhase}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-bold transition-colors"
                        >
                            🔄 Toggle Phase
                        </motion.button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 p-0.5">
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-lg">
                                👤
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <main className="relative z-10 h-[calc(100vh-80px)] flex gap-4 p-4 max-w-[2000px] mx-auto">

                {/* Left Sidebar - Chat */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-80 flex flex-col bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                >
                    <div className="p-4 border-b border-white/10 bg-white/5">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            💬 Game Chat
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        <AnimatePresence>
                            {chatMessages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={msg.type === 'system'
                                        ? 'p-3 rounded-lg bg-amber-500/10 border-l-4 border-amber-500 text-amber-200 text-sm italic'
                                        : 'space-y-1'
                                    }
                                >
                                    {msg.type === 'chat' && (
                                        <>
                                            <div className="text-xs font-bold text-violet-400">{msg.sender}</div>
                                            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200">
                                                {msg.message}
                                            </div>
                                        </>
                                    )}
                                    {msg.type === 'system' && msg.message}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="p-3 bg-white/5 border-t border-white/10">
                        <div className="relative">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full px-4 py-3 pr-12 rounded-xl bg-black/40 border border-white/10 focus:border-violet-500 focus:outline-none text-sm placeholder:text-slate-600 transition-colors"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center hover:scale-105 transition-transform"
                            >
                                →
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Center - Game Board */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">

                    {/* Player Grid */}
                    <div className="flex-1 bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-6 overflow-y-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                            <AnimatePresence>
                                {players.map((player, index) => (
                                    <motion.div
                                        key={player.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => player.isAlive && setSelectedPlayer(player.id)}
                                        className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group
                                            ${selectedPlayer === player.id ? 'border-violet-500 shadow-lg shadow-violet-500/50' : 'border-white/10'}
                                            ${!player.isAlive ? 'grayscale opacity-50' : 'hover:border-white/30'}
                                        `}
                                    >
                                        {/* Background Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500
                                            ${phase === 'day'
                                                ? 'from-sky-600 via-blue-700 to-indigo-800'
                                                : 'from-slate-800 via-indigo-900 to-slate-900'}
                                        `} />

                                        {/* Grass/Ground */}
                                        <div className={`absolute bottom-0 w-full h-1/3 transition-colors duration-500
                                            ${phase === 'day' ? 'bg-emerald-700' : 'bg-emerald-950'}
                                        `} />

                                        {/* Avatar */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                                            <div className="text-8xl drop-shadow-2xl">{player.avatar}</div>
                                        </div>

                                        {/* Info Bar */}
                                        <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent z-20">
                                            <div className="flex items-center justify-between">
                                                <div className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20">
                                                    <span className="text-xs font-bold text-white">{player.username}</span>
                                                </div>
                                                {player.votes > 0 && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="px-2 py-1 rounded-lg bg-red-500/90 backdrop-blur-sm border border-red-400"
                                                    >
                                                        <span className="text-xs font-bold text-white">🗳️ {player.votes}</span>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full z-20 ${player.isAlive ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse' : 'bg-red-500'}`} />

                                        {/* Dead Overlay */}
                                        {!player.isAlive && (
                                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
                                                <span className="text-2xl font-black text-red-500 rotate-[-12deg] border-4 border-red-500 px-4 py-2 rounded-lg">
                                                    ☠️ DEAD
                                                </span>
                                            </div>
                                        )}

                                        {/* Selection Ring */}
                                        {selectedPlayer === player.id && player.isAlive && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 border-4 border-violet-500 rounded-2xl z-40 pointer-events-none"
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="h-24 bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between px-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-4xl shadow-lg">
                                🐺
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase">Your Role</div>
                                <div className="text-lg font-bold text-white">Werewolf</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!selectedPlayer}
                                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all
                                    ${selectedPlayer
                                        ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-500/30'
                                        : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'}
                                `}
                            >
                                🗳️ Vote to Eliminate
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 font-bold text-sm transition-colors"
                            >
                                ⏭️ Skip Vote
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Sidebar - Timer & Status */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-80 flex flex-col gap-4"
                >
                    {/* Timer */}
                    <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-6 flex flex-col items-center justify-center">
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full -rotate-90">
                                <circle
                                    cx="96" cy="96" r="88"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <motion.circle
                                    cx="96" cy="96" r="88"
                                    stroke={timeLeft < 10 ? '#ef4444' : timeLeft < 30 ? '#f59e0b' : '#8b5cf6'}
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray="552"
                                    strokeDashoffset={552 - progress}
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className={`text-5xl font-black font-mono ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                    {timeLeft}
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">seconds</div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <div className="text-sm text-slate-400">Voting Phase</div>
                            <div className="text-xs text-slate-500 mt-1">Choose wisely...</div>
                        </div>
                    </div>

                    {/* Player Status */}
                    <div className="flex-1 bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-4 overflow-y-auto">
                        <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-3">Players</h3>
                        <div className="space-y-2">
                            {players.map((player) => (
                                <motion.div
                                    key={player.id}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xl ${player.isAlive ? 'bg-white/10' : 'bg-black/40'}`}>
                                        {player.isAlive ? '❓' : '☠️'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold text-white truncate">{player.username}</div>
                                        <div className="text-xs text-slate-500">
                                            {player.isAlive ? 'Unknown Role' : 'Eliminated'}
                                        </div>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${player.isAlive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default GameRoomPageTest;
