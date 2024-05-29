import React, { useEffect, useState } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import logo from "../../Images/logo.svg";
import Success from "./Success";

function Search() {
  const [data, setData] = useState("");
  const [course, setCourse] = useState([]);
  const [courseID, setCourseID] = useState([]);
  const [popup, setPopup] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const { ID } = useParams();

  const closePopup = () => {
    setPopup(false);
    window.location.reload();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/course/student/${ID}/enrolled`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const user = await response.json();
        setCourseID(user.data);
        console.log(user.data);
        setIdArray(prevIdArray => [...prevIdArray, ...user.data.map(res => res._id)]);
        // Using a callback in setIdArray to ensure you're working with the most up-to-date state
  
      } catch (error) {
        console.log(error.message)
      }
    };
    getData();
  }, []);
  

  const SearchTeacher = async (sub) => {
    const subject = sub.toLowerCase();
    const Data = await fetch(`/api/course/${subject}`);
    const response = await Data.json();
    if (response.statusCode === 200) {
      setCourse(response.data);
    }
    setData("");
  };

  const handleEnroll = async (courseName, id) => {
    const data = await fetch(`/api/payment/course/${id}/${courseName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fees: 500000 }),
    });

    const DATA = await data.json();
    // console.log(DATA.data.id)

    const Key = await fetch("/api/payment/razorkey", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await Key.json();

    const options = {
      key: response.data.key,
      amount: "500000",
      currency: "INR",
      name: "Shiksharthee",
      description: "Enroll in a course",
      image: logo,
      order_id: DATA.data.id, // Include the order_id from the response
      handler: async (response) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        // Send the payment details to the server for verification
        const verificationData = {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        };

        const verificationResponse = await fetch(
          `/api/payment/confirmation/course/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verificationData),
          }
        );

        const res = await verificationResponse.json();
        console.log(res.statusCode);
        if (res.statusCode === 200) {
          try {
            let response = await fetch(
              `/api/course/${courseName}/${id}/add/student/${ID}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // body: JSON.stringify({}),
              }
            );

            let res = await response.json();
            // console.log(res);
            setPopup(true);
          } catch (error) {
            console.log(error);
          }
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <div className="search mb-4">
        <img
          src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5"
          width={30}
          alt=""
        />
        <input
          type="text"
          placeholder="Ex: Math ..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className="w-32" onClick={() => SearchTeacher(data)}>
          Find Teacher
        </button>
      </div>
      <div className="overflow-auto h-56">
        {course &&
          course.map((Data) => (
            <div
              key={Data._id}
              className="relative bg-blue-600 p-4 gap-6 mb-3 flex items-center rounded-sm max-w-4xl"
            >
              <div className="text-white bg-blue-900 p-2 rounded-md">
                {Data.coursename}
              </div>
              <div className="text-gray-300">
                {Data.enrolledteacher.Firstname} {Data.enrolledteacher.Lastname}
              </div>
              <div className="text-gray-900">
                <span className="text-black">Desc :</span> {Data.description}
              </div>
              <div>{Data.enrolledStudent.length}/20</div>
              { idArray.includes(Data._id) ? (
                <div onClick={()=> alert("You Already enrolled, pls find other course")}
                  className="text-white bg-green-900 py-2 px-3 absolute right-4 cursor-not-allowed">
                  Already Enrolled
                </div>
              ) : Data.enrolledStudent.length < 20 ? (
                <div
                  onClick={() => handleEnroll(Data.coursename, Data._id)}
                  className="text-white bg-blue-900 py-2 px-3 absolute right-4 cursor-pointer"
                >
                  Enroll Now
                </div>
              ) : (
                <div onClick={()=> alert("Already Full, pls find other course")}
                  className="text-white bg-red-900 py-2 px-3 absolute right-4 cursor-not-allowed">
                  Already Full
                </div>
              )}
            </div>
          ))}
      </div>

      {popup && <Success onClose={closePopup} />}
    </>
  );
}

export default Search;
