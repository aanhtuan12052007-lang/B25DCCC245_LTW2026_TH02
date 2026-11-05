import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  return (
    <section className="home">
      <h1>RUNG CHUÔNG VÀNG</h1>
      <p>Thử thách kiến thức lập trình Web của bạn!</p>

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