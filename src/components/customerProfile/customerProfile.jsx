import React, { useState, useEffect } from "react";
import Style from "./customerProfile.module.css";
import { useParams } from "react-router-dom";
import Mission from "../Mission/Mission.jsx";

const iconMapping = {
  1: <i className="fa-solid fa-bath fs-1 my-4 text-primary"></i>,
  2: <i className="fa-solid fa-toilet fs-1 my-4 text-primary"></i>,
  3: <i className="fa-solid fa-wrench fs-1 my-4 text-primary"></i>
};

export default function CustomerProfile() {


  return (
    <>
      <section className={`p-5 ${Style.services}`}>
        <div className="container bg-white p-5 rounded-2">
          <div className="row">
            <div className="col-md-6 mb-5">
              <h3>Name:</h3>
            </div>
            <div className="col-md-6 mb-5">
              <h3>Email:</h3>
            </div>
            <div className="col-md-6 mb-5">
              <h3>Address:</h3>
            </div>
            <div className="col-md-6 mb-5">
              <h3>Password:</h3>
            </div>
            <div className="col-md-12">
              <button className="btn btn-success w-100">update</button>
            </div>
          </div>
        </div>
      </section>
      <Mission/>
    </>
  );
}
