import { motion } from 'framer-motion'

const STARS = Array.from({ length: 20 }, () => ({
    width: Math.random() * 3 + 1 + 'px',
    height: Math.random() * 3 + 1 + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
}));

const CardNight = () => {

    return (
        <div>
            {/* Backdrop Blur */}
            <motion.div
                initial={{ opacity: 0 }}
                exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.3, ease: "easeIn" }
                }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-lg"
            />

            {/* Night Notification Popup */}
            <motion.div
                initial={{ opacity: 0, y: 200, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                    opacity: 0,
                    y: 100,
                    scale: 0.9,
                    transition: { duration: 0.2 }
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }}
                className="fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                           w-[600px] max-w-[90vw]"
            >
                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 
                                rounded-3xl border-2 border-indigo-500/30 shadow-2xl shadow-indigo-900/50 
                                overflow-hidden">

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-50" />

                    {/* Stars Background Pattern */}
                    <div className="absolute inset-0 opacity-30">
                        {STARS.map((s, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-white rounded-full"
                                style={{
                                    width: s.width,
                                    height: s.height,
                                    top: s.top,
                                    left: s.left,
                                }}
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: s.duration,
                                    repeat: Infinity,
                                    delay: s.delay
                                }}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative px-12 py-16 flex flex-col items-center text-center space-y-6">

                        {/* Moon Icon with Glow */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: [0.22, 1, 0.36, 1] // แบบ fast-to-smooth
                            }}
                            className="relative"
                        >
                            <div className="absolute inset-0 blur-3xl bg-yellow-300/40 scale-150" />
                            <p className="relative text-[120px] drop-shadow-[0_0_30px_rgba(253,224,71,1)] 
                                         drop-shadow-[0_0_60px_rgba(253,224,71,0.6)]">
                                🌙
                            </p>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2"
                        >
                            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 
                                         bg-clip-text text-transparent drop-shadow-lg">
                                กลางคืนมาเยือน
                            </h2>
                            <p className="text-indigo-300/80 text-lg">
                                ความมืดห่อหุ้มหมู่บ้าน... มนุษย์หมาป่าตื่นขึ้น
                            </p>
                        </motion.div>

                        {/* Divider */}
                        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-300/70 text-sm max-w-md leading-relaxed"
                        >
                            ทุกคนกรุณาหลับตา มนุษย์หมาป่าจะเลือกเหยื่อของพวกเขา...
                        </motion.p>

                        {/* Animated Close Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}

                            className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                                     hover:from-indigo-500 hover:to-purple-500
                                     text-white font-semibold rounded-xl 
                                     border border-indigo-400/30 shadow-lg shadow-indigo-900/50
                                     transition-all duration-300"
                        >
                            เข้าใจแล้ว
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default CardNight