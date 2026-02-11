import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import VotingTimer from "../components/effect/VotingTimer";


const GamePlayPage = () => {

    const images = [
        "/bg-game-day.png",
        "/Gemini_Generated_Image_x8sksgx8sksgx8sk.png",
        "/ชาวบ้าน1.png"
    ]



    const [indeximg, setIndeximg] = useState(0)
    useEffect(() => {
        // const timer = setInterval(() => {
        //     setIndeximg((prev) => (prev === 0 ? 1 : 0));
        // }, 5000);
        // return () => clearInterval(timer);
    }, []);
    



    return (
        <div className="hidden sm:block min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-black relative overflow-hidden h-screen font-kanit">

            {/* ส่วน Grid */}
            <div className="relative z-10 grid grid-cols-3 grid-cols-[auto_1fr_auto] h-full pt-[80px] gap-6 px-6 pb-6">

                {/* คอลัมน์ที่ 1: ห้องแชท */}
                <div className="flex flex-col h-full w-[300px]">
                    {/* ส่วนหัวแชท */}
                    <div className="rounded-t-2xl border border-white/10 border-b-0 bg-blue-950/20 backdrop-blur-xl p-4 shadow-lg shadow-blue-500/5">
                        <p className="text-white text-lg font-bold flex items-center gap-2">
                            <span className="text-xl animate-bounce">💬</span>
                            <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">ห้องแชท</span>
                        </p>
                    </div>

                    {/* ส่วนเนื้อหาแชท */}
                    <div className="flex-1 overflow-y-auto border border-white/10 bg-blue-950/10 backdrop-blur-xl p-4 space-y-4 custom-scrollbar">
                        <div className="text-blue-300/40 text-xs font-medium tracking-widest text-center border-b border-white/5 pb-2 uppercase">
                            Midnight Conversations
                        </div>
                        {/* ข้อความแชทต่างๆ จะอยู่ตรงนี้ */}
                    </div>

                    {/* ส่วนท้ายแชท (ช่องพิมพ์) */}
                    <div className="rounded-b-2xl border border-white/10 border-t-0 bg-blue-950/20 backdrop-blur-xl p-3">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="ส่งข้อความถึงทุกคน..."
                                className="w-full bg-black/40 hover:bg-black/60 border border-white/10 focus:border-blue-500/50 text-white placeholder:text-white/20 px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-cyan-300 hover:scale-110 transition-all">
                                🚀
                            </button>
                        </div>
                    </div>
                </div>

                {/* คอลัมน์ที่ 2: พื้นที่หลักของเกม */}
                <div className="flex flex-col">
                    <div className="h-full border border-white/10 rounded-3xl bg-blue-950/5 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden relative group flex-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-40"></div>
                        <div className="absolute inset-0 border-[2px] border-white/5 rounded-3xl pointer-events-none"></div>
                        <div className="grid grid-cols-3 gap-3 p-4">
                            {[
                                { icon: "🎮", title: "สร้างห้อง", desc: "เป็นเจ้าของห้องและเริ่มเกม" },
                                { icon: "🚪", title: "เข้าร่วมห้อง", desc: "เริ่มเกมเลย" },
                                { icon: "📘", title: "วิธีการเล่น", desc: "เรียนรู้วิธีการเล่นเกม" },
                            ].map((item, index) => (
                                <div key={index} className="relative overflow-hidden rounded-xl  h-[300px]">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={images[indeximg]}
                                            src={images[indeximg]}
                                            // กำหนด Animation ด้วย Framer Motion
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.5 }}
                                            // ใช้ Tailwind จัดการขนาดและตำแหน่ง
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <motion.img
                                            key={images[2]}
                                            src={images[2]}
                                            // กำหนด Animation ด้วย Framer Motion
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.5 }}
                                            // ใช้ Tailwind จัดการขนาดและตำแหน่ง
                                            className="absolute  bottom-[0%]  left-[32%] w-[150px] h-[170px] object-cover"
                                        />
                                    </AnimatePresence>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-[100px] border border-white/10 flex justify-between items-center p-4">
                        <div className="flex gap-2">
                            <div className="bg-red-500 w-[50px] h-[50px] rounded-xl">
                                <div className="text-2xl w-full h-full flex items-center justify-center">
                                    <img src="/4081853.png" alt="wolf" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="text-xl text-white flex flex-col">
                                <p>คุณคือหมาป่า</p>
                                <p>คุณคือหมาป่า</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.05,
                                    // rotate: 2, 
                                    boxShadow: "0px 0px 12px rgba(168, 85, 247, 0.6)"
                                }}
                                whileTap={{ scale: 0.95, opacity: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="bg-purple-600 text-white p-3 rounded-xl border border-white/10"
                            >
                                ยืนยันการโหวต
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.05,
                                    // rotate: 2, 
                                    boxShadow: "0px 0px 12px rgba(215, 209, 221, 0.6)"
                                }}
                                whileTap={{ scale: 0.95, opacity: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="bg-white/10 text-white p-3 rounded-xl border border-white/10"
                            >
                                ข้ามการโหวตคืนนี้
                            </motion.button>

                        </div>

                    </div>
                </div>


                {/* คอลัมน์ที่ 3: ข้อมูลผู้เล่น / สถิติ */}
                <div className="full border border-white/10 rounded-3xl bg-blue-950/5 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden relative w-[300px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-cyan-500/10 opacity-40"></div>
                    <div className="absolute inset-0 border-[2px] border-white/5 rounded-3xl pointer-events-none"></div>
                    <VotingTimer></VotingTimer>
                </div>
            </div>
        </div>
    );
};

export default GamePlayPage;
