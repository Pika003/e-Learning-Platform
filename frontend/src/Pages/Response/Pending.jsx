import React from "react";
import pending from "../Images/pending.svg";
import { NavLink } from "react-router-dom";

function Pending() {
  return (
    <>
      <div className="flex flex-col gap-6 items-center py-5">
        <img src={pending} width={350} alt="" />
        <h1 className="text-[#EDF051] text-4xl font-bold">Response Pending</h1>
        <p className="text-[#fadcb6] text-xl w-[35rem] text-center">
        We take your response, now wait a little bit. when your Admin check your response and approve it or reject any reason we will notify you by your email it.
        </p>
        <NavLink to="/">
          <p className="text-[#6DD15D] text-xl">◀ go to home</p>
        </NavLink>
      </div>
    </>
  );
}

export default Pending;
