// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom';

// function Popup({onClose, subject}) {
//   const [desc, setDesc] = useState('');
//   const { ID } = useParams();
//   const dateGap = 3;

//   const [day, setDay] = useState({
//       "sun": false,
//       "mon": false,
//       "tue": false,
//       "wed": false,
//       "thu": false,
//       "fri": false,
//       "sat": false,
//   });

//   const [dayValue, setDayValue] = useState({
//       "sun": "",
//       "mon": "",
//       "tue": "",
//       "wed": "",
//       "thu": "",
//       "fri": "",
//       "sat": "",
//   });

//   const dayIndex = {
//       "sun": 0,
//       "mon": 1,
//       "tue": 2,
//       "wed": 3,
//       "thu": 4,
//       "fri": 5,
//       "sat": 6,
//   };

//   const handleCheckboxChange = (dayName) => {
//     setDay(prevDay => ({ ...prevDay, [dayName]: !prevDay[dayName] }));
//   };

//   const addCourse = async()=>{
//     const selectedDays = Object.keys(day)
//         .filter(d => day[d])
//         .map(d => ({
//             "Day": dayIndex[d],
//             "Start Time": dayValue[d] ? dayValue[d] * 60 : null,
//             "End Time": dayValue[d] ? (parseInt(dayValue[d], 10) + dateGap) * 60 : null,
//           }));

//     const hasMissingTime = selectedDays.some(d => d["Start Time"] === null);

//     if (hasMissingTime) {
//       alert("Please fill in the time for all selected days.");
//       return;
//     }

//     ///////////////////////
//     if(desc == ''){
//       alert('Fill The Description');
//     }else{
//       onClose();

//       const data = {
//         coursename: subject.toLowerCase(),
//         description: desc,
//         time: selectedDays,
//       }

//       //call api 

//       const response = await fetch(`/api/course/${subject}/create/${ID}`, {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const responesData = await response.json();

//       console.log(responesData);
//       alert(responesData.message);

//     }
//   }

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center'>
//         <div className='bg-[#008280] w-[30rem] h-fit py-4 mt-1 rounded-md'>
//           <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
//           <div className=' text-center my-10 text-white text-3xl font-semibold'>
//             <p>{subject}</p>
//           </div>
//           <div className='m-5 flex flex-col gap-4 text-white text-xl'>
//             <div>
//               <label htmlFor="">Coursename : </label>
//               <input 
//                 type="text" 
//                 className="bg-[#32B0AE] p-2 rounded-md w-52 border-0 outline-0"
//                 value={subject}
//                 readOnly
//               />
//             </div>
            
//             <label>Timing : </label>
//             {Object.keys(day).map((d) => (
//                 <div key={d} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
//                     <input type="checkbox" checked={day[d]} onChange={() => handleCheckboxChange(d)} />
//                     <label>{d.charAt(0).toUpperCase() + d.slice(1)}</label>
//                     <input className='w-[7rem] rounded-sm text-black placeholder:text-gray pl-2' type="time" rounded-sme="text" placeholder='Start Time' value={dayValue[d]} onChange={(e) => setDayValue({ ...dayValue, [d]: e.target.value })} />
//                     <input className='w-[7rem] rounded-sm text-black placeholder:text-gray pl-2' type="time"  placeholder="End Time" value={(parseInt(dayValue[d], 10) + dateGap)} />
//                 </div>
//             ))}

//             <div>
//               <label htmlFor="">Description : </label>
//               <input type="text"
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//               className="bg-[#32B0AE] p-2 rounded-md w-52 ml-3 border-0 outline-0" 
//               />
//             </div>
//           </div>

