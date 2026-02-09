import { useState } from 'react';
// import { useNavigate } from 'react-router';

interface Room {
    id: string;
    name: string;
    host: string;
    players: number;
    maxPlayers: number;
    status: 'waiting' | 'playing' | 'finished';
}

const TestPage = () => {
    // const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(8);

    // Mock data - จะเชื่อมกับ backend ในภายหลัง
    const [rooms] = useState<Room[]>([
        { id: '1', name: 'ห้องมือใหม่', host: 'Player1', players: 3, maxPlayers: 8, status: 'waiting' },
        { id: '2', name: 'PRO Only 🔥', host: 'WolfKing', players: 6, maxPlayers: 10, status: 'waiting' },
        { id: '3', name: 'Chill Game 🎯', host: 'ChillGuy', players: 8, maxPlayers: 8, status: 'playing' },
        { id: '4', name: 'เกมเร็ว ⚡', host: 'SpeedRunner', players: 5, maxPlayers: 12, status: 'waiting' },
    ]);

    const handleCreateRoom = () => {
        console.log('Creating room:', { roomName, maxPlayers });
        // TODO: เชื่อม API สำหรับสร้างห้อง
        setShowCreateModal(false);
        setRoomName('');
    };

    const handleJoinRoom = (roomId?: string) => {
        const id = roomId || roomCode;
        console.log('Joining room:', id);
        // TODO: เชื่อม API สำหรับเข้าห้อง
        setShowJoinModal(false);
        setRoomCode('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-block mb-6">
                        <div className="text-7xl drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-float">🌙</div>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-wider mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x">
                        WEREWOLF LOBBY
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl tracking-wide">เลือกห้องหรือสร้างห้องใหม่เพื่อเริ่มการผจญภัย</p>
                    <div className="mt-4 flex items-center justify-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>ออนไลน์ 247 คน</span>
                        </div>
                        <span>•</span>
                        <span>ห้องทั้งหมด {rooms.length} ห้อง</span>
                    </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                    {/* Create Room Button */}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="group relative px-8 py-8 bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-purple-400/60 hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className="relative flex flex-col items-center gap-4">
                            <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">🎮</div>
                            <span className="text-white font-bold text-2xl tracking-wide">สร้างห้อง</span>
                            <span className="text-purple-300 text-sm">เป็นเจ้าห้องและเริ่มเกม</span>
                        </div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>
                    </button>

                    {/* Join Room Button */}
                    <button
                        onClick={() => setShowJoinModal(true)}
                        className="group relative px-8 py-8 bg-gradient-to-br from-fuchsia-600/20 to-fuchsia-900/20 backdrop-blur-xl border border-fuchsia-500/30 rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-fuchsia-400/60 hover:shadow-[0_0_50px_rgba(217,70,239,0.6)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className="relative flex flex-col items-center gap-4">
                            <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">🚪</div>
                            <span className="text-white font-bold text-2xl tracking-wide">เข้าร่วมห้อง</span>
                            <span className="text-fuchsia-300 text-sm">ใส่รหัสห้องเพื่อเข้าเล่น</span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-fuchsia-500/20 rounded-full blur-2xl"></div>
                    </button>

                    {/* Rules Button */}
                    <button
                        onClick={() => setShowRulesModal(true)}
                        className="group relative px-8 py-8 bg-gradient-to-br from-violet-600/20 to-violet-900/20 backdrop-blur-xl border border-violet-500/30 rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-violet-400/60 hover:shadow-[0_0_50px_rgba(139,92,246,0.6)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className="relative flex flex-col items-center gap-4">
                            <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">📖</div>
                            <span className="text-white font-bold text-2xl tracking-wide">วิธีเล่น</span>
                            <span className="text-violet-300 text-sm">เรียนรู้กติกาเกม</span>
                        </div>
                        <div className="absolute top-0 left-0 w-20 h-20 bg-violet-500/20 rounded-full blur-2xl"></div>
                    </button>
                </div>

                {/* Room List Section */}
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                            <span className="text-4xl">🏠</span>
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">ห้องที่เปิดอยู่</span>
                        </h2>
                        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2">
                            <span>🔄</span>
                            <span className="hidden md:inline">รีเฟรช</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {rooms.map((room, index) => (
                            <div
                                key={room.id}
                                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => room.status === 'waiting' && handleJoinRoom(room.id)}
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-violet-500/0 group-hover:from-purple-500/10 group-hover:via-fuchsia-500/10 group-hover:to-violet-500/10 rounded-2xl transition-all duration-500"></div>

                                <div className="relative">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-5">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all">
                                            {room.name}
                                        </h3>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${room.status === 'waiting'
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
                                            room.status === 'playing'
                                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]' :
                                                'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                                            }`}>
                                            {room.status === 'waiting' ? '🟢 รอผู้เล่น' :
                                                room.status === 'playing' ? '🟡 กำลังเล่น' :
                                                    '⚫ จบแล้ว'}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-3 mb-5">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <span className="text-xl">👤</span>
                                            <span className="text-sm">เจ้าห้อง:</span>
                                            <span className="text-sm font-semibold text-purple-400">{room.host}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">👥</span>
                                            <span className="text-sm text-gray-300">ผู้เล่น:</span>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full transition-all duration-500"
                                                            style={{ width: `${(room.players / room.maxPlayers) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-bold text-white">{room.players}/{room.maxPlayers}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    {room.status === 'waiting' && (
                                        <button
                                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-white font-bold shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleJoinRoom(room.id);
                                            }}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <span>เข้าร่วมเดี๋ยวนี้</span>
                                                <span>→</span>
                                            </span>
                                        </button>
                                    )}
                                    {room.status === 'playing' && (
                                        <button
                                            disabled
                                            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 font-bold cursor-not-allowed"
                                        >
                                            กำลังเล่นอยู่...
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Create Room Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="relative bg-gradient-to-br from-slate-900 to-purple-950 border border-purple-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-purple-500/20 animate-scale-in">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl"></div>

                        <div className="relative">
                            <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                                <span>🎮</span>
                                <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">สร้างห้องใหม่</span>
                            </h2>
                            <p className="text-gray-400 text-sm mb-8">กรอกข้อมูลเพื่อสร้างห้องเกมของคุณ</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-white text-sm font-semibold mb-3 block flex items-center gap-2">
                                        <span>📝</span>
                                        <span>ชื่อห้อง</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        placeholder="ใส่ชื่อห้องของคุณ..."
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-white text-sm font-semibold mb-3 block flex items-center gap-2">
                                        <span>👥</span>
                                        <span>จำนวนผู้เล่นสูงสุด</span>
                                    </label>
                                    <select
                                        value={maxPlayers}
                                        onChange={(e) => setMaxPlayers(Number(e.target.value))}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
                                    >
                                        <option value={6} className="bg-slate-900">6 คน - เกมเร็ว</option>
                                        <option value={8} className="bg-slate-900">8 คน - แนะนำ</option>
                                        <option value={10} className="bg-slate-900">10 คน - สนุกมาก</option>
                                        <option value={12} className="bg-slate-900">12 คน - โหมดปาร์ตี้</option>
                                    </select>
                                </div>

                                <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            setShowCreateModal(false);
                                            setRoomName('');
                                        }}
                                        className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all"
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        onClick={handleCreateRoom}
                                        disabled={!roomName.trim()}
                                        className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl text-white font-bold hover:from-purple-500 hover:to-fuchsia-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                                    >
                                        สร้างห้อง 🚀
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Join Room Modal */}
            {showJoinModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="relative bg-gradient-to-br from-slate-900 to-fuchsia-950 border border-fuchsia-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-fuchsia-500/20 animate-scale-in">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl"></div>

                        <div className="relative">
                            <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                                <span>🚪</span>
                                <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">เข้าร่วมห้อง</span>
                            </h2>
                            <p className="text-gray-400 text-sm mb-8">ใส่รหัสห้องที่ได้รับจากเพื่อน</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-white text-sm font-semibold mb-3 block flex items-center gap-2">
                                        <span>🔑</span>
                                        <span>รหัสห้อง</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={roomCode}
                                        onChange={(e) => setRoomCode(e.target.value)}
                                        placeholder="ใส่รหัสห้อง เช่น ABC123"
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all text-center text-xl font-mono tracking-wider uppercase"
                                        maxLength={6}
                                    />
                                </div>

                                <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            setShowJoinModal(false);
                                            setRoomCode('');
                                        }}
                                        className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all"
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        onClick={() => handleJoinRoom()}
                                        disabled={!roomCode.trim()}
                                        className="flex-1 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-xl text-white font-bold hover:from-fuchsia-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-fuchsia-500/50"
                                    >
                                        เข้าร่วม 🎯
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Rules Modal */}
            {showRulesModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="relative bg-gradient-to-br from-slate-900 to-violet-950 border border-violet-500/30 rounded-3xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl shadow-violet-500/20 animate-scale-in custom-scrollbar">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"></div>

                        <div className="relative">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 flex items-center gap-3 sticky top-0 bg-gradient-to-b from-slate-900 to-transparent pb-4">
                                <span>📖</span>
                                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">วิธีเล่น Werewolf</span>
                            </h2>
                            <p className="text-gray-400 mb-8">เกมสังคมที่ต้องใช้การสังเกตและการหลอกลวง</p>

                            <div className="space-y-8 text-gray-300">
                                {/* Objective */}
                                <section className="bg-gradient-to-br from-red-900/20 to-blue-900/20 border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span>🎯</span>
                                        <span className="text-violet-400">เป้าหมาย</span>
                                    </h3>
                                    <div className="space-y-3 text-base leading-relaxed">
                                        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                            <span className="text-2xl">🐺</span>
                                            <div>
                                                <p className="font-bold text-red-400 mb-1">หมาป่า (Werewolves)</p>
                                                <p className="text-gray-300">กำจัดชาวบ้านให้หมดก่อนที่จะถูกจับได้ โดยไม่ให้ใครรู้ตัวตนที่แท้จริง</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                            <span className="text-2xl">👥</span>
                                            <div>
                                                <p className="font-bold text-blue-400 mb-1">ชาวบ้าน (Villagers)</p>
                                                <p className="text-gray-300">ค้นหาและกำจัดหมาป่าทั้งหมดก่อนที่จะถูกฆ่าหมด</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Night Phase */}
                                <section className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span>🌙</span>
                                        <span className="text-indigo-400">รอบกลางคืน</span>
                                    </h3>
                                    <ul className="space-y-3 text-base">
                                        <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                            <span className="text-xl mt-0.5">🐺</span>
                                            <span><strong className="text-red-400">หมาป่า</strong> ตื่นขึ้นมาและเลือกเหยื่อ 1 คนเพื่อโจมตี</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                            <span className="text-xl mt-0.5">🔮</span>
                                            <span><strong className="text-purple-400">ผู้เห็น (Seer)</strong> ตรวจสอบบทบาทของผู้เล่น 1 คน</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                            <span className="text-xl mt-0.5">⚕️</span>
                                            <span><strong className="text-green-400">หมอ (Doctor)</strong> เลือกปกป้องผู้เล่น 1 คน (อาจเป็นตัวเองได้)</span>
                                        </li>
                                    </ul>
                                </section>

                                {/* Day Phase */}
                                <section className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span>☀️</span>
                                        <span className="text-yellow-400">รอบกลางวัน</span>
                                    </h3>
                                    <ul className="space-y-3 text-base">
                                        <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                            <span className="text-xl mt-0.5">💀</span>
                                            <span>ประกาศผู้ที่ถูกโจมตีในตอนกลางคืน (ถ้ามี)</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                            <span className="text-xl mt-0.5">💬</span>
                                            <span>ผู้เล่นทุกคนพูดคุย โต้แย้ง และแสดงความคิดเห็น</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                            <span className="text-xl mt-0.5">🗳️</span>
                                            <span>ลงคะแนนเสียงเพื่อกำจัดผู้ต้องสงสัย (คนที่โหวตมากที่สุดจะถูกกำจัด)</span>
                                        </li>
                                    </ul>
                                </section>

                                {/* Roles */}
                                <section className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span>👥</span>
                                        <span className="text-fuchsia-400">บทบาทในเกม</span>
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4 text-base">
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                            <p className="font-bold text-red-400 text-lg mb-2 flex items-center gap-2">
                                                <span>🐺</span>
                                                <span>หมาป่า</span>
                                            </p>
                                            <p className="text-gray-300 text-sm">ฆ่าชาวบ้านในตอนกลางคืน ต้องหลอกลวงให้ไม่มีใครรู้ตัวตน</p>
                                        </div>
                                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                            <p className="font-bold text-blue-400 text-lg mb-2 flex items-center gap-2">
                                                <span>👤</span>
                                                <span>ชาวบ้าน</span>
                                            </p>
                                            <p className="text-gray-300 text-sm">ไม่มีความสามารถพิเศษ ต้องใช้การสังเกตและการพูดคุย</p>
                                        </div>
                                        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                                            <p className="font-bold text-purple-400 text-lg mb-2 flex items-center gap-2">
                                                <span>🔮</span>
                                                <span>ผู้เห็น</span>
                                            </p>
                                            <p className="text-gray-300 text-sm">ตรวจสอบบทบาทของผู้เล่นคนหนึ่งได้ทุกคืน</p>
                                        </div>
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                            <p className="font-bold text-green-400 text-lg mb-2 flex items-center gap-2">
                                                <span>⚕️</span>
                                                <span>หมอ</span>
                                            </p>
                                            <p className="text-gray-300 text-sm">ปกป้องผู้เล่น 1 คนต่อคืน ไม่ให้ถูกโจมตีได้</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Tips */}
                                <section className="bg-gradient-to-br from-cyan-900/20 to-teal-900/20 border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span>💡</span>
                                        <span className="text-cyan-400">เคล็ดลับ</span>
                                    </h3>
                                    <ul className="space-y-2 text-base list-disc list-inside text-gray-300 ml-2">
                                        <li>สังเกตพฤติกรรมของผู้เล่นแต่ละคน</li>
                                        <li>ใช้จิตวิทยาและการสื่อสารเพื่อหาความจริง</li>
                                        <li>อย่าเชื่อใครง่ายๆ - ทุกคนอาจโกหกได้!</li>
                                        <li>ทำงานเป็นทีมกับฝั่งเดียวกัน</li>
                                    </ul>
                                </section>
                            </div>

                            <button
                                onClick={() => setShowRulesModal(false)}
                                className="w-full mt-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl text-white font-bold hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-violet-500/50 sticky bottom-0"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span>เข้าใจแล้ว เริ่มเล่นเลย!</span>
                                    <span>✨</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
                
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-gradient-x {
                    background-size: 200% auto;
                    animation: gradient-x 3s linear infinite;
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #8b5cf6, #d946ef);
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #7c3aed, #c026d3);
                }
            `}</style>
        </div>
    );
};

export default TestPage;
