import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Style from "./WorkerReg.module.css";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import upperCorner2 from "../../assets/upperCorner2.png";
import upperCorner from "../../assets/upperCorner.png";
import downCorner from "../../assets/downCorner.png";
import logo from "../../assets/logo.png";
function WorkerReg(){
    let navigate = useNavigate();
  const [error, seterror] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  async function registerForm(values) {
    setIsLoading(true);
    const response = await axios.post(`https://localhost:7188/api/Worker/register?role=ServiceProvider`, values)
      .catch((err) => {
        setIsLoading(false);
        seterror(err.response.data.message);
        
      });
      console.log(response.data);
      const token = response.data.payload;
      const decodedToken = jwtDecode(token).userId;
      console.log(decodedToken);
    console.log(response.data.payload)
    if (!response.isError) {
      setIsLoading(false);
      navigate("/provider/serviceReg" ,{state: { workerIdProp:decodedToken}});
      //console.log("registerd")
    }
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    phoneNumber: Yup.string()
      .matches(/^01[0-9]{9}$/, "Invalid phone number")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string()
      .required("Address is required")
      .max(255, "Address is too long"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(10, "Password must be at most 10 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    nationalId: Yup.string()
      .required("National ID is required")
      .max(14, "Wrong Way to write National ID")
      .min(14, "Wrong Way to write National ID"),
    criminalRecord: Yup.string()
      .required("Criminal Record is required")
      .max(255, "criminal is too long"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      userType: "Worker",
      email: "",
      address: "",
      password: "",
      nationalId:"",
      criminalRecord:"stringstring"
    },
    validationSchema,
    onSubmit: registerForm,
  });
    return(
    <>
      <div className={`${Style.corners}`} >
        <img src={upperCorner2} className={`${Style.corner3}`} />
        <img src={upperCorner} className={`${Style.corner}`} />
      </div>
      <div className={` ${Style.signUpPage}`}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-item-center">
            <div className="col-md-12">
              <div className={` ${Style.mainHeading}`}>
                <h1 className="text-center">
                  Sign up for{" "}
                  <span className={` ${Style.mainHeadingSpan}`}>S</span>arvicny
                </h1>
                <p className={`text-center text-dark ${Style.mainParagraph}`}>
                  Create a free account or{" "}
                  <Link to="/loginCustomer" className={` ${Style.mainLogin}`}>
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src={logo} className={`${Style.imgo} img-fluid  h-90 `}/>
            </div>
            {error == null ? (
              ""
              ) : (
                   <div className="alert alert-danger">{error}</div>
            )}
            <div className="col-md-6 p-4">
              <div className={`  ${Style.signUpForm}  p-4 rounded-3`}>
                <div className="d-flex justify-content-center align-item-center">
                  <ul className={`${Style.steps_list}`}>
                    <li className={`${Style.steps_item}`}>
                      <span className={`${Style.countCurr}`}>1</span>
                      <span className={`${Style.infoCurr}`}>Personal info</span>
                    </li>
                    <li className={`${Style.steps_item}`}>
                      <span className={`${Style.count}`}>2</span>
                      <span className={`${Style.info}`}>Service info</span>
                    </li>
                  </ul>
                </div>
                <h2 className="fw-bold py-5 text-center" style={{fontSize:'30px'}}>Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <h5>First name</h5>
                      <input
                        type="text"
                        className="rounded-2 w-100"
                        placeholder="First name"
                        id="firstName"
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                      />
                      {formik.errors.firstName && formik.touched.firstName && (
                        <div className="alert p-2 mt-2 alert-danger">
                          {formik.errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <h5>Last name</h5>
                      <input
                        type="text"
                        className="rounded-2 w-100"
                        placeholder="Last name"
                        id="lastName"
                        name="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                      />
                      {formik.errors.lastName && formik.touched.lastName && (
                        <div className="alert p-2 mt-2 alert-danger">
                          {formik.errors.lastName}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 py-3">
                      <h5>Username</h5>
                      <input
                        type="text"
                        className="rounded-2 w-100"
                        placeholder="Username"
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                      {formik.errors.username && formik.touched.username && (
                        <div className="alert p-2 mt-2 alert-danger">
                          {formik.errors.username}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 py-3">
                      <h5>PhoneNumber</h5>
                      <input
                        type="tel"
                        className="rounded-2 w-100"
                        placeholder="Phone Number"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                      />
                      {formik.errors.phoneNumber &&
                        formik.touched.phoneNumber && (
                          <div className="alert p-2 mt-2 alert-danger">
                            {formik.errors.phoneNumber}
                          </div>
                      )}
                    </div>

                    <div className="col-md-12 py-1">
                      <h5>National Id</h5>
                      <input
                        type="text"
                        className="rounded-2 w-100"
                        placeholder="National ID"
                        id="nationalId"
                        name="nationalId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nationalId}
                      />
                      {formik.errors.nationalId && formik.touched.nationalId && (
                        <div className="alert p-2 mt-2 alert-danger">
                          {formik.errors.nationalId}
                        </div>
                      )}
                    </div>

                    <div className="col-md-12 py-1">
                      <h5>Email</h5>
                      <input
                        type="email"
                        className="rounded-2 w-100"
                        placeholder="Email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <div className="alert p-2 mt-2 alert-danger">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>

                    <div className="col-md-12 py-1">
                      <h5>Address</h5>
                      <input
                        type="text"
                        className="rounded-2 w-100"
                        placeholder="Address"
                        id="address"
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                      />
                      {formik.errors.address && formik.touched.address && (
                        <div className="alert p-2 mt-2 alert-danger">
                          {formik.errors.address}
                        </div>
                      )}
                    </div>

                    <div className="col-md-12 py-1">
                      <h5>Criminal Record</h5>
                      <input
                        type="file"
                        className="rounded-2 w-100"
                        placeholder="Criminal Record"
                        id="criminalRecord"
                        name="criminalRecord"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.criminalRecord && formik.touched.criminalRecord && (
                        <div className="alert p-2 mt-2 alert-danger">
                          {formik.errors.criminalRecord}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 py-3">
                      <h5>Password</h5>
                      <input
                        type="password"
                        className="rounded-2 w-100"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.errors.password && formik.touched.password && (
                        <div className="alert p-2 mt-2 alert-danger">
                          {formik.errors.password}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 py-3">
                      <h5>ConfirmPassword</h5>
                      <input
                        type="password"
                        className="rounded-2 w-100"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                      />
                      {formik.errors.confirmPassword &&
                        formik.touched.confirmPassword && (
                          <div className="alert p-2 mt-2 alert-danger">
                            {formik.errors.confirmPassword}
                          </div>
                      )}
                    </div>

                    <div className="col-md-12 py-3">
                      {isLoading ? (
                        <div className="d-flex justify-content-center">
                          <Audio
                            height="80"
                            width="80"
                            radius="9"
                            color="#152238"
                            ariaLabel="three-dots-loading"
                            wrapperStyle
                            wrapperClass
                          />{" "}
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className={`btn   ${Style.btnMain} w-100`}
                          disabled={!(formik.isValid && formik.dirty)}
                        >
                          Sign Up
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={downCorner} className={`${Style.corner2}`} />
      </div>
    </>
    );
}
export default WorkerReg;
