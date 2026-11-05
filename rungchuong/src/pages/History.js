
import { Link } from 'react-router-dom';

const History = ({ history, onClearHistory }) => {
  const sortedHistory = [...history].sort((a, b) => b.score - a.score);

  const bestScore = history.length
    ? Math.max(...history.map((item) => item.score))
    : 0;

  const averageScore = history.length
    ? Math.round(
        history.reduce((total, item) => total + item.score, 0) / history.length
      )
    : 0;

  return (
    <section className="history">
      <h1>Lịch sử chơi</h1>

      {history.length === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <>
          <div className="history-stats">
            <div>
              <h3>Số lượt chơi</h3>
              <p>{history.length}</p>
            </div>

            <div>
              <h3>Điểm cao nhất</h3>
              <p>{bestScore}</p>
            </div>

            <div>
              <h3>Điểm trung bình</h3>
              <p>{averageScore}</p>
            </div>
          </div>

          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Người chơi</th>
                  <th>Số câu đúng</th>
                  <th>Điểm</th>
                  <th>Danh hiệu</th>
                  <th>Thời gian</th>
                </tr>
              </thead>

              <tbody>
                {sortedHistory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.correctCount}/15</td>
                    <td>{item.score}</td>
                    <td>{item.rank}</td>
                    <td>{item.playedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="clear-history" onClick={onClearHistory}>
            Xóa lịch sử
          </button>
        </>
      )}

      <p>
        <Link to="/">Quay về trang chủ</Link>
      </p>
    </section>
  );
};

export default History;
