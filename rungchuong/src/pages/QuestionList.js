
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function QuestionList({ questions }) {
  const [term, setTerm] = useState('');
  const [topic, setTopic] = useState('Tất cả');
  const [searchParams, setSearchParams] = useSearchParams();

  const topics = ['Tất cả', ...new Set(questions.map((q) => q.topic))];

  const handleTermShift = (event) => {
    setTerm(event.target.value);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchTerm = q.question.toLowerCase().includes(term.toLowerCase());
    const matchTopic = topic === 'Tất cả' || q.topic === topic;

    return matchTerm && matchTopic;
  });

  return (
    <section>
      <h1>Ngân hàng câu hỏi</h1>
      <p>Có {filteredQuestions.length} câu hỏi</p>

      <input
        type="text"
        placeholder="Tìm kiếm câu hỏi..."
        value={term}
        onChange={handleTermShift}
      />

      <select value={topic} onChange={(e) => setTopic(e.target.value)}>
        {topics.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>

        <tbody>
          {filteredQuestions.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.topic}</td>
              <td>{q.level}</td>
              <td>{q.question}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default QuestionList;
