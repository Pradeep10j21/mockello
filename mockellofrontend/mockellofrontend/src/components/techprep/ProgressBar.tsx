interface ProgressBarProps {
    current: number;
    total: number;
    currentSection: string;
}

const ProgressBar = ({ current, total, currentSection }: ProgressBarProps) => {
    const progress = ((current + 1) / total) * 100;

    const getColors = (section: string) => {
        const s = section.toLowerCase();
        // Since we are in a Green theme, let's use different shades of green or related harmonious colors
        if (s.includes('dbms') || s.includes('database')) return { bar: 'from-green-primary to-green-dark', badge: 'bg-green-primary/10 text-green-primary' };
        if (s.includes('os') || s.includes('operating')) return { bar: 'from-green-dark to-green-muted', badge: 'bg-green-dark/10 text-green-dark' };
        if (s.includes('network')) return { bar: 'from-green-muted to-green-soft', badge: 'bg-green-muted/10 text-green-muted' };
        if (s.includes('dsa') || s.includes('algo') || s.includes('structure')) return { bar: 'from-green-primary to-green-muted', badge: 'bg-green-primary/10 text-green-dark' };
        return { bar: 'from-green-muted to-green-light', badge: 'bg-green-light/20 text-green-muted' };
    };

    const colors = getColors(currentSection);

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <span className="text-[10px] font-black text-green-muted uppercase tracking-[0.2em] block">Current Progress</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-green-primary leading-none font-serif">{current + 1}</span>
                        <span className="text-sm font-bold text-green-muted">/ {total}</span>
                    </div>
                </div>

                <div className={`px-4 py-2 rounded-xl border border-green-light/50 font-black text-xs uppercase tracking-widest shadow-sm ${colors.badge}`}>
                    {currentSection}
                </div>
            </div>

            <div className="h-3 bg-green-light/20 rounded-full overflow-hidden p-0.5 border border-green-light/30 shadow-inner">
                <div
                    className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${colors.bar}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
