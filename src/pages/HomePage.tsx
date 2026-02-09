import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion";

const HomePage = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const lobby = () => {
        navigate("/lobby");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 relative overflow-hidden font-sans">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(139,69,255,0.15)_0%,_transparent_70%)] pointer-events-none animate-pulse-glow"></div>

            {/* Stars Background */}
            <div className="absolute inset-0 pointer-events-none opacity-60 animate-twinkle"
                style={{
                    backgroundImage: `
                        radial-gradient(2px 2px at 20px 30px, white, transparent),
                        radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                        radial-gradient(1px 1px at 90px 40px, white, transparent),
                        radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent),
                        radial-gradient(1px 1px at 230px 80px, white, transparent),
                        radial-gradient(2px 2px at 300px 150px, rgba(255,255,255,0.7), transparent),
                        radial-gradient(1px 1px at 400px 60px, white, transparent),
                        radial-gradient(2px 2px at 500px 200px, rgba(255,255,255,0.8), transparent)
                    `,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '550px 200px'
                }}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 text-center p-8 animate-fade-in">
                {/* Logo Section */}
                <div className="mb-12">
                    <div className="text-6xl mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-floating">
                        🌙
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-[0.3em] m-0 mb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_40px_rgba(255,255,255,0.3))] animate-floating">
                        WEREWOLF
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 mt-2 tracking-[0.2em] animate-floating">
                        หมาป่าล่าชาวบ้าน
                    </p>

                    {isLoggedIn && (
                        <div className="w-full max-w-xs mx-auto flex justify-center items-center">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10
                                }}
                                onClick={lobby}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl text-white font-bold shadow-lg shadow-purple-500/20 mt-12"
                            >
                                🎮 เริ่มเกม
                            </motion.button>
                        </div>


                    )}

                </div>

                {/* Action Buttons */}
                {/* <div className="flex flex-col gap-4 max-w-xs mx-auto">
                    <button className="relative flex items-center justify-center gap-3 px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 overflow-hidden bg-gradient-to-br from-indigo-600 to-wolf-600 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.6)] group animate-slide-up">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                        <span className="text-2xl">🎮</span>
                        <span>สร้างห้อง</span>
                    </button>

                    <button className="relative flex items-center justify-center gap-3 px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 overflow-hidden bg-gradient-to-br from-green-600 to-green-700 text-white shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.6)] group animate-slide-up">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                        <span className="text-2xl">🚪</span>
                        <span>เข้าร่วมห้อง</span>
                    </button>

                    <button className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 overflow-hidden bg-white/10 text-gray-300 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] group animate-slide-up">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                        <span className="text-2xl">📖</span>
                        <span>วิธีเล่น</span>
                    </button>
                </div> */}

                {/* Footer */}
                {/* <div className="mt-12 text-gray-600 text-sm animate-slide-up">
                    <p>🐺 Werewolf Online v1.0</p>
                </div> */}
            </div>
        </div>
    )
}

export default HomePage
