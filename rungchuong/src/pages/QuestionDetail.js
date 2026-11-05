
import { useParams, useNavigate } from 'react-router-dom';
import { POINTS, LEVELS } from '../data';

function QuestionDetail({ questions }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <section>
        <h1>Không tìm thấy câu hỏi</h1>
        <button onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1>
        Câu hỏi số {question.id} – {question.topic}
      </h1>

      <p>
        {LEVELS[question.level]}, {POINTS[question.level]} điểm
      </p>

      <h3>{question.question}</h3>

      {question.options.map((option, index) => (
        <p key={index}>
          {String.fromCharCode(65 + index)}. {option}
          {index === question.answer && (
            <strong> (Đáp án đúng)</strong>
          )}
        </p>
      ))}

      <button onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </section>
  );
}

export default QuestionDetail;
