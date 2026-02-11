import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1532274402911-5a3b027c55b9",
];

export default function BackgroundSlideshow() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev === 0 ? 1 : 0));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        // คลุมทั้งจอและตั้งเป็น relative
        <div className="relative w-full h-screen overflow-hidden bg-black">

            <AnimatePresence mode="wait">
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    // กำหนด Animation ด้วย Framer Motion
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    // ใช้ Tailwind จัดการขนาดและตำแหน่ง
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Overlay สำหรับทำให้ตัวหนังสืออ่านง่ายขึ้น (ถ้าต้องการ) */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content ด้านบน */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <h1 className="text-5xl font-bold drop-shadow-lg">
                    Tailwind + Framer
                </h1>
                <p className="mt-4 text-xl opacity-80">
                    Background is switching...
                </p>

                {/* ตัวอย่างปุ่มสลับรูปเอง */}
                <button
                    onClick={() => setIndex(index === 0 ? 1 : 0)}
                    className="mt-8 px-6 py-2 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 rounded-full transition-all"
                >
                    Switch Background
                </button>
            </div>
        </div>
    );
}