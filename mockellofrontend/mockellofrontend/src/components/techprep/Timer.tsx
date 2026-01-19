import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
    totalSeconds: number;
    onTimeUp: () => void;
}

const Timer = ({ totalSeconds, onTimeUp }: TimerProps) => {
    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

    useEffect(() => {
        if (secondsLeft <= 0) {
            onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, onTimeUp]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const progress = (secondsLeft / totalSeconds) * 100;

    const isLowTime = secondsLeft <= 300; // 5 minutes warning
    const isCritical = secondsLeft <= 60; // 1 minute critical

    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 ${isCritical
                ? 'bg-red-50 border-red-200 animate-pulse'
                : isLowTime
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-white border-slate-200'
            }`}>
            <Clock className={`w-5 h-5 ${isCritical ? 'text-red-500' : isLowTime ? 'text-amber-500' : 'text-emerald-600'
                }`} />
            <div className="flex flex-col">
                <span className={`font-mono text-lg font-semibold ${isCritical ? 'text-red-500' : isLowTime ? 'text-amber-500' : 'text-emerald-700'
                    }`}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${isCritical
                                ? 'bg-red-500'
                                : isLowTime
                                    ? 'bg-amber-500'
                                    : 'bg-emerald-500'
                            }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Timer;
