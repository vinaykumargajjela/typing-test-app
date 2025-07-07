import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './styles.css';

const texts = [
  "The quick brown fox jumps over the lazy dog",
  "Typing tests are fun and help improve speed",
  "React is a powerful JavaScript library",
  "Coding every day keeps the bugs away",
  "Stay focused and keep learning new skills",
  "Practice makes perfect in everything you do",
  "Challenge yourself to type without errors",
  "Accurate typing is more important than fast typing",
  "Never stop improving your skills",
  "Success comes from consistent effort",
  "Hard work beats talent when talent fails to work hard",
  "Discipline is the bridge between goals and achievement",
  "Typing games can be fun and educational",
  "Your potential is endless with enough practice",
  "Small steps every day lead to big results",
  "Clear your mind before you start typing",
  "The keyboard is your best friend now",
  "Measure your progress and celebrate small wins",
  "Always double-check before submitting",
  "A clean and simple UI is the best experience",
  "React apps are easy to manage and scale",
  "Timer helps track your performance under pressure",
  "Focus on accuracy more than speed",
  "Every key press counts toward your success",
  "Keep your fingers on the home row keys",
  "Look at the screen, not the keyboard",
  "Typing is a life skill worth mastering",
  "Push yourself to do better each time",
  "The best way to improve is to keep going",
  "Errors are part of the learning process",
  "A calm mind helps type faster",
  "Use your thumbs for the space bar",
  "Let your muscle memory take over",
  "Typing faster helps you save time",
  "Be consistent with your practice",
  "Speed without accuracy is pointless",
  "Focus improves typing effectiveness",
  "The sooner you start, the better you get",
  "Read before you type to avoid mistakes",
  "Learn to type without looking at the keyboard",
  "Every expert was once a beginner",
  "Develop your own rhythm while typing",
  "Take breaks to avoid fatigue",
  "Track your WPM and try to beat it",
  "Typing is easier when you are relaxed",
  "Start slow and increase speed gradually",
  "Stay positive and keep practicing",
  "Every session makes you stronger",
  "Typing speed is a valuable skill",
  "Believe in your ability to improve"
];

const getRandomText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};

function App() {
  const [targetText, setTargetText] = useState(getRandomText());
  const [userText, setUserText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleInputChange = (e) => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(Date.now());
    }
    setUserText(e.target.value);
  };

  const handleRefresh = () => {
    setTargetText(getRandomText());
    setUserText('');
    setTimer(60);
    setIsRunning(false);
    setStartTime(null);
  };

  const handleSubmit = () => {
    setIsRunning(false);
    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    const correct = userText.trim() === targetText.trim();
    const words = userText.trim().split(/\s+/).length;
    const wpm = Math.round(words / (timeTaken / 60));

    if (correct) {
      Swal.fire({
        title: 'Success!',
        text: `You typed correctly in ${timeTaken}s. WPM: ${wpm}`,
        icon: 'success',
        confirmButtonText: 'Nice!'
      });
    } else {
      Swal.fire({
        title: 'Oops!',
        text: 'Typed text does not match. Try again.',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  };

  return (
    <div className="container">
      <h1>🧠 Typing Test App</h1>
      <p className="target-text">{targetText}</p>
      <textarea
        placeholder="Start typing here..."
        value={userText}
        onChange={handleInputChange}
        disabled={timer === 0}
      />
      <div className="controls">
        <button onClick={handleRefresh}>🔄 Refresh</button>
        <button onClick={handleSubmit} disabled={!userText}>✅ Submit</button>
      </div>
      <div className="timer">⏱️ Time Left: {timer}s</div>
    </div>
  );
}

export default App;
