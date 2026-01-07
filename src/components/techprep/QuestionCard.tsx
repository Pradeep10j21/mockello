import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

interface Question {
    id: number;
    question: string;
    options: string[];
    section: string;
}

interface QuestionCardProps {
    question: Question;
    onAnswer: (selectedOption: number) => void;
    isLast: boolean;
}

const QuestionCard = ({ question, onAnswer, isLast }: QuestionCardProps) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleSubmit = () => {
        if (selectedOption !== null) {
            onAnswer(selectedOption);
            setSelectedOption(null);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">
                    {question.question}
                </h2>

                <div className="space-y-3 mb-8">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedOption(index)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${selectedOption === index
                                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${selectedOption === index
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <span className={`flex-1 ${selectedOption === index ? 'text-slate-800 font-medium' : 'text-slate-600'
                                    }`}>
                                    {option}
                                </span>
                                {selectedOption === index && (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className="min-w-[160px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        size="lg"
                    >
                        {isLast ? 'Submit Test' : 'Next Question'}
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
