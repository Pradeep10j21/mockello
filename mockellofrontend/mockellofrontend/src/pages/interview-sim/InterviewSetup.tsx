import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    Briefcase,
    Code,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    Zap,
    Bot,
    AudioLines,
    LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MockelloLogo from '@/components/MockelloLogo';

const DOMAINS: Record<string, string[]> = {
    'CSE': ['Frontend (React)', 'Backend (Node.js)', 'Full Stack', 'DevOps', 'Data Science', 'Machine Learning', 'Cloud Computing', 'Database Design'],
    'IT': ['IT Support', 'Network Administration', 'System Administration', 'IT Security', 'Cloud Infrastructure', 'Database Management'],
    'ECE': ['Embedded Systems', 'Digital Signal Processing', 'Microcontrollers', 'FPGA Design', 'RF & Wireless', 'Circuit Design'],
    'Mechanical': ['CAD & Design', 'Thermal Engineering', 'Manufacturing', 'Robotics', 'Automotive', 'Heat Transfer'],
    'Civil': ['Structural Design', 'Project Management', 'Construction Management', 'Geotechnical', 'Water Resources', 'Transportation'],
    'Electrical': ['Power Systems', 'Control Systems', 'Electrical Machines', 'Power Electronics', 'Grid Design', 'Renewable Energy'],
    'B.Com': ['Financial Accounting', 'Corporate Accounting', 'Taxation', 'Auditing', 'Financial Management', 'Business Law', 'Economics', 'Cost Accounting'],
    'Marketing': ['Digital Marketing', 'Content Strategy', 'SEO/SEM', 'Product Marketing', 'Brand Management', 'Market Research'],
    'Finance': ['Investment Banking', 'Corporate Finance', 'Risk Management', 'Financial Analysis', 'Portfolio Management'],
    'Sales': ['B2B Sales', 'Inside Sales', 'Account Management', 'Sales Strategy', 'Negotiation']
};