//           <div className='flex items-center justify-center mt-7'>
//             <span onClick={addCourse} className='bg-[#335699] text-white px-10 py-3 rounded-md text-xl cursor-pointer'>
//               Create Course
//             </span>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default Popup
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Popup({ onClose, subject }) {
  const [desc, setDesc] = useState('');
  const { ID } = useParams();
  const dateGap = 3; // 3 hours

  const [day, setDay] = useState({
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
  });

  const [dayValue, setDayValue] = useState({
    sun: '',
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
  });

  const dayIndex = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  const handleCheckboxChange = (dayName) => {
    setDay((prevDay) => ({ ...prevDay, [dayName]: !prevDay[dayName] }));
  };

  const addCourse = async () => {
    const selectedDays = Object.keys(day)
      .filter((d) => day[d])
      .map((d) => ({
        day: dayIndex[d],
        starttime: dayValue[d] ? convertTimeToMinutes(dayValue[d]) : null,
        endtime: dayValue[d] ? convertTimeToMinutes(dayValue[d]) + dateGap * 60 : null,
      }));

    const hasMissingTime = selectedDays.some((d) => d.starttime === null);

    if (hasMissingTime) {
      alert('Please fill in the time for all selected days.');
      return;
    }

    const invalidTimeRange = selectedDays.some((d) => {
      const startTime = d.starttime;
      const endTime = d.endtime;
      if (startTime >= endTime) {
        alert('Start time must be earlier than end time.');
        return true;
      }
      if ((endTime - startTime) > 3 * 60) {
        alert('End time should not be more than 3 hours after start time.');
        return true;
      }
      return false;
    });

    if (invalidTimeRange) {
      return;
    }

    if (desc === '') {
      alert('Fill the description.');
      return;
    }

    if(selectedDays.length === 0){
      alert('pls! select any day and time.');
      return;
    }

    onClose();

    const data = {
      coursename: subject.toLowerCase(),
      description: desc,
      schedule: selectedDays,
    };

    console.log(data);

    // Call API
    const response = await fetch(`/api/course/${subject}/create/${ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
    alert(responseData.message);
  };

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (minutes) => {
    const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
    const mins = String(minutes % 60).padStart(2, '0');
    return `${hours}:${mins}`;
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center'>
      <div className='bg-[#008280] w-[30rem] h-fit py-4 mt-1 rounded-md'>
        <div
          className='absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2'
          onClick={onClose}
        >
          ✖️
        </div>
        <div className='text-center my-10 text-white text-3xl font-semibold'>
          <p>{subject}</p>
        </div>
        <div className='m-5 flex flex-col gap-4 text-white text-xl'>
          <div>
            <label htmlFor=''>Coursename: </label>
            <input
              type='text'
              className='bg-[#32B0AE] p-2 rounded-md w-52 border-0 outline-0'
              value={subject}
              readOnly
            />
          </div>

          <label>Timing: </label>
          {Object.keys(day).map((d) => (
            <div
              key={d}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <input
                type='checkbox'
                checked={day[d]}
                onChange={() => handleCheckboxChange(d)}
              />
              <label>{d.charAt(0).toUpperCase() + d.slice(1)}</label>
              <input
                className='w-[7rem] rounded-sm text-black placeholder:text-gray pl-2'
                type='time'
                placeholder='Start Time'
                value={dayValue[d]}
                onChange={(e) =>
                  setDayValue({ ...dayValue, [d]: e.target.value })
                }
              />
              <input
                className='w-[7rem] rounded-sm text-black placeholder:text-gray pl-2'
                type='time'
                readOnly
                placeholder='End Time'
                value={dayValue[d] ? convertMinutesToTime(convertTimeToMinutes(dayValue[d]) + dateGap * 60) : ''}
              />
            </div>
          ))}

          <div>
            <label htmlFor=''>Description: </label>
            <input
              type='text'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className='bg-[#32B0AE] p-2 rounded-md w-52 ml-3 border-0 outline-0'
            />
          </div>
        </div>

        <div className='flex items-center justify-center mt-7'>
          <span
            onClick={addCourse}
            className='bg-[#335699] text-white px-10 py-3 rounded-md text-xl cursor-pointer'
          >
            Create Course
          </span>
        </div>
      </div>
    </div>
  );
}

export default Popup;

