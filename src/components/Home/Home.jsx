import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";
import Criteria from "./criteria/criteria";
import { Link } from "react-router-dom";
import microsoft from "../../assets/microsoft.svg";
import facebook from "../../assets/facebook.svg";
import google from "../../assets/google.svg";
import ibm from "../../assets/ibm.svg";
import worker from "../../assets/worker.jpg";
import thirdCustomer from "../../assets/thirdCustomer.avif";
import hero from "../../assets/hero.jpg";
import secondCustomer from "../../assets/secondCustomer.avif";
import earth from "../../assets/earth.jpg";
import { useLocation } from "react-router-dom";
export default function Home() {
  const [criteriaData, setCriteria] = useState(null);
  const location = useLocation();
  const id = location.state;
  console.log("id",id);
  async function getCriteria() {
    const response = await axios.get(
      "https://localhost:7188/api/Criteria/GetAll"
    );
    if (!response.data.isError) {
      setCriteria(response.data.payload);
    } else {
      console.log("error", response.data.message);
    }
  }

  useEffect(() => {
    getCriteria();
  }, []);

  return (
    <>
      <section className={`${Style.page} vh-100`}>
        <div className="row w-100 h-100 flex-column justify-content-center align-items-md-start align-items-center container">
          <div className="col-md-6 offset-md-3 offset-0">
            <h1 className={`text-white ${Style.mainFontWeight}`}>
              Get Help With <br /> Sarvicny
            </h1>
            <p className="lead mt-4 fs-5">
              a website and application for three actors which are worker that
              can Sign Up or Sign In Review Requests, Review Chats, Remove
              Service, add service and update availability and update its info
              and the admin can check worker Requests, Organize service
              Schedules, Check user Feedback, Organize Rating, Check Traffic
              Locations and the customer can choose the service he wants and
              chat with the worker and track the worker stages and can rate the
              worker after he finishes.
            </p>
            <div className={`${Style.homePageButton} mt-5`}>
              <button className="rounded-1 me-md-2 me-0">
                <Link href="#" className="text-decoration-none fw-bolder">
                  Home maintenance
                </Link>
              </button>
              <button className="rounded-1 mt-sm-2 mt-0 px-sm-4  py-sm-3">
                <Link href="#" className="text-decoration-none fw-bolder">
                  cleaning services
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="parentOne py-5">
        <div className="container">
          <div className="row">
            <div className="d-flex align-items-center">
              <div className="col-md-2 ">
                <div className="d-flex align-items-center me-md-0 me-4">
                  <h1 className="fs-5">AS SEEN IN:</h1>
                </div>
              </div>
              <div className="col-md-2 mx-2">
                <div>
                  <Link href="#">
                    <img src={microsoft} className="w-100" alt="microsoft" />
                  </Link>
                </div>
              </div>
              <div className="col-md-2 me-2 ms-5">
                <div>
                  <Link href="#">
                    <img src={google} className="w-75" alt="google" />
                  </Link>
                </div>
              </div>
              <div className="col-md-2 mx-2">
                <div className="d-flex align-items-center">
                  <Link href="#">
                    <img src={ibm} className="w-75" alt="IBM" />
                  </Link>
                </div>
              </div>
              <div className="col-md-2 mx-2">
                <div>
                  <Link href="#">
                    <img src={facebook} className="w-100" alt="facebook" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${Style.parentTwo}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-5 mb-30 pe-0">
              <div className={`${Style.hero_img}  position-relative`}>
                <div className={`${Style.overlay} position-absolute`}></div>
                <img
                  className="w-75"
                  src={worker}
                  alt="hero about the UI/UX designer"
                />
              </div>
            </div>
            <div className="col-md-6 mt-md-0 mt-3 d-flex align-items-center ms-md-5">
              <div className={`${Style.about}`}>
                <h3 className={`${Style.mainColor} mb-3 fs-4`}>About Us</h3>
                <h1>About Sarvicny</h1>
                <p className="mb-4">
                  Sarvicny is a one-stop-shop for all your needs. Our platform
                  connects you with skilled workers who can provide you with a
                  range of services, from home maintenance to programming. Our
                  aim is to make your life easier by providing you with
                  reliable, affordable services at your doorstep.
                </p>
                <Link href="#" className="pb-1 fw-bolder">
                  READ MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${Style.mainPadding} ${Style.parentThree}`}>
        <div className={`container ${Style.mainMarginBottom}`}>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-center flex-column text-center">
                <h1>Why Choose Sarvicny?</h1>
                <p>
                  At Sarvicny, we are committed to providing you with the best
                  possible service. Here are a few reasons why you
                  should choose us:
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-5">
          <div className="row gx-5 gy-3">
            <div className="col-md-6 mb-5">
              <div>
                <h5 className={`${Style.mainColor}`}>01.</h5>
                <h2>Convenience</h2>
                <p className="mb-5">
                  Our platform allows you to easily find and book services at
                  the click of a button, saving you time and effort.
                </p>
                <hr />
              </div>
            </div>
            <div className="col-md-6 mb-5">
              <div>
                <h5 className={`${Style.mainColor}`}>02.</h5>
                <h2>Reliability</h2>
                <p className="mb-5">
                  Our workers are vetted and trained to ensure that they provide
                  you with the best possible service.
                </p>
                <hr />
              </div>
            </div>
            <div className="col-md-6 mt-md-0 mt-5">
              <div>
                <h5 className={`${Style.mainColor}`}>03.</h5>
                <h2>Affordability</h2>
                <p>
                  We offer competitive pricing without compromising on quality.
                </p>
              </div>
            </div>
            <div className="col-md-6 mt-md-0 mt-5">
              <div>
                <h5 className={`${Style.mainColor}`}>04.</h5>
                <h2>Flexibility</h2>
                <p>
                  We offer a wide range of services, from home maintenance to
                  programming, to meet all your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${Style.parentFour} ${Style.mainPadding}`}>
        <div className={`container ${Style.mainMarginBottom}`}>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-center flex-column text-center">
                <h1>Our Service</h1>
                <p>
                  Its our duty to service you with the best workers and
                  companies
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-5">
          <div className="row gx-5">
            {criteriaData ? (
              criteriaData.map(
                (criteria) => (
                  (
                    <Link to={`/criteria/${criteria.criteriaID}`}>
                      <Criteria
                        key={criteria.criteriaID}
                        id={criteria.criteriaID}
                        criteriaName={criteria.criteriaName}
                      />
                    </Link>
                  )
                )
              )
            ) : (
              <div>Loading criteria...</div>
            )}
          </div>
        </div>
      </section>

      <section className={`${Style.parent3} text-center`} id="team">
        <div className={`${Style.containeer}`}>
          <div className="row">
            <div className="col-sm-12 col-lg-3 col-md-6 mt-lg-0 mt-5">
              <div
                className={`mb-3 m-auto ${Style.iconi_2} d-flex justify-content-center align-items-center rounded-circle`}
              >
                <i className="fa-solid fa-user-group text-dark fa-2xl"></i>
              </div>
              <div className="text-dark">
                <p className="fw-bolder">850</p>
                <span>Happy Customers</span>
              </div>
            </div>
            <div className="col-sm-12 col-lg-3 col-md-6 mt-lg-0 mt-5">
              <div
                className={`mb-3 m-auto ${Style.iconi_2} d-flex justify-content-center align-items-center rounded-circle`}
              >
                <i className="fa-solid fa-thumbs-up fa-2xl"></i>
              </div>
              <div className="text-dark">
                <p className="fw-bolder">230</p>
                <span>Complete Services</span>
              </div>
            </div>
            <div className="col-sm-12 col-lg-3 col-md-6 mt-lg-0 mt-5">
              <div
                className={`mb-3 m-auto ${Style.iconi_2} d-flex justify-content-center align-items-center rounded-circle`}
              >
                <i className="fa-solid fa-bullhorn fa-2xl"></i>
              </div>
              <div className="text-dark">
                <p className="fw-bolder">780</p>
                <span>good reputation</span>
              </div>
            </div>
            <div className="col-sm-12 col-lg-3 col-md-6 mt-lg-0 mt-5">
              <div
                className={`mb-3 m-auto ${
                  Style.iconi - 2
                } d-flex justify-content-center align-items-center rounded-circle`}
              >
                <i className="fa-solid fa-cloud-arrow-down fa-2xl"></i>
              </div>
              <div className="text-dark">
                <p className="fw-bolder">9450</p>
                <span>Signed customer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${Style.parentFive}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="p-5 d-flex justify-content-center align-items-center">
                <p>
                  At Sarvicny we are committed to sustainability. Our workers
                  are trained to use eco-friendly products and methods wherever
                  possible, ensuring that we do our part for the environment
                </p>
              </div>
            </div>
            <div className="col-md-3 offset-md-2 offset-0 d-flex justify-content-center align-items-center">
              <img src={earth} alt="earth" className={`${Style.earth}`} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${Style.mainPadding}`}>
        <div className="container">
          <div className="row ">
            <div className="col-md-12 mb-5">
              <div className="d-flex justify-content-center align-items-center">
                <h1 className="fw-bolder">Our Customers speak for us</h1>
              </div>
            </div>
            <div className="col-md-4 p-5">
              <div className={`p-3 ${Style.borderCustomer}`}>
                <p className="mb-5">
                  "I was in desperate need of a plumber and found Sarvicny. The
                  worker arrived on time and fixed the problem quickly. I would
                  definitely recommend this service to anyone in need."
                </p>
                <div className="d-flex align-items-center">
                  <div className="col-md-3">
                    <img
                      src={hero}
                      alt="hero"
                      className={`w-50 ${Style.imageCustomer}`}
                    />
                  </div>
                  <div className="col-md-9">
                    <h5>JULIA KEYS</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-5">
              <div className={`p-3 ${Style.borderCustomer}`}>
                <p className="mb-5">
                  "I have been using Sarvicny for regular cleaning services and
                  have never been disappointed. The workers are thorough and
                  professional and always leave my home looking
                  and smelling great."
                </p>
                <div className="d-flex align-items-center">
                  <div className="col-md-3">
                    <img
                      src={secondCustomer}
                      alt="hero"
                      className={`w-50 ${Style.imageCustomer}`}
                    />
                  </div>
                  <div className="col-md-9">
                    <h5>LUIS ADRIAN</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-5">
              <div className={`p-3 ${Style.borderCustomer}`}>
                <p className="mb-5">
                  "I needed help with programming and found exactly what I was
                  looking for an Sarvicny. The worker was knowledgeable and
                  helped me solve my problem quickly and efficiently. thank you
                  very much Sarvicny"
                </p>
                <div className="d-flex align-items-center">
                  <div className="col-md-3">
                    <img
                      src={thirdCustomer}
                      alt="hero"
                      className={`w-50 ${Style.imageCustomer}`}
                    />
                  </div>
                  <div className="col-md-9">
                    <h5>MARIA ANNA</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-center align-items-center">
              <h6 className="fw-bold">4.8 average rating from 1814 reviews</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
