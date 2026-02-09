import { motion } from "framer-motion"



const CardCreateRoom = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="bg-slate-900/80 border border-purple-500/30 p-8 rounded-3xl max-w-md w-full relative"
            >

                <h2 className="text-3xl font-bold text-white mb-4">คืนนี้คุณคือ... 🐺</h2>
                <p className="text-slate-300">เตรียมตัวล่าเหยื่อเมื่อพระจันทร์เต็มดวง</p>
            </motion.div>
        </motion.div>
    )
}

export default CardCreateRoom