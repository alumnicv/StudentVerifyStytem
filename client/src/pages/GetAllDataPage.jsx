import axios from "axios";
import { useEffect, useState } from "react";
import style from "./getalldata.module.css";
import { useNavigate } from "react-router-dom";

function GetAllDataPage() {
  const [allData, setAllData] = useState([]);
  const [verifiedData, setVerifiedData] = useState([]);
  const [unVerifiedData, setUnVerifiedData] = useState([]);
  const navigate = useNavigate();
  console.log(verifiedData);

  async function getAllDAta() {
    await axios
      .get("http://localhost:3000/api/v1/student")
      .then((response) => {
        setAllData(response.data.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(allData);

  async function getVerifiedData() {
    await axios
      .get("http://localhost:3000/api/v1/student/verified")
      .then((res) => {
        setVerifiedData(res.data.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getUnVerifiedData() {
    await axios
      .get("http://localhost:3000/api/v1/student/Unverified")
      .then((res) => {
        setUnVerifiedData(res.data.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllDAta();
    getVerifiedData();
    getUnVerifiedData();
  }, []);
  return (
    <div>
      <header>Sudent All VerifierData</header>
      <div className={style.total}>
        <h4>Total Request:{allData.length}</h4>
        <h4>Total verified:{verifiedData.length}</h4>
        <h4>Total unverified:{unVerifiedData.length}</h4>
      </div>
      <div className={style.btn}>
        <button onClick={() => setAllData(verifiedData)}>VerifedData</button>
        <button onClick={() => setAllData(unVerifiedData)}>
          UnverifedData
        </button>
      </div>
      <main>
        {allData.map((el, i) => (
          <div
            key={i}
            className={el.verified ? style.verified : style.notVerified}
            onClick={() => {
              navigate(`/getAllData/${el._id}`);
            }}
          >
            <div className={style.innerContiner}>
              <div className={style.referId}>{el.uniqueId}</div>
              <div className={style.name}>{el.name}</div>
              <div className={style.dob}>{el.dateOfBirth}</div>
              <dir className={style.regno}>{el.regNo}</dir>
              <div className={style.branch}>{el.Branch}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default GetAllDataPage;
