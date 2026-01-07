type Section = 'DBMS' | 'OS' | 'Networking' | 'DSA';

interface ProgressBarProps {
    current: number;
    total: number;
    currentSection: Section;
}

const ProgressBar = ({ current, total, currentSection }: ProgressBarProps) => {
    const progress = ((current + 1) / total) * 100;

    const sectionColors: Record<Section, string> = {
        DBMS: 'bg-blue-500',
        OS: 'bg-purple-500',
        Networking: 'bg-cyan-500',
        DSA: 'bg-emerald-500'
    };

    const sectionBadgeColors: Record<Section, string> = {
        DBMS: 'bg-blue-100 text-blue-700',
        OS: 'bg-purple-100 text-purple-700',
        Networking: 'bg-cyan-100 text-cyan-700',
        DSA: 'bg-emerald-100 text-emerald-700'
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-500">
                    Question {current + 1} of {total}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sectionBadgeColors[currentSection]}`}>
                    {currentSection}
                </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${sectionColors[currentSection]}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
