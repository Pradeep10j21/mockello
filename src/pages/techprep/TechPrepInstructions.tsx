import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    ArrowLeft,
    Clock,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Monitor,
    Wifi,
    Database,
    Cpu,
    Globe,
    Code2
} from 'lucide-react';

const TechPrepInstructions = () => {
    const navigate = useNavigate();

    const rules = [
        { icon: Clock, text: 'Total time: 30 minutes for 28 questions', type: 'info' },
        { icon: AlertCircle, text: 'You cannot go back to previous questions', type: 'warning' },
        { icon: CheckCircle2, text: 'Each question has only one correct answer', type: 'info' },
        { icon: XCircle, text: 'Test will auto-submit when time expires', type: 'warning' },
        { icon: Monitor, text: 'Keep your browser window in focus', type: 'info' },
        { icon: Wifi, text: 'Ensure stable internet connection', type: 'info' },
    ];

    const sections = [
        { name: 'DBMS', icon: Database, questions: 7, color: 'bg-blue-100 text-blue-600' },
        { name: 'Operating Systems', icon: Cpu, questions: 7, color: 'bg-purple-100 text-purple-600' },
        { name: 'Networking', icon: Globe, questions: 7, color: 'bg-cyan-100 text-cyan-600' },
        { name: 'DSA', icon: Code2, questions: 7, color: 'bg-emerald-100 text-emerald-600' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-800">TechPrep</span>
                        </div>
                        <Button variant="ghost" onClick={() => navigate('/techprep')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 text-center">
                        Instructions
                    </h1>
                    <p className="text-slate-500 text-center mb-10">
                        Please read carefully before starting the test
                    </p>

                    {/* Sections Overview */}
                    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4">Test Structure</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {sections.map((section) => (
                                <div key={section.name} className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <section.icon className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${section.color} mb-2`}>{section.name}</span>
                                    <p className="text-sm text-slate-500 mt-2">{section.questions} questions</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rules */}
                    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4">Guidelines</h2>
                        <div className="space-y-4">
                            {rules.map((rule, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start gap-4 p-4 rounded-xl ${rule.type === 'warning' ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50 border border-slate-100'
                                        }`}
                                >
                                    <rule.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${rule.type === 'warning' ? 'text-amber-500' : 'text-emerald-600'
                                        }`} />
                                    <span className="text-slate-700">{rule.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-10">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Important</h3>
                                <p className="text-slate-500 text-sm">
                                    Once you click "Begin Test", the timer will start immediately.
                                    Make sure you're ready and have allocated sufficient time to complete the assessment.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="outline" size="lg" onClick={() => navigate('/techprep')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => navigate('/techprep/test')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        >
                            Begin Test
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TechPrepInstructions;
