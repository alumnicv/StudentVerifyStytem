import { useState } from "react";
import Input from "../components/Input";
import style from "./StudentData.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeEmail } from "../components/applientSlice";

function VerifierData() {
  const [verName, setVerName] = useState("");
  const [verEmail, setVerEmail] = useState("");
  const [verNo, setVerNo] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((sta) => sta.studentId.value);
  console.log(users);

  const updateVer = function (el) {
    axios
      .put(`http://localhost:3000/api/v1/student/${users._id}`, {
        applicantID: el,
      })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      });
  };

  // applicantID

  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/v1/applicant", {
        name: verName,
        email: verEmail,
        contactNo: verNo,
      })
      .then((response) => {
        setRes(true);
        console.log(response.data.data.newApplicant);
        dispatch(
          storeEmail({ senderEmail: response.data.data.newApplicant.email })
        );
        updateVer(response.data.data.newApplicant._id);
        navigate("/data");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div className={style.dataContainer}>
      <div className={style.title}>
        <h1>Agency/Verifier Details</h1>
      </div>
      <div className={style.inputContainer}>
        <div className={style.input}>
          <label htmlFor="verName">Agency/Verifier Name & Place</label>
          <Input
            id="verName"
            placeholder="Agency/Verifier Name & Place"
            type="text"
            value={verName}
            onChange={(e) => setVerName(e.target.value)}
          />
          <br />

          <label htmlFor="verEmail">Email:</label>
          <Input
            id="verEmail"
            placeholder="Email"
            type="email"
            value={verEmail}
            onChange={(e) => setVerEmail(e.target.value)}
          />
          <br />

          <label htmlFor="verNo">Contact Number:</label>
          <Input
            id="verNo"
            placeholder="Contact Number"
            type="text"
            value={verNo}
            onChange={(e) => setVerNo(e.target.value)}
          />
          <br />
        </div>
      </div>
      <div className={style.errorTitle}>
        <p>{res ? "Ok Click Next" : ""}</p>
        <p>{error}</p>
      </div>
      <div className={style.btns}>
        <button
          onClick={() => {
            navigate("/");
          }}
          className={style.btn}
        >
          back
        </button>
        <button onClick={handleSubmit} className={style.btn}>
          Next
        </button>
      </div>
    </div>
  );
}

export default VerifierData;
