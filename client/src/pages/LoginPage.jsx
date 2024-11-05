import { useNavigate } from "react-router-dom";
import style from "./loginPage.module.css";
import { useState } from "react";

function LoginPage() {
  // states for storing username and password
  // static credentials
  //invalid credentials handled

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, SetError] = useState("");

  // function to handle login credentials for admin
  function handleCredentials(e) {
    e.preventDefault();

    // if (username == "admin" && password == "password") {
    //   navigate("/getAllData");
    // }

    username == "admin" && password == "password"
      ? navigate("/getAllData")
      : SetError("Invalid credentials");
  }

  const navigate = useNavigate();
  return (
    <div className={style.loginPage}>
      <nav>
        <div> Government College of Engineering Srirangam,Trichy 620012</div>
        <button>Home</button>
      </nav>
      <div className={style.login}>
        <div className={style.continer}>
          <div className={style.innerContiner}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* error message */}
          <br />
          <div className={style.errDiv}>{error}</div>
          <button onClick={handleCredentials}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
