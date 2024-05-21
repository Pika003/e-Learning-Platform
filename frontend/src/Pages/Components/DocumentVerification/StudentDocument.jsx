import React, { useEffect, useState } from "react";
import Input from "../DocumentVerification/InputComponent/Input.jsx";
import InputUpload from "../DocumentVerification/Inputupload/InputUpload.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../../Images/logo.svg";

const StudentDocument = () => {
  const [data, setdata] = useState([]);
  const [error, setError] = useState("");
  const { Data } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/student/StudentDocument/${Data}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  const [formData, setFormData] = useState({
    Phone: data.Phone || "",
    Address: data.Address || "",
    Highesteducation: data.Highesteducation || "",
    SecondarySchool: data.SecondarySchool || "",
    HigherSchool: data.HigherSchool || "",
    SecondaryMarks: data.SecondaryMarks || "",
    HigherMarks: data.HigherMarks || "",
    Aadhaar: null,
    Secondary: null,
    Higher: null,
  });

  const handleFileChange = (fileType, e) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch(`/api/student/verification/${Data}`, {
        method: "POST",
        body: formDataObj,
      });

      const responseData = await response.json();
      console.log("response", responseData);

      setLoader(false);
      if (!response.ok) {
        setError(responseData.message);
      } else {
        console.log("Form submitted successfully!");
        navigate("/pending");
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <>
      {loader && (
        <div className="absolute top-[40%] left-[45%] translate-x-[50%] translate-y-[50%]">
          <RotatingLines
            visible={true}
            height="100"
            width="100"
            color="#0D286F"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />{" "}
          <span className="text-white text-xl ml-1">Uploading ...</span>
        </div>
      )}
      <div className="flex items-center gap-[20rem] px-32 py-2 bg-[#0D286F]">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-14" alt="" />
          <h1 className="text-2xl text-[#4E84C1] font-bold">Shiksharthee</h1>
        </div>
        <h2 className="text-white text-xl">Document Verification (Student) </h2>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <p className="text-[#4E84C1] p-5 px-10">Personal Information</p>
        <div className="flex flex-wrap gap-20 px-36 mb-10">
          <Input
            label={"First Name"}
            placeholder={"First Name"}
            value={data.Firstname}
            readonly
          />
          <Input
            label={"Last Name"}
            placeholder={"Last Name"}
            value={data.Lastname}
            readonly
          />
          <Input
            label={"Phone No."}
            placeholder={"Phone No."}
            value={formData.Phone}
            onChange={(e) => handleInputChange("Phone", e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-20 px-36">
          <Input
            label={"Home Address"}
            placeholder={"Home Address"}
            value={formData.Address}
            onChange={(e) => handleInputChange("Address", e.target.value)}
          />
          <Input
            label={"Highest Education"}
            placeholder={"Highest Education"}
            value={formData.Highesteducation}
            onChange={(e) =>
              handleInputChange("Highesteducation", e.target.value)
            }
          />
          <InputUpload
            label={"Upload Aadhar Card"}
            placeholder={"Upload Aadhar Card"}
            value={formData.Aadhaar}
            onChange={(e) => handleFileChange("Aadhaar", e)}
          />
        </div>

        <p className="text-[#4E84C1] p-5 px-10 pt-10">
          Educational Information
        </p>
        <div className="border h-full mx-36 ">
          <div className="flex flex-row gap-7 ">
            <div className=" bg-[#0D286F] p-[1rem] m-3 rounded-sm">
              <p className=" text-white text-sm">Secondary</p>
            </div>
            <Input
              placeholder={"10th Board Name"}
              value={formData.SecondarySchool}
              onChange={(e) =>
                handleInputChange("SecondarySchool", e.target.value)
              }
            />
            <Input
              placeholder={"Total Marks (%)"}
              value={formData.SecondaryMarks}
              onChange={(e) =>
                handleInputChange("SecondaryMarks", e.target.value)
              }
            />
            <div className=" mt-[-1.5rem]">
              <InputUpload
                placeholder={"Upload 10th Result"}
                value={formData.Secondary}
                onChange={(e) => handleFileChange("Secondary", e)}
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-row gap-7">
            <div className=" bg-[#0D286F] p-[1rem] m-3 rounded-sm">
              <p className=" text-white text-sm">Higher Secondary</p>
            </div>
            <Input
              placeholder={"12th Board Name"}
              value={formData.HigherSchool}
              onChange={(e) =>
                handleInputChange("HigherSchool", e.target.value)
              }
            />
            <Input
              placeholder={"Total Marks (%)"}
              value={formData.HigherMarks}
              onChange={(e) => handleInputChange("HigherMarks", e.target.value)}
            />
            <div className=" mt-[-1.5rem]">
              <InputUpload
                placeholder={"Upload 12th Result"}
                value={formData.Higher}
                onChange={(e) => handleFileChange("Higher", e)}
              />
            </div>
          </div>
        </div>
        {error && <p className="text-white text-xl m-5 text-center">!! {error}</p>}
        <div className=" bg-[#0D286F] p-3 m-3 mt-1 rounded-md absolute right-32 bottom-5 cursor-pointer">
          <button className=" text-white text-sm" type="Submit">
            Submit ▶️
          </button>
        </div>
      </form>
    </>
  );
};

export default StudentDocument;
