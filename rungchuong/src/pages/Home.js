
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  const record = history.length
    ? [...history].sort((a, b) => b.score - a.score)[0]
    : null;

  return (
    <section className="home">
      <h1>RUNG CHUÔNG VÀNG</h1>
      <p>Thử thách kiến thức lập trình Web của bạn!</p>

      {record && (
        <p className="home-record">
          Kỷ lục: {record.score} điểm – {record.name}
        </p>
      )}

      <input
        type="text"
        placeholder="Nhập tên người chơi..."
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <button
        onClick={handleStart}
        disabled={!playerName.trim()}
      >
        Vào thi
      </button>
    </section>
  );
};

export default Home;
