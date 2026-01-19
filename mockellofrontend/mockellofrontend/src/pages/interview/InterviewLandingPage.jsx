import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, FileText, MessageSquare, BarChart3, ArrowRight } from 'lucide-react';
import './CompanySelection.css';

function InterviewLandingPage() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/interview/select');
  };

  const processSteps = [
    {
      icon: Mic,
      number: '1',
      title: 'Voice & Video Setup',
      description: 'Enable your microphone and camera. The system will verify your setup before starting.'
    },
    {
      icon: FileText,
      number: '2',
      title: 'Questions & Answers',
      description: 'Questions are presented both as text and voice. Answer naturally - your speech is transcribed in real-time.'
    },
    {
      icon: MessageSquare,
      number: '3',
      title: 'Live Transcription',
      description: 'Watch your answers appear in real-time. The system automatically advances when you finish speaking.'
    },
    {
      icon: BarChart3,
      number: '4',
      title: 'AI Analysis',
      description: 'Get detailed feedback on communication, confidence, and technical clarity with actionable insights.'
    }
  ];

  return (
    <div className="company-selection">
      <div className="selection-background">
        <div className="bg-gradient"></div>
      </div>
      
      <div className="company-selection-content">
        <div className="company-selection-header">
          <div className="header-badge">AI-Powered Interview Platform</div>
          <h1>Mock Interview Practice</h1>
          <p>Prepare for your dream job with AI-powered interview simulations</p>
        </div>

        {/* Interview Process Explanation */}
        <div className="interview-process-section" style={{ 
          background: 'linear-gradient(135deg, #F2F6F0 0%, #E9F2EB 100%)',
          borderRadius: '20px',
          padding: '50px 40px',
          marginBottom: '50px',
          border: '2px solid var(--green-light)',
          boxShadow: '0 8px 24px rgba(15, 44, 31, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'var(--green-primary)', 
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            How the Interview Process Works
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '1.1rem',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Experience a realistic interview simulation with AI-powered analysis and real-time feedback
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px',
            marginTop: '30px'
          }}>
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} style={{ 
                  background: 'white', 
                  padding: '30px', 
                  borderRadius: '15px',
                  boxShadow: '0 4px 12px rgba(15, 44, 31, 0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--green-primary) 0%, var(--green-dark) 100%)',
                    margin: '0 auto 20px',
                    color: 'white'
                  }}>
                    <IconComponent size={28} />
                  </div>
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--green-primary)',
                    letterSpacing: '1px'
                  }}>
                    STEP {step.number}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '600', 
                    marginBottom: '12px',
                    color: 'var(--green-primary)',
                    textAlign: 'center'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    lineHeight: '1.7',
                    textAlign: 'center',
                    fontSize: '0.95rem'
                  }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Test Button */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <button
            onClick={handleStartTest}
            style={{
              background: 'linear-gradient(135deg, var(--green-primary) 0%, var(--green-dark) 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '18px 48px',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(15, 44, 31, 0.3)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 44, 31, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 44, 31, 0.3)';
            }}
          >
            Start Test
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Additional Info */}
        <div style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '0.95rem',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          <p>💡 <strong>Tip:</strong> Make sure your microphone and camera are working before starting. Use Chrome or Edge for the best experience.</p>
        </div>
      </div>
    </div>
  );
}

export default InterviewLandingPage;

