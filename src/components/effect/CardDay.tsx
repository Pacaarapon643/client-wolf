import { motion } from 'framer-motion'




const CardDay = () => {
    return (
        <div>
            {/* Backdrop Blur */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.3, ease: "easeIn" }
                }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-40 bg-white/40 backdrop-blur-lg"
            />

            {/* Day Notification Popup */}
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
                <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 
                                rounded-3xl border-2 border-amber-300/50 shadow-2xl shadow-amber-500/30 
                                overflow-hidden">

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-transparent to-orange-200/20 opacity-50" />

                    {/* Sparkles Background Pattern */}
                    <div className="absolute inset-0 opacity-40">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-amber-400 rounded-full"
                                style={{
                                    width: Math.random() * 4 + 2 + 'px',
                                    height: Math.random() * 4 + 2 + 'px',
                                    top: Math.random() * 100 + '%',
                                    left: Math.random() * 100 + '%',
                                }}
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative px-12 py-16 flex flex-col items-center text-center space-y-6">

                        {/* Sun Icon with Glow */}
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                rotate: {
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                },
                                scale: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="relative"
                        >
                            <div className="absolute inset-0 blur-3xl bg-yellow-400/60 scale-150" />
                            <p className="relative text-[120px] drop-shadow-[0_0_40px_rgba(251,191,36,1)] 
                                         drop-shadow-[0_0_80px_rgba(251,191,36,0.7)]">
                                ☀️
                            </p>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2"
                        >
                            <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 
                                         bg-clip-text text-transparent drop-shadow-lg">
                                กลางวันมาถึง
                            </h2>
                            <p className="text-amber-700/90 text-lg font-medium">
                                แสงอรุณส่องสว่าง... ชาวบ้านตื่นขึ้นมา
                            </p>
                        </motion.div>

                        {/* Divider */}
                        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-amber-800/70 text-sm max-w-md leading-relaxed"
                        >
                            ทุกคนเปิดตาได้แล้ว ชาวบ้านจะร่วมกันหาตัวมนุษย์หมาป่า...
                        </motion.p>

                        {/* Animated Close Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 20px rgba(251, 191, 36, 0.6)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                                     hover:from-amber-400 hover:to-orange-400
                                     text-white font-semibold rounded-xl 
                                     border border-amber-300/50 shadow-lg shadow-amber-500/40
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

export default CardDay
