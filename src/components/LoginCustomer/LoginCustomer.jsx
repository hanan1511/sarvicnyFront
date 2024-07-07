import React, { useState } from 'react';
import Style from './LoginCustomer.module.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import logo from "../../assets/logo.png";
import { useAppContext } from"../context/AppContext";
import { jwtDecode } from "jwt-decode";
export default function LoginCustomer() {
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userId, setUserId } = useAppContext();

  async function loginForm(values) {
    
    setIsLoading(true);
    const response  = await axios.post('https://localhost:7188/api/auth/login', values).catch((err) => {
      setIsLoading(false);
      console.log(err.response);
      seterror(err.response.data.errors[0]);
    });
    const data = response.data;
    console.log(data);
    if (!data.isError) {
      setIsLoading(false);
      setUserId(data.payload.id);
      localStorage.setItem('userId', data.payload.id);
      console.log("id in log: "+localStorage.getItem('userId'));
      if(data.payload.role=="Customer"){
        navigate('/home',{state:data.payload.id});
      }else if(data.payload.role=="ServiceProvider"){
        navigate('/provider',{state:data})
      }else if(data.payload.role=="Admin"){
        navigate('/admin',{state:data})
      }
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: loginForm,
  });

  return (
    <>
      <section className={` ${Style.signInPage}`}>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12">
              <div className={` ${Style.mainHeading}`}>
                <h1 className="text-center">
                  Log in to <span className={` ${Style.mainHeadingSpan}`}>S</span>arvicny
                </h1>
                <p className={`text-center text-dark ${Style.mainParagraph}`}>
                  Don't have an account? <Link to="/registerCustomer" className={` ${Style.mainLogin}`}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            {error == null ? '' : <div className="alert alert-danger">{error}</div>}
            <div></div>
              <div className="col-md-6 p-4">
                <div className={` ${Style.signUpForm} p-4 rounded-3`}>
                  <h2 className="fw-bold py-5">Log In</h2>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
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
                          <div className="alert p-2 mt-2 alert-danger">{formik.errors.email}</div>
                        )}
                      </div>

                      <div className="col-md-12 py-3">
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
                          <div className="alert p-2 mt-2 alert-danger">{formik.errors.password}</div>
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
                            />{' '}
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className={`btn ${Style.btnMain} w-100`}
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            Log In
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
            </div>

            <div className="col-md-4">
            <img src={logo} className={`${Style.imgo} img-fluid w-auto h-90 `}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

