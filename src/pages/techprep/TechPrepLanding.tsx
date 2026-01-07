import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Database, Cpu, Globe, Code2, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

const TechPrepLanding = () => {
    const navigate = useNavigate();

    const sections = [
        { name: 'DBMS', icon: Database, color: 'bg-blue-100 text-blue-600' },
        { name: 'Operating Systems', icon: Cpu, color: 'bg-purple-100 text-purple-600' },
        { name: 'Networking', icon: Globe, color: 'bg-cyan-100 text-cyan-600' },
        { name: 'DSA', icon: Code2, color: 'bg-emerald-100 text-emerald-600' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800">Mockello</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">30 Minutes • 28 Questions</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                        General Technical
                        <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Assessment Round</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
                        Test your knowledge in core computer science fundamentals.
                        This assessment covers essential topics every software engineer should master.
                    </p>

                    {/* Section Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {sections.map((section) => (
                            <div
                                key={section.name}
                                className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center mx-auto mb-3`}>
                                    <section.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">{section.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Info Cards */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200">
                            <Clock className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-500">Auto-submit when time expires</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200">
                            <AlertTriangle className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-500">No going back to previous questions</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                        size="lg"
                        onClick={() => navigate('/techprep/instructions')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-200"
                    >
                        Start Assessment
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-6 mt-auto">
                <div className="container mx-auto px-4 text-center text-sm text-slate-400">
                    Prepare well. Stay focused. Good luck! 🍀
                </div>
            </footer>
        </div>
    );
};

export default TechPrepLanding;
