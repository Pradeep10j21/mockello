import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

interface Question {
    id: number;
    question: string;
    options: string[];
    section: string;
    type?: 'mcq' | 'programming';
}

interface QuestionCardProps {
    question: Question;
    onAnswer: (answer: number | string) => void;
    isLast: boolean;
}

const QuestionCard = ({ question, onAnswer, isLast }: QuestionCardProps) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [typedAnswer, setTypedAnswer] = useState<string>('');

    const handleSubmit = () => {
        if (question.type === 'programming') {
            if (typedAnswer.trim()) {
                onAnswer(typedAnswer);
                setTypedAnswer('');
            }
        } else if (selectedOption !== null) {
            onAnswer(selectedOption);
            setSelectedOption(null);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-[#E9F2EB] border border-green-light/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-12 h-12 text-green-dark" />
                </div>

                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-green-primary mb-12 leading-tight tracking-tight max-w-3xl font-serif">
                        {question.question}
                    </h2>

                    {question.type === 'programming' ? (
                        <div className="mb-12">
                            <textarea
                                value={typedAnswer}
                                onChange={(e) => setTypedAnswer(e.target.value)}
                                placeholder="Enter your program here..."
                                className="w-full h-64 p-6 rounded-2xl border-2 border-green-light/20 bg-[#F2F6F0] text-green-primary font-mono text-lg focus:border-green-primary/50 focus:outline-none transition-all placeholder:text-green-muted/30"
                            />
                        </div>
                    ) : (
                        <div className="grid gap-4 mb-12">
                            {question.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setSelectedOption(index)}
                                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${selectedOption === index
                                        ? 'border-green-primary/50 bg-green-primary/5 text-green-primary'
                                        : 'border-green-light/20 bg-[#F2F6F0] text-green-muted hover:border-green-light hover:bg-green-light/10 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all ${selectedOption === index
                                            ? 'bg-green-primary text-white shadow-lg shadow-green-primary/20'
                                            : 'bg-green-light/20 text-green-muted'
                                            }`}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className={`flex-1 text-lg font-bold leading-tight ${selectedOption === index ? 'text-green-primary' : 'text-green-muted'
                                            }`}>
                                            {option}
                                        </span>

                                        <AnimatePresence>
                                            {selectedOption === index && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                >
                                                    <CheckCircle2 className="w-6 h-6 text-green-primary" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end pt-4 border-t border-green-light/30">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handleSubmit}
                                disabled={question.type === 'programming' ? !typedAnswer.trim() : selectedOption === null}
                                className={`h-16 px-10 rounded-2xl font-black text-xl transition-all ${(question.type === 'programming' ? !typedAnswer.trim() : selectedOption === null)
                                        ? 'bg-green-light/30 text-green-muted/50 grayscale cursor-not-allowed'
                                        : 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/20 hover:bg-[#059669]'
                                    }`}
                            >
                                {isLast ? 'COMPLETE TEST' : 'NEXT QUESTION'}
                                <ChevronRight className="w-6 h-6 ml-3" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
