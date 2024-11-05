import { useEffect, useState } from "react";
import vstyle from "./VerfierSubmit.module.css";
import style from "./outPut.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function VerfierSubmit() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remark, setRemark] = useState(null);
  const [fileName, setFileName] = useState("");
  // State to store file data (file object)
  const [fileData, setFileData] = useState(null);

  const handleVerificationUpdate = () => {
    axios
      .put(`http://localhost:3000/api/v1/student/verified/${id}`, {
        verified: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error.message.data.message);
        console.log(error);
      });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      setFileName(file.name); // Set the file name in state
      setFileData(file); // Set the full file object in state
    } else {
      setFileName(""); // Clear the state if no file is selected
      setFileData(null); // Clear the file data if no file is selected
    }
  };

  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before making the request
        const response = await axios.get(
          `http://localhost:3000/api/v1/student/${id}`
        ); // Fetch data from your API
        setData(response.data.data.student); // Update the data state with fetched data
      } catch (err) {
        setError(err.message); // Catch and set any error that occurs during the request
      } finally {
        setLoading(false); // Whether success or error, loading should stop
      }
    };

    fetchData();
  }, [id]);

  const handleFileUpload = async function () {
    setError("");
    const formData = new FormData();
    formData.append("file", fileData);
    await axios
      .post("http://localhost:3000/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error.message.data.message);
        console.error(error.message.data.message);
      });
  };
  async function emailSend() {
    await axios
      .post(" http://localhost:3000/api/v1/finalEmail", {
        email: data.applicantID.email,
        fileName: fileName,
        remark: remark,
      })
      .then((response) => {
        console.log(response);
        handleVerificationUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (loading) {
    return <p>Loading...</p>; // Render a loading state while the request is pending
  }

  if (error) {
    return <p>Error: {error}</p>; // Render the error message if the request fails
  }

  if (!data) {
    return <p>No data found for this item.</p>; // Handle the case where data is null or empty
  }

  return (
    <div className={style.output}>
      <h1> Confirm verification</h1>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unique ID</td>
            <td>{data.uniqueId}</td>

            {/* <td>hi</td> */}
          </tr>
          <tr>
            <td>Name</td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{data.dateOfBirth}</td>
          </tr>
          <tr>
            <td>Registration Number</td>
            <td>{data.regNo}</td>
          </tr>
          <tr>
            <td>Degree</td>
            <td>{data.drgree}</td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>{data.Branch}</td>
          </tr>
          <tr>
            <td>Name of Institution</td>
            <td>{data.nameOfTheInstitution}</td>
          </tr>
          <tr>
            <td>University</td>
            <td>{data.University}</td>
          </tr>
          <tr>
            <td>Year of Passing</td>
            <td>{data.yearOfPassing}</td>
          </tr>
          <tr>
            <td>Year of Study</td>
            <td>{data.yearOfStudy}</td>
          </tr>
          <tr>
            <td>CGPA</td>
            <td>{data.CGPA}</td>
          </tr>
          <tr>
            <td>Backlogs</td>
            <td>{data.backlogs}</td>
          </tr>
          <tr>
            <td>Class Obtained</td>
            <td>{data.classObtain}</td>
          </tr>
          <tr>
            <td>Remark</td>
            <td>{data.remark}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{data.applicantID.email}</td>
          </tr>
        </tbody>
      </table>
      <div className={vstyle.uploadContainer}>
        <textarea
          id="verifierRemarks"
          placeholder="Remarks"
          rows={8}
          cols={50}
          className={vstyle.remarks}
          onChange={(e) => setRemark(e.target.value)}
        />

        <input
          type="file"
          className={vstyle.file}
          onChange={handleFileChange}
        />
        <button
          className={vstyle.btn}
          onClick={() => {
            console.log("click");
            handleFileUpload();
          }}
        >
          Upload File
        </button>

        <button
          style={{
            backgroundColor: "green",
            borderRadius: "5px",
          }}
          className={vstyle.btn}
          onClick={() => {
            emailSend();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default VerfierSubmit;
