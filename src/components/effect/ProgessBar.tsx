import { motion } from "framer-motion";

type PlayerProgressBarProps = {
    current: number;
    max: number;
    className?: string;
}

const PlayerProgressBar = ({ current, max, className }: PlayerProgressBarProps) => {
    // คำนวณเปอร์เซ็นต์
    const progress = (current / max) * 100;

    return (
        <div className={`flex items-center gap-4 w-full text-white ${className}`.trim()}>
            <div className="relative h-4 flex-1 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                />
            </div>
        </div >
    );
};

export default PlayerProgressBar;