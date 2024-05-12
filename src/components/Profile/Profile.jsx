import Style from"./Profile.module.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAppContext } from"../context/AppContext";
export default function Profile(){
    const { userId } = useAppContext();
    
    const [profile,setProfile]= useState(null);
    const [avail,setAvail]=useState(null);
    async function getProfile(){
        const response = await axios.get(`https://localhost:7188/api/ServiceProvider/ShowProviderProfile?providerId=${userId}`);
        console.log(response.data);
        if(!response.data.isError){
            setProfile(response.data.payload);
            console.log(response.data.payload);
        }

        const respons1= await axios.get(`https://localhost:7188/api/ServiceProvider/GetServiceProviderAvailability/${userId}`);
        console.log('data',respons1.data);
        if(!respons1.data.isError){
            setAvail(respons1.data.payload);
        }
    }
    useEffect(()=>{
        getProfile();
    },[]);

return(
    <>
    <div className={`${Style.corners}`} >
        <img src="upperCorner2.png" className={`${Style.corner3}`} />
        {/*<img src="upperCorner.png" className={`${Style.corner}`} />*/}
    </div>
    <div className="container justify-content-center">
        <div className={`row d-flex justify-content-center align-item-center mb-5 ${Style.headers}`}>
            <div className="col-md-12">
                    <p className={`${Style.bigHead}`}>PROFILE</p>
                    <p className={`${Style.smallHead}`}>PROFILE</p>
                    <p className={`${Style.desc}`}>See all your profile details</p>
              </div>
        </div>
            <div className={`${Style.formCont} col-md-12 `}>
                <div className="col-md-5">
                    {avail?
                    avail.map((elem)=>(
                        <div className={`container d-flex flex-wrap justify-content-center mt-3`}>
                            <div className={`${Style.cards} container`}>
                                <h5 className="text-center mt-3 col-md-12">{elem.dayOfWeek}</h5>
                                <p className="text-center col-md-12">{elem.availabilityDate.substring(0,10)}</p>
                                {/* <div className={`container `}> */}
                                {elem.slots.map((slot)=>(
                                    <div className={`${Style.slot} col-md-4 d-flex m-1 py-1`}>
                                        <p>start: {slot.startTime} </p>
                                        <p>end: {slot.endTime}</p>
                                    </div>
                                ))}
                                </div>
                            {/* </div> */}
                        </div>    
                    ))
                     :
                     <div> avail is loading</div>}
                </div>
                {profile?

                <Formik>
                    <div className="col-md-5">
                    <Form className={`${Style.form} row`}>
                    <h4 className="text-center">Personal Info</h4>
                        <div className="mb-3 mt-5 col-md-6">
                            <label htmlFor="firstName" className="form-label ">First Name</label>
                            <Field type="text" name="firstName" className="form-control" value={profile.FirstName} />
                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3 mt-5 col-md-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <Field type="text" name="lastName" className="form-control" value={profile.LastName}/>
                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3 col-md-12">
                            <label htmlFor="email" className="form-label ">Email</label>
                            <Field type="email" name="email" className="form-control " value={profile.Email}/>
                            <ErrorMessage name="email" component="div" className="text-danger " />
                        </div>

                        <div className="mb-3 col-md-6">
                            <label htmlFor="userName" className="form-label">User Name</label>
                            <Field type="text" name="userName" className="form-control" value={profile.UserName}/>
                            <ErrorMessage name="userName" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3 col-md-6">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <Field type="text" name="phone" className="form-control" value={profile.PhoneNumber}/>
                            <ErrorMessage name="phone" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3 col-md-12">
                            <label htmlFor="national" className="form-label">NationalID</label>
                            <Field type="text" name="national" className="form-control" value={profile.NationalID}/>
                            <ErrorMessage name="national" component="div" className="text-danger" />
                        </div>
                        <div className="mb-5 col-md-12">
                            <label htmlFor="criminal" className="form-label">Criminal Record</label>
                            <Field type="text" name="criminal" className="form-control" value={profile.CriminalRecord}/>
                            <ErrorMessage name="criminal" component="div" className="text-danger" />
                        </div>
                    </Form>
                    </div>
                </Formik> 
                :
                <div> is loading </div>
                }
            </div>
        </div>
        <div className={`${Style.downcorn}`}>
        <img src="downcorner4.png" className={`${Style.corner2}`} />
      </div>
    </>
);
}