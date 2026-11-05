
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section>
      <h1>404 - Không tìm thấy trang</h1>
      <p>Trang bạn đang tìm kiếm không tồn tại.</p>

      <button onClick={() => navigate('/')}>
        Về trang chủ
      </button>
    </section>
  );
}

export default NotFound;
