import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MessageCircle, Shield, Heart } from 'lucide-react';

const CrisisDetector = ({ moodHistory, currentMood }) => {
  const [riskLevel, setRiskLevel] = useState('low');
  const [crisisFactors, setCrisisFactors] = useState([]);
  const [interventionTriggered, setInterventionTriggered] = useState(false);

  // Advanced crisis detection algorithm
  const analyzeCrisisRisk = (moodData) => {
    let riskScore = 0;
    const factors = [];

    // Recent mood decline pattern
    const recentMoods = moodData.slice(-7);
    const decliningPattern = recentMoods.some((mood, index) => {
      if (index > 0) {
        const currentScore = getMoodScore(mood.mood);
        const previousScore = getMoodScore(recentMoods[index - 1].mood);
        return currentScore < previousScore - 1;
      }
      return false;
    });

    if (decliningPattern) {
      riskScore += 30;
      factors.push('Recent mood decline detected');
    }

    // Consecutive low moods
    const consecutiveLow = recentMoods.filter(mood => 
      ['sad', 'struggling'].includes(mood.mood)
    ).length;

    if (consecutiveLow >= 3) {
      riskScore += 40;
      factors.push(`${consecutiveLow} consecutive low mood days`);
    }

    // Crisis keywords in notes
    const crisisKeywords = ['suicide', 'end it', 'not worth', 'hopeless', 'give up'];
    const hasCrisisKeywords = recentMoods.some(mood => 
      mood.notes && crisisKeywords.some(keyword => 
        mood.notes.toLowerCase().includes(keyword)
      )
    );

    if (hasCrisisKeywords) {
      riskScore += 50;
      factors.push('Crisis language detected in notes');
    }

    // Time patterns (late night entries often indicate crisis)
    const lateNightEntries = recentMoods.filter(mood => {
      const hour = new Date(`2000-01-01 ${mood.time}`).getHours();
      return hour >= 22 || hour <= 4;
    }).length;

    if (lateNightEntries >= 2) {
      riskScore += 20;
      factors.push('Multiple late-night entries detected');
    }

    // Determine risk level
    let level = 'low';
    if (riskScore >= 70) level = 'critical';
    else if (riskScore >= 50) level = 'high';
    else if (riskScore >= 30) level = 'medium';

    return { level, score: riskScore, factors };
  };

  const getMoodScore = (mood) => {
    const scores = {
      'great': 5,
      'good': 4,
      'okay': 3,
      'sad': 2,
      'struggling': 1
    };
    return scores[mood] || 3;
  };

  useEffect(() => {
    if (moodHistory && moodHistory.length > 0) {
      const analysis = analyzeCrisisRisk(moodHistory);
      setRiskLevel(analysis.level);
      setCrisisFactors(analysis.factors);

      // Trigger intervention for critical risk
      if (analysis.level === 'critical' && !interventionTriggered) {
        setInterventionTriggered(true);
        triggerCrisisIntervention();
      }
    }
  }, [moodHistory, interventionTriggered]);

  const triggerCrisisIntervention = () => {
    // In a real application, this would:
    // 1. Send alerts to crisis counselors
    // 2. Notify emergency contacts
    // 3. Provide immediate resources
    // 4. Schedule urgent follow-up
    
    console.log('🚨 CRISIS INTERVENTION TRIGGERED 🚨');
    
    // Show immediate crisis support
    setTimeout(() => {
      alert('Crisis intervention activated. Please contact a mental health professional immediately.');
    }, 1000);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="h-6 w-6" />;
      case 'high': return <Shield className="h-6 w-6" />;
      case 'medium': return <Heart className="h-6 w-6" />;
      default: return <Heart className="h-6 w-6" />;
    }
  };

  const getRiskMessage = (level) => {
    switch (level) {
      case 'critical':
        return 'Immediate support recommended. Please reach out for help right away.';
      case 'high':
        return 'Consider speaking with a mental health professional soon.';
      case 'medium':
        return 'Your mood patterns suggest you might benefit from additional support.';
      default:
        return 'Your mood patterns look healthy. Keep up the good work!';
    }
  };

  if (riskLevel === 'critical') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Crisis Support Available
            </h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We've detected patterns that suggest you might benefit from immediate support. 
            You're not alone, and help is available 24/7.
          </p>

          <div className="space-y-3 mb-6">
            <a
              href="tel:988"
              className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call 988 (Suicide & Crisis Lifeline)
            </a>
            
            <a
              href="sms:741741&body=HOME"
              className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Text HOME to 741741
            </a>
          </div>

          <button
            onClick={() => setInterventionTriggered(false)}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            I'm Safe - Close Alert
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border-l-4 ${getRiskColor(riskLevel)}`}>
      <div className="flex items-center mb-2">
        {getRiskIcon(riskLevel)}
        <h3 className="ml-2 font-semibold capitalize">
          Mood Analysis: {riskLevel} Risk
        </h3>
      </div>
      
      <p className="text-sm mb-3">
        {getRiskMessage(riskLevel)}
      </p>

      {crisisFactors.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-medium mb-1">Analysis Factors:</h4>
          <ul className="text-xs space-y-1">
            {crisisFactors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {riskLevel !== 'low' && (
        <div className="flex space-x-2">
          <button className="text-xs bg-white dark:bg-gray-700 px-2 py-1 rounded border">
            View Resources
          </button>
          <button className="text-xs bg-white dark:bg-gray-700 px-2 py-1 rounded border">
            Schedule Support
          </button>
        </div>
      )}
    </div>
  );
};

export default CrisisDetector;

