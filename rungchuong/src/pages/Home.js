
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!playerName.trim()) {
      alert('Vui lòng nhập tên người chơi!');
      return;
    }

    navigate('/play', {
      state: { playerName: playerName.trim() }
    });
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

      <button onClick={handleStart}>
        Bắt đầu
      </button>
    </section>
  );
}

export default Home;
