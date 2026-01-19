import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Briefcase, Code, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import './CompanySelection.css';

const DOMAINS = {
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

function CompanySelection() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState('');
  const [domain, setDomain] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');

  const handleStartInterview = () => {
    if (department && domain) {
      // Updated route to match InterviewPage expectation, passing state
      // Using a generic 'session' ID or keeping it consistent
      navigate(`/technical-interview/session`, {
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
        className="w-full max-w-3xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0F2C1F] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Code className="w-8 h-8 text-[#CCDBD0]" />
          </div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Technical Interview Setup</h1>
          <p className="text-[#0F2C1F]/70 text-lg">Select your technical domain to start the challenge.</p>
        </div>

        <Card className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8">
          <div className="space-y-6">

            {/* Department Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold uppercase tracking-wider opacity-70 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Select Department
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
                {Object.keys(DOMAINS).map((dept) => (
                  <button
                    key={dept}
                    onClick={() => { setDepartment(dept); setDomain(''); }}
                    className={`p-3 rounded-xl border transition-all text-sm font-bold ${department === dept
                      ? 'bg-[#0F2C1F] text-white border-[#0F2C1F] shadow-md'
                      : 'bg-white/50 border-green-light/30 text-green-muted hover:bg-white hover:text-green-primary hover:shadow-md'
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
                  <Code className="w-4 h-4" /> Select Specialization
                </label>
                <Select value={domain} onValueChange={setDomain}>
                  <SelectTrigger className="bg-white/50 border-transparent h-12 rounded-xl text-base">
                    <SelectValue placeholder="Select your domain" />
                  </SelectTrigger>
                  <SelectContent side="bottom" align="start" className="max-h-[300px]">
                    {DOMAINS[department].map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Difficulty Selection */}
            {domain && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3"
              >
                <label className="text-sm font-semibold uppercase tracking-wider opacity-70">Difficulty Level</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="bg-white/50 border-transparent h-12 rounded-xl text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Action Button */}
            <div className="pt-6">
              <Button
                className={`w-full h-16 text-xl font-black rounded-2xl transition-all hover:scale-[1.02] shadow-xl ${department && domain
                    ? 'bg-[#0F2C1F] hover:bg-[#1a402d] text-white shadow-green-900/20'
                    : 'bg-green-light/30 text-green-muted cursor-not-allowed border border-green-light/50 opacity-50 shadow-none'
                  }`}
                disabled={!department || !domain}
                onClick={handleStartInterview}
              >
                <Sparkles className="w-6 h-6 mr-3" />
                START TECHNICAL INTERVIEW
                <ChevronRight className="w-6 h-6 ml-3" />
              </Button>
            </div>

          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default CompanySelection;

