import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    ChevronRight,
    Sparkles,
    ArrowLeft,
    GraduationCap,
    Lightbulb,
    Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DEPARTMENT_CATEGORIES } from '@/data/techprepQuestions';

function TechPrepDepartmentSelection() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<'Engineering' | 'Commerce'>('Engineering');
    const [department, setDepartment] = useState('');

    const handleStart = () => {
        if (department) {
            navigate('/techprep/instructions', {
                state: { department }
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F6F0] flex items-center justify-center p-6 font-sans text-green-dark overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-green-light/20 blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-green-muted/10 blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl relative z-10"
            >
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-primary/10"
                    >
                        <Brain className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-green-primary font-serif">
                        Tailored <span className="text-green-dark italic">Assessment</span>
                    </h1>
                    <p className="text-green-muted text-lg font-medium">Choose your field of expertise to personalize your journey.</p>
                </div>

                <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8">
                    {/* Category Selection */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-green-muted mb-6 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Category
                        </h3>
                        {Object.keys(DEPARTMENT_CATEGORIES).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat as any);
                                    setDepartment('');
                                }}
                                className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between group ${selectedCategory === cat
                                    ? 'bg-green-primary border-green-primary text-white shadow-lg shadow-green-primary/20'
                                    : 'bg-[#E9F2EB] border-green-light/50 text-green-muted hover:border-green-muted hover:bg-[#CCDBD0]/30'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {cat === 'Engineering' ? <Lightbulb className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                                    <span className="font-bold">{cat}</span>
                                </div>
                                <ChevronRight className={`w-5 h-5 transition-transform ${selectedCategory === cat ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Department Grid */}
                    <Card className="bg-[#E9F2EB]/50 backdrop-blur-xl border border-green-light/50 rounded-[2.5rem] p-8 lg:p-10 shadow-sm overflow-hidden">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-green-muted mb-8 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" /> Select Specialization
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AnimatePresence mode="wait">
                                {DEPARTMENT_CATEGORIES[selectedCategory].map((dept, idx) => (
                                    <motion.button
                                        key={dept}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => setDepartment(dept)}
                                        className={`p-6 rounded-2xl border transition-all text-left group relative overflow-hidden ${department === dept
                                            ? 'bg-[#0F2C1F] border-[#0F2C1F] text-white shadow-md'
                                            : 'bg-[#F2F6F0] border-green-light/50 hover:border-green-muted text-green-muted hover:bg-white'
                                            }`}
                                    >
                                        <div className="relative z-10 flex items-center justify-between">
                                            <span className="font-bold tracking-wide">{dept}</span>
                                            {department === dept && (
                                                <motion.div layoutId="active" className="w-2 h-2 rounded-full bg-green-primary" />
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-12 pt-8 border-t border-green-light/50 flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="outline"
                                className="h-14 flex-1 border-green-light/50 bg-transparent hover:bg-green-light/20 text-green-muted rounded-xl"
                                onClick={() => navigate('/techprep')}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Button>
                            <Button
                                className={`h-14 flex-[2] font-black rounded-xl shadow-lg transition-all hover:scale-[1.02] ${department
                                        ? 'bg-[#0F2C1F] hover:bg-[#1a402d] text-white shadow-green-900/20'
                                        : 'bg-green-light/30 text-green-muted cursor-not-allowed border border-green-light/50'
                                    }`}
                                disabled={!department}
                                onClick={handleStart}
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                START PREPARATION
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}

export default TechPrepDepartmentSelection;
