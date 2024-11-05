import { useNavigate } from "react-router-dom";
import style from "./Main.module.css";

function Header() {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
      <img src="/download.jpg" alt="" />
      <div>
        <h1 className={style.collegeName}>
          Government College of Engineering Srirangam,Trichy 620012
        </h1>
        <h4 className={style.title}>Student Verification System</h4>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default Header;
