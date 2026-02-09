import { motion } from 'framer-motion'


const moon = () => {
    return (
        <motion.div
            animate={{
                y: [0, -20, 0],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}

            className="relative z-10 flex flex-col items-center"
        >
            <div className="relative">
                {/* 1. แสงฟุ้งชั้นนอก (The Blur Core) */}
                <div className="absolute inset-0 bg-yellow-200 rounded-full blur-[40px] opacity-40 animate-pulse"></div>

                {/* 2. แสงเรืองรอบตัว (The Glow) */}
                <h1 className="text-6xl relative drop-shadow-[0_0_15px_rgba(253,224,71,0.8)] drop-shadow-[0_0_30px_rgba(253,224,71,0.4)]">
                    🌙
                </h1>
            </div>

        </motion.div>
    )
}

export default moon