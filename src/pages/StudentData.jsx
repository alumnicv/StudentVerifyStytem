import { useState } from "react";
import Input from "../components/Input";
// import File from "./File";
import style from "./StudentData.module.css";
import styleInput from "../components/input.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeId } from "../components/studentSlics";
import { fileStore } from "../components/fileSlice";

function StudentData() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [regNo, setRegNo] = useState("");
  const [institution] = useState(
    "Government College Of Engineering Srirangam,Trichy 620012"
  ); // Static value
  const [university] = useState("Anna University Chennai"); // Static value
  const [degree] = useState("B.E"); // Static value
  const [branch, setBranch] = useState("");
  const [branchShort, setBranchShort] = useState("");
  const [studyPeriod, setStudyPeriod] = useState("");
  const [monthYearPassing, setMonthYearPassing] = useState("");
  const [CGPA, setCGPA] = useState("");
  const [remarks, setRemarks] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [classObtained, setClassObtained] = useState("");
  const [files, setFiles] = useState([]);
  // const [fileInputs, setFileInputs] = useState([0]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const [res, setRes] = useState(false);
  const [upload, setupload] = useState(false);

  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const departments = [
    { name: "Computer Science and Engineering", shortForm: "CS" },
    { name: "Civil Engineering", shortForm: "CE" },
    { name: "Electronics and Communication Engineering", shortForm: "EC" },
    { name: "Electrical and Electronics Engineering", shortForm: "EE" },
    { name: "Mechanical Engineering", shortForm: "ME" },
  ];
  function getUniqueId() {
    let year = regNo.slice(4, 6);
    let slice = year.slice(-2);
    return slice + branchShort + regNo.slice(-3);
  }
  const handleDeptChange = (e) => {
    const selectedShortDept = e.target.value;
    const department = departments.find(
      (dept) => dept.shortForm == selectedShortDept
    );

    if (selectedShortDept) {
      setBranch(department.name);
      setBranchShort(selectedShortDept);
    }
  };

  const handleFileUpload = async function () {
    setError("");
    const formData = new FormData();
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });
    } else {
      console.error("No files selected!");
      return;
    }
    await axios
      .post("http://localhost:3000/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setupload(true);
      })
      .catch((error) => {
        setError(error.message.data.message);
        setupload(false);
        console.error(error.message.data.message);
      });
  };
  async function handleUploadData() {
    setError("");
    // setRes(false);
    axios
      .post("http://localhost:3000/api/v1/student", {
        uniqueId: getUniqueId(),
        name: name.toUpperCase(),
        dateOfBirth: dob,
        regNo: regNo,
        Branch: branch,
        yearOfStudy: studyPeriod,
        yearOfPassing: monthYearPassing.toUpperCase(),
        backlogs: backlogs,
        remark: remarks,
        file: files,
        CGPA: CGPA,
        classObtain: classObtained,
      })
      .then((response) => {
        setRes(true);
        console.log(response.data.data.student);
        dispatch(storeId(response.data.data.student));
        dispatch(fileStore(response.data.data.student.file));
        naviagte("/applicantdata");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error);
      });
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const names = files.map((file) => file.name);
    setFiles((prevNames) => [...prevNames, ...names]);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // handling register number
  const handleRegNo = (e) => {
    const inputValue = e.target.value; // Get the current input value
    const regex = /^8301\d{8}$/; // Regex for 11 digits starting with 8301

    // Only allow input if it matches the pattern (and it's <= 11 characters long)
    if (regex.test(inputValue) || inputValue.length <= 12) {
      setRegNo(inputValue); // Update state with the input value
    }
  };

  // setId(allData._id);
  // const handleMoreDocs = (e) => {
  //   e.preventDefault();
  //   setFileInputs((prevInputs) => [...prevInputs, prevInputs.length]);
  // };

  return (
    <div className={style.dataContainer}>
      <div className={style.title}>
        <h1>Student Details </h1>
      </div>

      <div className={style.inputContainer}>
        <div className={style.input}>
          <label htmlFor="studentName">Student Name: (Initial at end)</label>
          <Input
            id="studentName"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="dob">Date of Birth:</label>
          <Input
            id="dob"
            placeholder="D.O.B"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <label htmlFor="regNo">Register Number: (start with 8301)</label>
          <Input
            id="regNo"
            placeholder="12 digit Register Number starting with 8301..."
            type="text"
            value={regNo}
            onChange={handleRegNo}
          />
          <label htmlFor="institution">Institution Name:</label>
          <Input
            id="institution"
            placeholder="College Name"
            type="text"
            value={institution}
            readOnly
          />
          <label htmlFor="university">Affiliated University:</label>
          <Input
            id="university"
            placeholder="Affiliated University "
            type="text"
            value={university}
            readOnly
          />
          <label htmlFor="degree">Degree:</label>
          <Input
            id="degree"
            placeholder="Degree"
            type="text"
            value={degree}
            readOnly
          />
        </div>

        <div className={style.input}>
          <label htmlFor="branch">Select Department:</label>
          <select
            id="branch"
            onChange={handleDeptChange}
            className={styleInput.input}
          >
            <option value="">--Select a Department--</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.shortForm}>
                {dept.name}
              </option>
            ))}
          </select>

          <label htmlFor="studyPeriod">
            Tenure of Study: (Eg: 2021 - 2025)
          </label>
          <Input
            id="studyPeriod"
            placeholder="2021 - 2025"
            type="text"
            value={studyPeriod}
            onChange={(e) => setStudyPeriod(e.target.value)}
          />
          <label htmlFor="monthYearPassing">
            Month & Year of Passing: (Eg: APR 2024)
          </label>
          <Input
            id="monthYearPassing"
            placeholder="APR 2024"
            type="text"
            value={monthYearPassing}
            onChange={(e) => setMonthYearPassing(e.target.value)}
          />
          <label htmlFor="CGPA">CGPA:</label>
          <Input
            id="CGPA"
            placeholder="CGPA"
            type="text"
            value={CGPA}
            onChange={(e) => setCGPA(e.target.value)}
          />
          <label htmlFor="class">Class Obtained:</label>
          <select
            id="class"
            placeholder="Class obtained"
            type="text"
            className={styleInput.input}
            onChange={(e) => setClassObtained(e.target.value)}
            value={classObtained}
          >
            <option value="">Select an option</option>
            <option value="First Class with distinction">
              First Class with distinction
            </option>
            <option value="First Class">First Class</option>
            <option value="Second Class">Second Class</option>
          </select>

          <label htmlFor="backlogs">Backlogs:</label>
          <select
            id="backlogs"
            onChange={(e) => setBacklogs(e.target.value)}
            className={styleInput.input}
            value={backlogs}
          >
            <option value="">Select an Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className={style.remarks}>
        <label htmlFor="remarks">Remarks</label>
        <textarea
          id="remarks"
          className={styleInput.input}
          placeholder="Remarks"
          rows={8}
          cols={30}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>
      <div className={style.studentDocumentContainer}>
        <div className={style.documentInput}>
          {/* {fileInputs.map((input, index) => (
            <File key={index} index={index} onChange={handleFileChange} />
          ))} */}
          <label>You can uplaod multiple file also </label>
          <input type="file" multiple onChange={handleFileChange} />
          <button className={style.btn} onClick={handleFileUpload}>
            Upload Files
          </button>
        </div>

        {/* student document input container ends here */}

        <div className={style.errorTitle}>
          <p>{upload ? "File upload sucess" : "File not upload"}</p>
          <p>{res ? "Ok Click Next" : ""}</p>
          <p>{error}</p>
        </div>
        <button onClick={handleUploadData} className={style.btn}>
          Next
        </button>
      </div>

      {/* ============================================= */}
      {/* Student Document Container ends here */}
    </div>
    // Student Data container ends here
  );
}

export default StudentData;
