import { calcScore } from '../utils';

const ScoreBoard = ({ currentQuestion, answers }) => (
  <div className="score-board">
    <h3>Điểm: {calcScore(answers)}</h3>

    <div className="score-list">
      {Array.from({ length: 15 }, (_, index) => {
        const questionNumber = index + 1;
        const answer = answers.find((item) => item.id === questionNumber);
        const isCurrent = questionNumber === currentQuestion;

        let className = 'score-item';

        if (answer?.correct) className += ' completed';
        if (answer?.lifebuoy) className += ' lifebuoy-used';
        if (isCurrent) className += ' current';

        return (
          <div key={questionNumber} className={className}>
            {questionNumber}
          </div>
        );
      })}
    </div>
  </div>
);

export default ScoreBoard;