import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Briefcase, Code, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DOMAINS: Record<string, string[]> = {
    'Engineering': ['Frontend (React)', 'Backend (Node.js)', 'Full Stack', 'DevOps', 'Data Science'],
    'Marketing': ['Digital Marketing', 'Content Strategy', 'SEO/SEM', 'Product Marketing'],
    'Product': ['Product Management', 'UX Design', 'User Research'],
    'Sales': ['B2B Sales', 'Inside Sales', 'Account Management']
};

const InterviewSetup = () => {
    const navigate = useNavigate();
    const [department, setDepartment] = useState('');
    const [domain, setDomain] = useState('');
    const [difficulty, setDifficulty] = useState('Intermediate');

    const handleStart = () => {
        if (department && domain) {
            navigate('/interview/session', {
                state: { department, domain, difficulty }
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#E9F2EB] flex items-center justify-center p-4 font-sans text-[#0F2C1F]">

            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], x: [0, 50, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[80px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#0F2C1F] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <Brain className="w-8 h-8 text-[#CCDBD0]" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2 tracking-tight">AI Interview Configuration</h1>
                    <p className="text-[#0F2C1F]/70 text-lg">Customize your interview session to match your career goals.</p>
                </div>

                <Card className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8">
                    <div className="space-y-6">

                        {/* Department Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold uppercase tracking-wider opacity-70 flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Department
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {Object.keys(DOMAINS).map((dept) => (
                                    <button
                                        key={dept}
                                        onClick={() => { setDepartment(dept); setDomain(''); }}
                                        className={`p-3 rounded-xl border transition-all text-sm font-medium ${department === dept
                                            ? 'bg-[#0F2C1F] text-[#CCDBD0] border-[#0F2C1F]'
                                            : 'bg-white/50 border-transparent hover:bg-white hover:shadow-md'
                                            }`}
                                    >
                                        {dept}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Domain Selection */}
                        {department && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-3"
                            >
                                <label className="text-sm font-semibold uppercase tracking-wider opacity-70 flex items-center gap-2">
                                    <Code className="w-4 h-4" /> Specialization
                                </label>
                                <Select value={domain} onValueChange={setDomain}>
                                    <SelectTrigger className="bg-white/50 border-transparent h-12 rounded-xl text-base">
                                        <SelectValue placeholder="Select your domain" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DOMAINS[department].map(d => (
                                            <SelectItem key={d} value={d}>{d}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </motion.div>
                        )}

                        {/* Action Button */}
                        <div className="pt-6">
                            <Button
                                className="w-full h-14 text-lg font-semibold rounded-xl transition-all hover:scale-[1.02]"
                                style={{ backgroundColor: '#0F2C1F', color: '#CCDBD0' }}
                                disabled={!department || !domain}
                                onClick={handleStart}
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                Enter Interview Room
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default InterviewSetup;
