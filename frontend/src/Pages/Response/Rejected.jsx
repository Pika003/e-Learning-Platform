import React from "react";
import rejected from "../Images/rejected.svg";
import { NavLink } from "react-router-dom";

function Rejected() {
  return (
    <>
      <div className="flex flex-col gap-6 items-center py-5">
        <img src={rejected} width={350} alt="" />
        <h1 className="text-[#F37070] text-4xl font-bold">Response Rejected</h1>
        <p className="text-[#fadcb6] text-xl w-[35rem] text-center">
          We take your response, but the image of your Aadhaar card is little
          unclear. Please submit one more time.
        </p>
        <NavLink to="/">
          <p className="text-[#6DD15D] text-xl">◀ go to document verification page </p>
        </NavLink>
      </div>
    </>
  );
}

export default Rejected;
