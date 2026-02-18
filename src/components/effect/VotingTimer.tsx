import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface VotingTimerProps {
    initialSeconds?: number;
    children?: React.ReactNode;
    phase?: string;
}

const VotingTimer: React.FC<VotingTimerProps> = ({ initialSeconds = 60, children, phase }) => {
    let totalTime = initialSeconds;
    if (phase == "day") {
        totalTime = 60;
    }
    if (phase == "night") {
        totalTime = 30;
    }
    if (phase == "vote") {
        totalTime = 30;
    }

    const percentage = (initialSeconds / totalTime) * 100;

    return (
        <div className="flex flex-col items-center justify-center  bg-[#0f172a] rounded-3xl border border-white/10 p-6 w-full">
            <div className="w-40 h-40 mb-6 relative">
                <CircularProgressbar
                    value={percentage}
                    text={`${initialSeconds}`}
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
            {children}
            {/* <div className="text-center">
                <h3 className="text-white text-xl font-semibold mb-1">Voting Phase</h3>
                <p className="text-white/40 text-sm">Choose wisely...</p>
            </div> */}
        </div>
    );
};

export default VotingTimer;