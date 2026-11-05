import { Navigate, Link, useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return <Navigate to="/" replace />;
  }

  let title = 'Bạn đã hoàn thành phần thi!';

  if (result.reason === 'win') {
    title = 'RUNG CHUÔNG VÀNG!';
  } else if (result.reason === 'wrong') {
    title = 'Rất tiếc! Bạn đã trả lời sai.';
  } else if (result.reason === 'timeout') {
    title = 'Hết thời gian!';
  }

  return (
    <section className="result">
      <h1>{title}</h1>

      <h2>Kết quả của {result.name}</h2>

      <p>Số câu trả lời đúng: {result.correctCount}/15</p>
      <p>Tổng điểm: {result.score}</p>
      <p>Xếp hạng: {result.rank}</p>

      <div className="result-actions">
        <Link to="/play">Chơi lại</Link>
        <Link to="/">Về trang chủ</Link>
      </div>
    </section>
  );
};

export default Result;