const InterviewSetup = () => {
    const navigate = useNavigate();
    const [department, setDepartment] = useState('');
    const [domain, setDomain] = useState('');
    const [difficulty, setDifficulty] = useState('Intermediate');
    const [showConfig, setShowConfig] = useState(false);

    const handleStart = () => {
        if (department && domain) {
            navigate('/interview/session', {
                state: { department, domain, difficulty }
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F6F0] text-[#0F2C1F] overflow-hidden font-sans selection:bg-green-soft/30 flex flex-col items-center justify-center relative">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 z-0 bg-grid-green/10 animate-grid-pulse pointer-events-none opacity-20" />

            {/* Subtle Glow Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[150px]" />
            </div>

            <main className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center py-12">
                <AnimatePresence mode="wait">
                    {!showConfig ? (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            {/* Floating AI Elements */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <motion.div
                                    animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 10, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-[20%] right-[10%] opacity-10"
                                >
                                    <Brain className="w-24 h-24 text-green-600" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 40, 0], x: [0, -20, 0], rotate: [0, -10, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-[30%] left-[10%] opacity-10"
                                >
                                    <Bot className="w-20 h-20 text-emerald-600" />
                                </motion.div>
                            </div>

                            {/* Logo Section */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-3 rounded-2xl bg-white shadow-xl shadow-green-900/5 ring-1 ring-green-900/5"
                            >
                                <MockelloLogo size="md" />
                            </motion.div>

                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/5 border border-green-600/10 mb-8 backdrop-blur-md"
                            >
                                <Sparkles className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-bold text-green-600 flex items-center gap-1.5 uppercase tracking-wider">
                                    Next-Gen AI Interviewer <CheckCircle2 className="w-3.5 h-3.5" />
                                </span>
                            </motion.div>

                            <h1 className="text-5xl md:text-8xl font-black text-green-primary mb-4 tracking-tight leading-[1] font-serif">
                                Intelligent AI <br /> <span className="text-green-600 italic">Co-Pilot</span>
                            </h1>

                            <h2 className="text-xl md:text-2xl text-green-600/60 font-medium mb-10 tracking-[0.2em] uppercase italic">
                                Adaptive Learning Path|
                            </h2>

                            <p className="text-lg text-green-muted mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                                Our neural-driven AI interviewer adapts to your individual responses.
                                Deep behavioral insights, industry-specific depth, and hyper-realistic simulation.
                            </p>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block"
                            >
                                <Button
                                    size="lg"
                                    onClick={() => setShowConfig(true)}
                                    className="h-20 px-16 text-2xl font-black bg-[#0F2C1F] hover:bg-[#1a402d] text-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,44,31,0.4)] transition-all duration-300 flex items-center gap-4 group"
                                >
                                    CONFIGURE SESSION
                                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>

                            {/* Feature Pills */}
                            <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60">
                                <div className="flex items-center gap-2">
                                    <AudioLines className="w-5 h-5 text-green-600" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-green-muted">Neural Voice</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-green-600" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-green-muted">Instant Feedback</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <LineChart className="w-5 h-5 text-green-600" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-green-muted">Growth Metrics</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="config"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full max-w-2xl relative z-10"
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-black mb-2 tracking-tight text-green-primary font-serif">AI Interview <span className="text-green-600 italic">Setup</span></h1>
                                <p className="text-green-muted text-lg font-medium">Customize your neural interview experience.</p>
                            </div>

                            <Card className="bg-[#E9F2EB] border border-green-light/50 shadow-2xl rounded-3xl p-10">
                                <div className="space-y-8">
                                    {/* Department Selection */}
                                    <div className="space-y-4 text-left">
                                        <label className="text-xs font-bold uppercase tracking-widest text-green-muted flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" /> 01. Select Stream
                                        </label>
                                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                            {Object.keys(DOMAINS).map((dept) => (
                                                <button
                                                    key={dept}
                                                    onClick={() => { setDepartment(dept); setDomain(''); }}
                                                    className={`p-6 rounded-2xl border transition-all text-left ${department === dept
                                                        ? 'bg-[#0F2C1F] border-[#0F2C1F] text-white shadow-md'
                                                        : 'bg-[#F2F6F0] border-green-light/50 text-green-muted hover:border-green-muted hover:bg-white'
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
                                            className="space-y-4 text-left"
                                        >
                                            <label className="text-xs font-bold uppercase tracking-widest text-green-muted flex items-center gap-2">
                                                <Code className="w-4 h-4" /> 02. Specialization
                                            </label>
                                            <Select value={domain} onValueChange={setDomain}>
                                                <SelectTrigger className="bg-white/50 border-green-light/50 h-14 rounded-2xl text-base ring-offset-green-600 focus:ring-green-600 text-green-primary font-bold">
                                                    <SelectValue placeholder="Focus Area" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#F2F6F0] border-green-light/50 text-green-primary">
                                                    {DOMAINS[department].map(d => (
                                                        <SelectItem key={d} value={d} className="focus:bg-green-light/20 focus:text-green-primary">{d}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </motion.div>
                                    )}

                                    {/* Difficulty */}
                                    {domain && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-4 text-left"
                                        >
                                            <label className="text-xs font-bold uppercase tracking-widest text-green-muted flex items-center gap-2">
                                                <Zap className="w-4 h-4" /> 03. Intensity Level
                                            </label>
                                            <div className="flex gap-4">
                                                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                                    <button
                                                        key={level}
                                                        onClick={() => setDifficulty(level)}
                                                        className={`flex-1 p-4 rounded-2xl border transition-all text-sm font-bold ${difficulty === level
                                                            ? 'bg-green-primary text-white border-green-primary shadow-lg shadow-green-900/20'
                                                            : 'bg-white/50 border-green-light/50 hover:bg-green-light/20 text-green-muted'
                                                            }`}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Action Button */}
                                    <div className="pt-6 flex gap-4">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setShowConfig(false)}
                                            className="h-16 px-8 rounded-2xl border border-green-light/50 hover:bg-green-light/10 font-bold text-green-muted"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className={`w-full h-16 font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] ${domain
                                                    ? 'bg-[#0F2C1F] hover:bg-[#1a402d] text-white shadow-green-900/20'
                                                    : 'bg-green-light/30 text-green-muted cursor-not-allowed border border-green-light/50 shadow-none opacity-50'
                                                }`}
                                            disabled={!domain}
                                            onClick={handleStart}
                                        >
                                            <Sparkles className="w-6 h-6 mr-3" />
                                            INTELLIGIZE & START
                                            <ChevronRight className="w-6 h-6 ml-3" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default InterviewSetup;
