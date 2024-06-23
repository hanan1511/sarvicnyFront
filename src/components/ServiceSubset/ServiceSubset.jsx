import React, { useState, useEffect } from "react";
import Style from "./ServiceSubset.module.css";
import { useParams } from "react-router-dom";

const iconMapping = {
  1: <i className="fa-solid fa-bath fs-1 my-4 text-primary"></i>,
  2: <i className="fa-solid fa-toilet fs-1 my-4 text-primary"></i>,
  3: <i className="fa-solid fa-wrench fs-1 my-4 text-primary"></i>
};

export default function ServiceSubset() {
  const { id } = useParams();

  const [services] = useState({
    criteriaName: "Dummy Subsets",
    services: [
      {
        serviceID: 1,
        serviceName: "Dummy Service 1",
        description: "This is a description for Dummy Service 1."
      },
      {
        serviceID: 2,
        serviceName: "Dummy Service 2",
        description: "This is a description for Dummy Service 2."
      },
      {
        serviceID: 3,
        serviceName: "Dummy Service 3",
        description: "This is a description for Dummy Service 3."
      }
    ]
  });

  const [addedServices, setAddedServices] = useState([]);

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("addedServices")) || [];
    setAddedServices(storedServices);
  }, []);

  const addService = (service) => {
    const updatedServices = [...addedServices, service];
    setAddedServices(updatedServices);
    localStorage.setItem("addedServices", JSON.stringify(updatedServices));
  };

  const removeService = (serviceID) => {
    const updatedServices = addedServices.filter(service => service.serviceID !== serviceID);
    setAddedServices(updatedServices);
    localStorage.setItem("addedServices", JSON.stringify(updatedServices));
  };

  return (
    <>
      <section className={`p-5 ${Style.services}`}>
        <div className="container bg-white p-4 rounded-2">
          <div className="row">
            <div className="col-md-12">
              <div>
                <h5 className=" fs-1">Added Services</h5>
              </div>
            </div>
            {addedServices.map((service) => (
              <div key={service.serviceID} className={`col-md-3 mt-4 p-3 rounded-2 ${Style.subset} mx-2`}>
                <h2 className="card-title my-2">{service.serviceName}</h2>
                <p className="card-text">{service.description}</p>
                <i
                  className="fa-regular fa-circle-xmark deletion"
                  onClick={() => removeService(service.serviceID)}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`p-5 ${Style.services}`}>
        <div className="container bg-white p-5 rounded-2">
          {services ? (
            <div className="row">
              <div className="col-md-12">
                <div>
                  <h1 className="fw-bolder fs-1">{services.criteriaName}</h1>
                </div>
              </div>
              {services.services.map((service) => (
                <div key={service.serviceID} className="col-md-4 mt-5 text-center">
                  {iconMapping[service.serviceID]}
                  <h2 className="card-title my-2">{service.serviceName}</h2>
                  <p className="card-text">{service.description}</p>
                  <button
                    className="btn w-100 btn-outline-primary"
                    onClick={() => addService(service)}
                  >
                    Add Me please
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>is loading.......</div>
          )}
        </div>
      </section>
    </>
  );
}
