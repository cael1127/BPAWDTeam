import { useState } from 'react';

export const useMoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const recordMood = (mood) => {
    const newMood = {
      mood: mood.value,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
    setMoodHistory(prev => [...prev.slice(-6), newMood]);
    setCurrentMood(mood);
  };

  return {
    currentMood,
    moodHistory,
    recordMood
  };
};
