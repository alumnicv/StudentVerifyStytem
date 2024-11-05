import { useSelector } from "react-redux";
import style from "./outPut.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OutPut() {
  const users = useSelector((sta) => sta.studentId.value);
  console.log(users);
  const files = useSelector((sta) => sta.file.value);
  const applicentEmail = useSelector((sta) => sta.appEmail.value);
  const navigate = useNavigate();
  console.log(files);
  async function emailSend() {
    axios
      .post(" http://localhost:3000/api/v1/email", {
        files: files,
        subject: "hi",
        emailText: users.remark,
        email: applicentEmail.senderEmail,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function onsubmit() {
    axios
      .post("http://localhost:3000/api/v1/generate-pdf", {
        id: users._id,
        uniqueId: users.uniqueId,
        name: users.name,
        dateOfBirth: users.dateOfBirth,
        regNo: users.regNo,
        degree: users.drgree,
        Branch: users.Branch,
        Institution: users.nameOfTheInstitution,
        University: users.University,
        yearOfPassing: users.yearOfPassing,
        yearOfStudy: users.yearOfStudy,
        CGPA: users.CGPA,
        classObtained: users.classObtain,
        backlogs: users.backlogs,
        email: applicentEmail.senderEmail,
      })
      .then((response) => {
        console.log(response);
        emailSend();
        navigate("/send");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const filteredUserInfo = Object.entries(users)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, value]) => value) // Keeps only entries where value is truthy
    .map(([key, value]) => ({ key, value }));

  return (
    <div className={style.output}>
      <h1>User Information</h1>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserInfo.map((el, i) => (
            <tr key={i}>
              <td>{el.key}</td>
              <td>{el.value}</td>
            </tr>
          ))}
          <tr>
            <td>Email</td>
            <td>{applicentEmail.senderEmail}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={onsubmit}>Submit</button>
    </div>
  );
}

export default OutPut;
