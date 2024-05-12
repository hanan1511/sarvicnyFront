import React from "react";
import Style from "./servicesCriteria.module.css";
import photo from "../../assets/recycled-shoe-product-image-015_dIXN9miF.webp";
import Mission from "../Mission/Mission.jsx";
import { useNavigate,useLocation,useParams,Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
export default function    ServicesCriteria() {
  // const location = useLocation();
  //   const id = location.state?.id;
  const { id } = useParams();
  const [services,setService]=useState(null);
  console.log("in criteriaservice",id);

  async function getServices(){
    const response=await axios.get(`https://localhost:7188/api/Criteria/${id}`);
    setService(response.data.payload);
  }

  useEffect(() => {
    if (id) {
        getServices();
    }
}, [id]);
  return (
    <>
      <section className={`p-5 ${Style.services}`}>
        <div className="container bg-white p-5 rounded-2">
          {services?<div className="row">
            <div className="col-md-12">
              <div>
                <h1 className="fw-bolder fs-1">{services.criteriaName}</h1>
              </div>
            </div>
            {console.log(services.services)}
            {services.services.map((service) => (
              <Link to="/service"
                state={{ service: service,
                criteraName:services.criteriaName }}  // Pass the service object in the state
              >
              <div key={service.serviceID} className="col-md-4 mt-5">
                <img src={photo} className="w-100 mb-3" alt="" />
                <h2 className="card-title my-2">{service.serviceName}</h2>
                <p className="card-text">{service.description}</p>
              </div>
              </Link>
            ))}
          </div>:
          <div>is loading.......</div>}
        </div>
      </section>
      <Mission />
    </>
  );
}
