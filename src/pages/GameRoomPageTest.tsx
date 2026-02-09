import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { BorderBeam } from "../components/ui/border-beam";

// Mock Player Interface (ต้องสร้างจริงตอน integrate กับ backend)
interface Player {
    id: string;
    username: string;
    isReady: boolean;
    isHost: boolean;
}

const GameRoomPageTest = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("ห้องรอเกม");
    const [players, setPlayers] = useState<Player[]>([]);
    const [maxPlayers, setMaxPlayers] = useState(8);
    const [isReady, setIsReady] = useState(false);
    const [isHost, setIsHost] = useState(false);
    
    useEffect(() => {
        // TODO: Fetch room details และ player list จาก API
        // Mock data สำหรับ demo
        setRoomName("ห้องของหมาป่า");
        setMaxPlayers(8);
        setIsHost(true); // เช็คว่า user เป็นเจ้าของห้องหรือไม่

        // Mock players
        setPlayers([
            { id: "1", username: user?.username || "Player", isReady: false, isHost: true },
            { id: "2", username: "Guest1", isReady: true, isHost: false },
            { id: "3", username: "Guest2", isReady: false, isHost: false },
        ]);
    }, [roomId, user]);

    const handleReady = () => {
        setIsReady(!isReady);
        // TODO: ส่ง ready status ไปที่ backend
    };

    const handleStartGame = () => {
        // TODO: เรียก API เริ่มเกม (เฉพาะ host)
        alert("เริ่มเกม!");
    };

    const handleLeaveRoom = () => {
        // TODO: เรียก API ออกจากห้อง
        navigate("/lobby");
    };

    const currentPlayerCount = players.length;
    const progress = (currentPlayerCount / maxPlayers) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex flex-col items-center pt-24">

            {/* Background Stars */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40 scale-150 rotate-12"
                style={{
                    backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 400px 60px, white, transparent)
          `,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '400px 400px'
                }}
            />

            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(139,69,255,0.15)_0%,_transparent_70%)] pointer-events-none" />

            {/* Header - Room Info */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 flex flex-col items-center mb-8"
            >
                <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    🐺
                </div>

                <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {roomName}
                </h1>

                <p className="text-slate-400 text-sm mt-2">
                    Room ID: <span className="text-purple-400 font-mono">{roomId}</span>
                </p>
            </motion.div>

            {/* Player Counter */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-purple-500/20 to-purple-900/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-4xl mb-8 relative overflow-hidden"
            >
                <BorderBeam duration={8} size={150} />

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">👥</span>
                        <span className="text-white text-xl font-bold">ผู้เล่นในห้อง</span>
                    </div>
                    <span className="text-white text-2xl font-bold">
                        {currentPlayerCount}/{maxPlayers}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                    />
                </div>
            </motion.div>

            {/* Players Grid */}
            <div className="w-full max-w-4xl mb-8">
                <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
                    <span>🎭</span> รายชื่อผู้เล่น
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <AnimatePresence mode="popLayout">
                        {players.map((player, index) => (
                            <motion.div
                                key={player.id}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.1 }}
                                className={`
                  bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm
                  border ${player.isReady ? 'border-green-500/50' : 'border-white/10'}
                  rounded-xl p-4 flex flex-col items-center gap-2 relative
                  ${player.isReady ? 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}
                `}
                            >
                                {/* Host Badge */}
                                {player.isHost && (
                                    <div className="absolute top-2 right-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-2 py-0.5">
                                        <span className="text-yellow-400 text-xs font-bold">👑 HOST</span>
                                    </div>
                                )}

                                {/* Avatar */}
                                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl
                  ${player.isReady
                                        ? 'bg-gradient-to-br from-green-600 to-emerald-600'
                                        : 'bg-gradient-to-br from-purple-600 to-fuchsia-600'
                                    }
                `}>
                                    {player.username.charAt(0).toUpperCase()}
                                </div>

                                {/* Player Name */}
                                <span className="text-white font-medium text-center">
                                    {player.username}
                                </span>

                                {/* Ready Status */}
                                <div className={`
                  text-xs font-bold px-3 py-1 rounded-full
                  ${player.isReady
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                                    }
                `}>
                                    {player.isReady ? '✓ พร้อม' : '⏳ รอ...'}
                                </div>
                            </motion.div>
                        ))}

                        {/* Empty Slots */}
                        {Array.from({ length: maxPlayers - currentPlayerCount }).map((_, index) => (
                            <motion.div
                                key={`empty-${index}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: (players.length + index) * 0.1 }}
                                className="bg-slate-800/30 border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-700/30 flex items-center justify-center">
                                    <span className="text-4xl opacity-30">👤</span>
                                </div>
                                <span className="text-slate-500 text-sm">รอผู้เล่น...</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-4xl flex gap-4 mb-12">
                {/* Ready Button (for non-host players) */}
                {!isHost && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReady}
                        className={`
              flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all
              ${isReady
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                            }
            `}
                    >
                        {isReady ? '✓ พร้อมแล้ว' : '🎯 พร้อม!'}
                    </motion.button>
                )}

                {/* Start Game Button (for host only) */}
                {isHost && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStartGame}
                        disabled={currentPlayerCount < 2} // ต้องมีผู้เล่นอย่างน้อย 2 คน
                        className={`
              flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all
              ${currentPlayerCount >= 2
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50'
                                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                            }
            `}
                    >
                        🎮 เริ่มเกม!
                    </motion.button>
                )}

                {/* Leave Room Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLeaveRoom}
                    className="px-8 py-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 rounded-xl font-bold text-lg transition-all shadow-lg shadow-red-500/20"
                >
                    🚪 ออกจากห้อง
                </motion.button>
            </div>

            {/* Waiting Animation (Bottom) */}
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-slate-400 text-sm flex items-center gap-2"
            >
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                {isHost ? 'รอผู้เล่นเข้าร่วม...' : 'รอเจ้าของห้องเริ่มเกม...'}
            </motion.div>

        </div>
    );
};

export default GameRoomPageTest;
