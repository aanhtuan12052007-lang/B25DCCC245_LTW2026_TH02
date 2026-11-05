import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import {
  TIME_PER_QUESTION,
  EXTRA_TIME,
  LETTERS
} from '../data';
import { calcScore, getRank } from '../utils';

const Play = ({ questions, playerName }) => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState('answering');

  const question = questions[currentQuestion];

  const finishGame = (reason, finalAnswers) => {
    const score = calcScore(finalAnswers);

    navigate('/result', {
      replace: true,
      state: {
        name: playerName,
        score,
        rank: getRank(score),
        correctCount: finalAnswers.filter((item) => item.correct).length,
        reason
      }
    });
  };

  const handleAnswer = (index) => {
    if (status !== 'answering') return;

    setSelectedAnswer(index);
    setStatus('locked');

    setAnswers((prev) => [
      ...prev,
      {
        id: question.id,
        level: question.level,
        correct: index === question.answer
      }
    ]);
  };

  useEffect(() => {
    if (status !== 'answering') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus('revealed');
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === 'locked') {
      const timeout = setTimeout(() => {
        setStatus('revealed');
      }, 2000);

      return () => clearTimeout(timeout);
    }

    if (status === 'revealed') {
      const timeout = setTimeout(() => {
        if (selectedAnswer === null) {
          finishGame('timeout', answers);
        } else if (selectedAnswer !== question.answer) {
          finishGame('wrong', answers);
        } else if (currentQuestion === questions.length - 1) {
          finishGame('win', answers);
        } else {
          setCurrentQuestion((prev) => prev + 1);
          setTimeLeft(TIME_PER_QUESTION);
          setSelectedAnswer(null);
          setStatus('answering');
        }
      }, EXTRA_TIME * 100);

      return () => clearTimeout(timeout);
    }
  }, [
    status,
    selectedAnswer,
    question,
    currentQuestion,
    questions.length,
    answers
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

      <ScoreBoard
        currentQuestion={currentQuestion + 1}
        answers={answers}
      />

      <QuestionCard
        question={question}
        questionNumber={currentQuestion + 1}
        selectedAnswer={selectedAnswer}
        status={status}
        onAnswer={handleAnswer}
      />
    </section>
  );
};

export default Play;