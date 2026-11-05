
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">RUNG CHUÔNG VÀNG</div>

      <div className="nav-links">
        <NavLink to="/" end>
          Trang chủ
        </NavLink>

        <NavLink to="/questions">
          Ngân hàng câu hỏi
        </NavLink>

        <NavLink to="/history">
          Lịch sử
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
