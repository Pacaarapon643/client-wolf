import { motion } from 'framer-motion'

const VillageBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-100 -z-10">

            {/* ☀️ Sun (with glow) */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 right-10"
            >
                <div className="w-24 h-24 bg-yellow-400 rounded-full shadow-[0_0_60px_rgba(250,204,21,0.6)] animate-pulse" />
            </motion.div>

            {/* ☁️ Cloud Layer 1 (Slow & Large) */}
            <motion.div
                initial={{ x: '-10%' }}
                animate={{ x: '110%' }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                className="absolute top-20 left-0 flex space-x-96 opacity-80"
            >
                <div className="text-9xl filter drop-shadow-lg text-white/90">☁️</div>
                <div className="text-[10rem] filter drop-shadow-xl text-white/80 mt-12">☁️</div>
            </motion.div>

            {/* ☁️ Cloud Layer 2 (Faster & Smaller) */}
            <motion.div
                initial={{ x: '-20%' }}
                animate={{ x: '120%' }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 2 }}
                className="absolute top-40 left-0 flex space-x-64 opacity-60 scale-75"
            >
                <div className="text-8xl filter drop-shadow-md text-white">☁️</div>
                <div className="text-9xl filter drop-shadow-md text-white mt-8">☁️</div>
                <div className="text-7xl filter drop-shadow-sm text-white -mt-4">☁️</div>
            </motion.div>

            {/* 🏔️ Mountains (Parallax Layer) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end justify-center pointer-events-none opacity-40">
                <div className="w-[120%] h-64 bg-emerald-300 rounded-[50%_50%_0_0/100%_100%_0_0] translate-y-12 blur-[2px]" />
                <div className="absolute w-[140%] h-48 bg-emerald-400 rounded-[60%_60%_0_0/100%_100%_0_0] translate-y-8 -translate-x-24 blur-[1px]" />
            </div>

            {/* 🌲 Ground Elements (Foreground) */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-emerald-800 to-emerald-600 flex items-end justify-center gap-8 px-8 pb-2 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                {/* Trees */}
                <span className="text-8xl mb text-emerald-900 drop-shadow-xl brightness-75 -ml-12">🌲</span>
                <span className="text-6xl mb text-emerald-800 drop-shadow-lg brightness-90">🌳</span>

                {/* House Silhouette 1 */}
                <div className="w-24 h-28 bg-slate-800 relative drop-shadow-2xl translate-y-2" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                    <div className="absolute -top-12 left-0 w-full h-12 bg-slate-700" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                    <div className="w-8 h-8 bg-yellow-200/50 absolute top-8 left-4 rounded-sm animate-pulse" />
                </div>

                <span className="text-9xl mb text-emerald-900 drop-shadow-2xl brightness-50">🌲</span>

                {/* House Silhouette 2 */}
                <div className="w-32 h-20 bg-slate-800 relative drop-shadow-2xl translate-y-2" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                    <div className="absolute -top-10 left-0 w-full h-10 bg-slate-700" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                    <div className="w-16 h-8 bg-yellow-200/50 absolute top-6 left-8 rounded-sm animate-pulse" />
                </div>

                <span className="text-7xl mb text-emerald-800 drop-shadow-xl brightness-75">🌳</span>
            </div>


        </div>
    )
}

export default VillageBackground
