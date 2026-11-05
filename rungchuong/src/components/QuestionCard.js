import AnswerButton from './AnswerButton';
import { LETTERS, LEVELS } from '../data';

const QuestionCard = ({
  question,
  questionNumber,
  selectedAnswer,
  status,
  onAnswer
}) => {
  return (
    <div className="question-card">
      <h3>
        Câu {questionNumber}/15 · {question.topic} · {LEVELS[question.level]}
      </h3>

      <p className="question-content">{question.question}</p>

      <div className="answer-grid">
        {question.options.map((option, index) => {
          const letter = LETTERS[index];
          const isCorrect = question.answer === index;

          return (
            <AnswerButton
              key={letter}
              letter={letter}
              option={option}
              selected={selectedAnswer === index}
              correct={isCorrect}
              disabled={status !== 'answering'}
              revealed={status === 'revealed'}
              onClick={() => onAnswer(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;