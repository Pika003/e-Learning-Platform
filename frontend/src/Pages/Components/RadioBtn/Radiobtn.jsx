import React from "react";
import './Radiobtn.css'

function Radiobtn({userType,setUserType}) {
  return (
    <>
      <div className="radio-buttons-container">
        <div className="radio-button">
          <input
            name="radio-group"
            id="radio2"
            className="radio-button__input"
            type="radio"
            checked={userType === 'student'}
            onChange={()=>setUserType('student')}
          />
          <label htmlFor="radio2" className="radio-button__label">
            <span className="radio-button__custom" />
            Student
          </label>
        </div>
        <div className="radio-button">
          <input
            name="radio-group"
            id="radio1"
            className="radio-button__input"
            type="radio"
            checked={userType === 'teacher'}
            onChange={()=>setUserType('teacher')}
          />
          <label htmlFor="radio1" className="radio-button__label">
            <span className="radio-button__custom" />
            Teacher
          </label>
        </div>
      </div>
    </>
  );
}

export default Radiobtn;
