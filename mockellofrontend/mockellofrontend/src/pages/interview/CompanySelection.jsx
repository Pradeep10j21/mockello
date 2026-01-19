import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanySelection.css';

const companies = [
  {
    id: 'google',
    name: 'Google',
    role: 'Software Engineer',
    difficulty: 'Hard',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    color: '#4285F4',
    description: 'Join the team building products used by billions'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    role: 'Full Stack Developer',
    difficulty: 'Medium',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    color: '#00A4EF',
    description: 'Empower every person and organization on the planet'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    role: 'Frontend Engineer',
    difficulty: 'Medium',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    color: '#FF9900',
    description: 'Build the future of e-commerce and cloud computing'
  },
  {
    id: 'meta',
    name: 'Meta',
    role: 'React Developer',
    difficulty: 'Hard',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    color: '#0081FB',
    description: 'Connect the world through innovative social platforms'
  },
  {
    id: 'apple',
    name: 'Apple',
    role: 'iOS Developer',
    difficulty: 'Hard',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    color: '#000000',
    description: 'Design products that change how people work and live'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    role: 'Backend Engineer',
    difficulty: 'Medium',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    color: '#E50914',
    description: 'Entertain the world with streaming technology'
  }
];

function CompanySelection() {
  const navigate = useNavigate();

  const handleStartInterview = (companyId) => {
    navigate(`/interview/${companyId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Hard':
        return '#d32f2f';
      case 'Medium':
        return '#f57c00';
      case 'Easy':
        return '#388e3c';
      default:
        return 'var(--green-muted)';
    }
  };

  return (
    <div className="company-selection">
      <div className="selection-background">
        <div className="bg-gradient"></div>
      </div>
      
      <div className="company-selection-content">
        <div className="company-selection-header">
          <div className="header-badge">AI-Powered Interview Platform</div>
          <h1>Choose Your Interview</h1>
          <p>Practice with real-world questions from top tech companies</p>
        </div>
        
        <div className="company-grid">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="company-card"
              style={{ '--company-color': company.color }}
            >
              <div className="company-card-header">
                <div className="company-logo-container">
                  <img 
                    src={company.logoUrl} 
                    alt={`${company.name} logo`}
                    className="company-logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="company-logo-fallback" style={{ display: 'none' }}>
                    {company.name.charAt(0)}
                  </div>
                </div>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(company.difficulty) }}
                >
                  {company.difficulty}
                </span>
              </div>
              
              <div className="company-card-body">
                <h2 className="company-name">{company.name}</h2>
                <p className="company-role">{company.role}</p>
                <p className="company-description">{company.description}</p>
              </div>
              
              <button
                className="start-interview-btn"
                onClick={() => handleStartInterview(company.id)}
              >
                <span>Start Interview</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="selection-footer">
          <p>💡 Tip: Start with Medium difficulty to build confidence</p>
        </div>
      </div>
    </div>
  );
}

export default CompanySelection;

