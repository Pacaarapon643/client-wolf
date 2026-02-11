import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const VotingTimer = ({ initialSeconds = 60 }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const totalTime = 60; // ตั้งเวลาเต็มไว้ที่ 60 วินาที

    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        // ล้างนาฬิกาเมื่อเลิกใช้ (เหมือนที่พี่เคยเขียนเลย!)
        return () => clearInterval(timer);
    }, [seconds]);

    // คำนวณเปอร์เซ็นต์สำหรับวงกลม
    const percentage = (seconds / totalTime) * 100;

    return (
        <div className="flex flex-col items-center justify-center  bg-[#0f172a] rounded-3xl border border-white/10 p-6 w-full">
            <div className="w-40 h-40 mb-6 relative">
                <CircularProgressbar
                    value={percentage}
                    text={`${seconds}`}
                    strokeWidth={2}
                    styles={buildStyles({
                        // สีม่วงสว่างแบบในรูป
                        pathColor: `#a855f7`,
                        // สีพื้นหลังวงกลมที่ยังไปไม่ถึง
                        trailColor: '#1e293b',
                        // ปรับสีตัวเลขขาวและฟอนต์ Kanit ตามโปรเจกต์พี่
                        textColor: '#fff',
                        textSize: '24px',
                        pathTransitionDuration: 0.5,
                        strokeLinecap: 'round',
                    })}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">Seconds</span>
                </div>
            </div>

            <div className="text-center">
                <h3 className="text-white text-xl font-semibold mb-1">Voting Phase</h3>
                <p className="text-white/40 text-sm">Choose wisely...</p>
            </div>
        </div>
    );
};

export default VotingTimer;