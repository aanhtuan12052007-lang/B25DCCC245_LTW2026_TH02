
import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Helpers from '../components/Helpers';
import { TIME_PER_QUESTION, EXTRA_TIME } from '../data';
import { calcScore, getRank } from '../utils';

const Play = ({ questions, playerName, onSaveHistory }) => {
  const navigate = useNavigate();
  const finishedRef = useRef(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState('answering');

  const [usedHelpers, setUsedHelpers] = useState({
    removeOption: false,
    addTime: false,
    lifebuoy: false
  });

  const [hiddenOption, setHiddenOption] = useState(null);
  const [lifebuoyActive, setLifebuoyActive] = useState(false);

  const question = questions[currentQuestion];

  const finishGame = useCallback((reason, finalAnswers) => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const score = calcScore(finalAnswers);
    const correctCount = finalAnswers.filter((item) => item.correct).length;
    const rank = getRank(score);

    const result = {
      id: Date.now(),
      name: playerName,
      score,
      rank,
      correctCount,
      playedAt: new Date().toLocaleString('vi-VN')
    };

    onSaveHistory(result);

    navigate('/result', {
      replace: true,
      state: {
        ...result,
        reason
      }
    });
  }, [navigate, playerName, onSaveHistory]);

  const updateUsedHelper = (helper) => {
    setUsedHelpers((prev) => ({
      ...prev,
      [helper]: true
    }));
  };

  const handleRemoveOption = () => {
    if (status !== 'answering' || usedHelpers.removeOption) return;

    const wrongOptions = question.options
      .map((_, index) => index)
      .filter((index) => index !== question.answer);

    const randomIndex = Math.floor(Math.random() * wrongOptions.length);

    setHiddenOption(wrongOptions[randomIndex]);
    updateUsedHelper('removeOption');
  };

  const handleAddTime = () => {
    if (status !== 'answering' || usedHelpers.addTime) return;

    setTimeLeft((prev) => prev + EXTRA_TIME);
    updateUsedHelper('addTime');
  };

  const handleLifebuoy = () => {
    if (status !== 'answering' || usedHelpers.lifebuoy) return;

    setLifebuoyActive(true);
    updateUsedHelper('lifebuoy');
  };

  const handleAnswer = useCallback((index) => {
    if (status !== 'answering' || index === hiddenOption) return;

    setSelectedAnswer(index);
    setStatus('locked');

    setAnswers((prev) => [
      ...prev,
      {
        id: question.id,
        level: question.level,
        correct: index === question.answer,
        lifebuoy: lifebuoyActive
      }
    ]);
  }, [status, hiddenOption, question, lifebuoyActive]);

  useEffect(() => {
    document.title = `Câu ${currentQuestion + 1}/15 – ${calcScore(answers)} điểm`;
  }, [currentQuestion, answers]);

  useEffect(() => {
    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, []);

  useEffect(() => {
    if (status !== 'answering') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== 'answering' || timeLeft > 0) return;

    setAnswers((prev) => [
      ...prev,
      {
        id: question.id,
        level: question.level,
        correct: false,
        lifebuoy: lifebuoyActive
      }
    ]);

    setStatus('revealed');
  }, [status, timeLeft, question, lifebuoyActive]);

  useEffect(() => {
    const handleKey = (event) => {
      if (status !== 'answering') return;

      const index = Number(event.key) - 1;

      if (index < 0 || index > 3 || index === hiddenOption) return;

      handleAnswer(index);
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [status, hiddenOption, handleAnswer]);

  useEffect(() => {
    if (status === 'locked') {
      const timeout = setTimeout(() => {
        setStatus('revealed');
      }, 2000);

      return () => clearTimeout(timeout);
    }

    if (status === 'revealed') {
      const timeout = setTimeout(() => {
        const currentAnswer = answers[answers.length - 1];
        const usedLifebuoy = currentAnswer?.lifebuoy;

        if (selectedAnswer === null && !usedLifebuoy) {
          finishGame('timeout', answers);
        } else if (
          selectedAnswer !== null &&
          selectedAnswer !== question.answer &&
          !usedLifebuoy
        ) {
          finishGame('wrong', answers);
        } else if (currentQuestion === questions.length - 1) {
          finishGame('complete', answers);
        } else {
          setCurrentQuestion((prev) => prev + 1);
          setTimeLeft(TIME_PER_QUESTION);
          setSelectedAnswer(null);
          setHiddenOption(null);
          setLifebuoyActive(false);
          setStatus('answering');
        }
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [
    status,
    selectedAnswer,
    question,
    currentQuestion,
    questions.length,
    answers,
    finishGame
  ]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!question) {
    return <h2>Đang tải câu hỏi...</h2>;
  }

  return (
    <section className="play">
      <h1>RUNG CHUÔNG VÀNG</h1>

      <Timer timeLeft={timeLeft} />

      <Helpers
        usedHelpers={usedHelpers}
        onRemoveOption={handleRemoveOption}
        onAddTime={handleAddTime}
        onLifebuoy={handleLifebuoy}
      />

      {lifebuoyActive && (
        <p className="lifebuoy-message">
          Phao cứu sinh đang bật!
        </p>
      )}

      <ScoreBoard
        currentQuestion={currentQuestion + 1}
        answers={answers}
      />

      <QuestionCard
        question={question}
        questionNumber={currentQuestion + 1}
        selectedAnswer={selectedAnswer}
        status={status}
        hiddenOption={hiddenOption}
        onAnswer={handleAnswer}
      />
    </section>
  );
};

export default Play;
