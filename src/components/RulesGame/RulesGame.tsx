import { motion } from "framer-motion";

interface RulesGameProps {
    onClose: () => void;
}

const RulesGame = ({ onClose }: RulesGameProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative bg-gradient-to-br from-slate-900 to-violet-950 border border-violet-500/30 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl shadow-violet-500/20 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl -z-10"></div>

                {/* Header Section */}
                <div className="flex justify-between items-start p-8 pb-4 bg-slate-900/40 backdrop-blur-xl border-b border-white/5 z-20">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center gap-3">
                            <span>📖</span>
                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">วิธีเล่น Werewolf</span>
                        </h2>
                        <p className="text-gray-400">เกมสังคมที่ต้องใช้การสังเกตและการหลอกลวง</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-2 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-8 pt-6 custom-scrollbar flex-1">
                    <div className="space-y-8 text-gray-300">
                        {/* Objective */}
                        <section className="bg-gradient-to-br from-red-900/20 to-blue-900/20 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span>🎯</span>
                                <span className="text-violet-400">เป้าหมาย</span>
                            </h3>
                            <div className="space-y-3 text-base leading-relaxed">
                                <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                                    <span className="text-2xl">🐺</span>
                                    <div>
                                        <p className="font-bold text-red-400 mb-1">หมาป่า (Werewolves)</p>
                                        <p className="text-gray-300">กำจัดชาวบ้านให้หมดก่อนที่จะถูกจับได้ โดยไม่ให้ใครรู้ตัวตนที่แท้จริง</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
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
                                <span className="text-indigo-400">🌙 รอบกลางคืน</span>
                            </h3>
                            <ul className="space-y-3 text-base">
                                <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-xl">🐺</span>
                                    <span><strong className="text-red-400">หมาป่า</strong> ตื่นขึ้นมาและเลือกเหยื่อ 1 คนเพื่อโจมตี</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-xl">🔮</span>
                                    <span><strong className="text-purple-400">ผู้เห็น (Seer)</strong> ตรวจสอบบทบาทของผู้เล่น 1 คน</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-xl">⚕️</span>
                                    <span><strong className="text-green-400">หมอ (Doctor)</strong> เลือกปกป้องผู้เล่น 1 คน (อาจเป็นตัวเองได้)</span>
                                </li>
                            </ul>
                        </section>

                        {/* Day Phase */}
                        <section className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="text-yellow-400">☀️ รอบกลางวัน</span>
                            </h3>
                            <ul className="space-y-3 text-base">
                                <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                    <span className="text-xl">💀</span>
                                    <span>ประกาศผู้ที่ถูกโจมตีในตอนกลางคืน (ถ้ามี)</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                    <span className="text-xl">💬</span>
                                    <span>ผู้เล่นทุกคนพูดคุย โต้แย้ง และแสดงความคิดเห็น</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                    <span className="text-xl">🗳️</span>
                                    <span>ลงคะแนนเสียงเพื่อกำจัดผู้ต้องสงสัย (คนที่โหวตมากที่สุดจะถูกกำจัด)</span>
                                </li>
                            </ul>
                        </section>

                        {/* Roles */}
                        <section className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="text-fuchsia-400">👥 บทบาทในเกม</span>
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
                                <span className="text-cyan-400">💡 เคล็ดลับ</span>
                            </h3>
                            <ul className="space-y-2 text-base list-disc list-inside text-gray-300 ml-2">
                                <li>สังเกตพฤติกรรมของผู้เล่นแต่ละคน</li>
                                <li>ใช้จิตวิทยาและการสื่อสารเพื่อหาความจริง</li>
                                <li>อย่าเชื่อใครง่ายๆ - ทุกคนอาจโกหกได้!</li>
                                <li>ทำงานเป็นทีมกับฝั่งเดียวกัน</li>
                            </ul>
                        </section>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-8 border-t border-white/5 bg-slate-900/40 backdrop-blur-md">
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl text-white font-black hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-violet-500/50 flex items-center justify-center gap-2 active:scale-95"
                    >
                        <span>เข้าใจแล้ว เริ่มเล่นเลย!</span>
                        <span>✨</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default RulesGame