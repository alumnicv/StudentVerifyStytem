import { useNavigate } from "react-router-dom";
import style from "./success.module.css";
function Sucess() {
  const navigate = useNavigate();
  return (
    <div className={style.successContainer}>
      <h1>Email Send Successfully!</h1>
      <img src="./check.png" alt="successImage" />
      <p className={style.msg}>
        After verification, you will be intimated via email.
      </p>
      <button
        className={style.homeBtn}
        onClick={() => {
          navigate("/");
        }}
      >
        Home page
      </button>
      ;
    </div>
  );
}

export default Sucess;

// later
