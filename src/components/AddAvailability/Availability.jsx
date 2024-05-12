import React from "react";
import { FaBolt, FaBullseye, FaHourglass } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Style from "./Availability.module.css";
import axios from "axios";
import { useAppContext } from"../context/AppContext";
const Availability = () => {
  const { userId } = useAppContext();
  
  const hoursArray = Array.from({ length: 16 }, (_, index) => index + 7);

  async function aval(values) {
    const response = await axios.post(`https://localhost:7188/api/ServiceProvider/SetAvailability?workerID=${userId}`, values);

    console.log(response.data.payload)
    if (!response.isError) {
      alert("avalabilty add succssfuly");
    }
  }

  const handleDropdownChange = (event) => {
    const chosenDay = event.target.value;
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const difference = currentDay - chosenDay;
    currentDate.setDate(currentDate.getDate() - difference);
    const formattedDate = currentDate.toISOString().split("T")[0];
    formik.setFieldValue("selectedDay", chosenDay);
    formik.setFieldValue("selectedDate", formattedDate);
  };

  const handleDateChange = (event) => {
    const chosenDate = event.target.value;
    const dayIndex = new Date(chosenDate).getDay();
    formik.setFieldValue(
      "selectedDay",
      dayIndex === -1 ? "" : dayIndex.toString()
    );
    formik.setFieldValue("selectedDate", chosenDate);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    selectedDay: Yup.string().required("Select a day"),
    selectedDate: Yup.date().required("Select a date"),
    firstInputValue: Yup.string().required("Select start hour"),
    secondInputValue: Yup.string()
      .required("Select end hour")
      .test(
        "is-greater",
        "End hour must be greater than start hour",
        function (value) {
          const { firstInputValue } = this.parent;
          const startHour = parseInt(firstInputValue, 10);
          const endHour = parseInt(value, 10);
          return endHour > startHour;
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      selectedDay: "",
      selectedDate: "",
      firstInputValue: "",
      secondInputValue: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const dayOfWeek = parseInt(values.selectedDay, 10);
      const selectedDate = new Date(values.selectedDate).toISOString();
      const slots = [
        {
          startTime: `${values.firstInputValue}:00`,
          endTime: `${values.secondInputValue}:00`,
        },
      ];
      function getDayOfWeek(dayIndex) {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return days[dayIndex];
      }
      const submittedObject = {
        dayOfWeek: getDayOfWeek(dayOfWeek),
        availabilityDate: selectedDate,
        slots: slots,
      };

      console.log("sub", submittedObject);
      aval(submittedObject);
    },
  });

  return (
    <>
      {/* className={`col-md-12 ${Style.head}`} */}
      <div className={` ${Style.heading}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className={` ${Style.headingInner} text-center`}>
                <h1 className={`${Style.cinzel}`}>
                  ADD AVAILABILITY SECTION IN SARVICNY
                </h1>
                <p className={`${Style.para}`}>
                  Luxury Treatment and fair taxes for all Our Workers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${Style.availability}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 p-4">
              <div className={`${Style.inner}`}>
                <p className={` ${Style.pHeader} mb-5 text-light`}>
                  PRIVATE & INDIVIDUALIZED <br /> ADDITIONAL REQUESTS FOR MORE
                  TIME AND <br /> EFFICIENT AND EFFECTIVE QUALITY{" "}
                </p>
                <p className={`${Style.para} mb-5`}>
                  Our workplace, located right in the heart of the dynamic
                  cityscape, stands out as the top <br /> notch choice for
                  customized solutions to meet the demands of our expanding
                  team. Our <br /> proactive approach to workforce enhancement
                  places a strong emphasis on identifying the <br /> need for
                  additional slots, understanding it as the core solution to
                  accommodate the growing talent and workload.{" "}
                </p>
                <p className={`${Style.para} mb-2 mt-3`}>
                  Whether you are seeking treatment for yourself or for a loved
                  one, we encourage you to <br /> take the first step toward
                  true healing and reach out to us today
                </p>
              </div>
            </div>
            <div className="col-md-6 p-2">
              <div className={`${Style.outer} p-4`}>
                <h1 className="text-center mb-3 text-light">Available Dates</h1>
                <form onSubmit={formik.handleSubmit}>
                  <div className="d-flex justify-content-between mb-3">
                    <div className={`${Style.w48}`}>
                      <input
                        type="text"
                        className={`form-control w-100  ${Style.inputPadding} ${
                          formik.touched.firstName && formik.errors.firstName
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="First Name..."
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <div className="invalid-feedback">
                          {formik.errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className={`${Style.w48}`}>
                      <input
                        type="text"
                        className={`form-control w-100 ${Style.inputPadding}  ${
                          formik.touched.lastName && formik.errors.lastName
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Last Name..."
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <div className="invalid-feedback">
                          {formik.errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className={`form-control w-100  ${Style.email}  ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder=" Enter your e-mail"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="tel"
                      className={`form-control w-100 ${Style.email} ${
                        formik.touched.phone && formik.errors.phone
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter your phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="invalid-feedback">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 d-flex justify-content-between col-md-12">
                    <div className="col-md-6 p-1">
                      <div className="d-flex">
                        <select
                          className={`form-control w-75 me-2 ${
                            formik.touched.selectedDay &&
                            formik.errors.selectedDay
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.selectedDay}
                          onChange={(e) => {
                            formik.handleChange(e);
                            handleDropdownChange(e);
                          }}
                          name="selectedDay"
                        >
                          <option value="">Select Day</option>
                          <option value="0">Sunday</option>
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                          <option value="6">Saturday</option>
                        </select>
                        {formik.touched.selectedDay &&
                          formik.errors.selectedDay && (
                            <div className="invalid-feedback">
                              {formik.errors.selectedDay}
                            </div>
                          )}
                        <input
                          type="date"
                          className={`w-25 form-control ${
                            formik.touched.selectedDate &&
                            formik.errors.selectedDate
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.selectedDate}
                          onChange={(e) => {
                            formik.handleChange(e);
                            handleDateChange(e);
                          }}
                          name="selectedDate"
                        />
                        {formik.touched.selectedDate &&
                          formik.errors.selectedDate && (
                            <div className="invalid-feedback">
                              {formik.errors.selectedDate}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-md-3 p-1">
                      <div>
                        <select
                          className={`form-control w-100 ${
                            formik.touched.firstInputValue &&
                            formik.errors.firstInputValue
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.firstInputValue}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "firstInputValue",
                              e.target.value
                            )
                          }
                          name="firstInputValue"
                        >
                          <option value="">Start hour</option>
                          {hoursArray.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour < 10 ? `0${hour}` : hour}:00
                            </option>
                          ))}
                        </select>
                        {formik.touched.firstInputValue &&
                          formik.errors.firstInputValue && (
                            <div className="invalid-feedback">
                              {formik.errors.firstInputValue}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-md-3 p-1">
                      <div>
                        <select
                          className={`form-control w-100 ${
                            formik.touched.secondInputValue &&
                            formik.errors.secondInputValue
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formik.values.secondInputValue}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "secondInputValue",
                              e.target.value
                            )
                          }
                          name="secondInputValue"
                        >
                          <option value="">End hour</option>
                          {hoursArray.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour < 10 ? `0${hour}` : hour}:00
                            </option>
                          ))}
                        </select>
                        {formik.touched.secondInputValue &&
                          formik.errors.secondInputValue && (
                            <div className="invalid-feedback">
                              {formik.errors.secondInputValue}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="bg-light text-dark btn bolding w-100 fs-4"
                    >
                      Submit Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${Style.trash}`}>
        <div className="row">
          <div className="col-md-12">
            <div className={` ${Style.headingInner}  text-center`}>
              <h1 className={` ${Style.cinzel}`}>
                KEYWORD RICH STATEMENT HERE ABOUT BEST WORKERS
              </h1>
            </div>
          </div>
        </div>
        <div className="row mt-5 p-4">
          <div className="col-md-4 p-2">
            <div className={` ${Style.cardKey}`}>
              <div
                className={`w-50 highText text-center  text-white rounded-4 py-5 mb-5  ${Style.mainBackGorund} fs-3`}
              >
                <FaBolt />
              </div>
              <h3 className="text-dark fw-bolder mb-5 px-3">efficiency</h3>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center justify-content-center mx-3">
                  <i
                    className={`fa-solid fa-check-double fs-4 ${Style.mainColor}`}
                  ></i>
                </div>
                <div>
                  <p className={`fw-bolder  ${Style.para2}`}>
                    We are the best in efficiency. Our team of highly skilled
                    and trained professionals will work tirelessly We are the
                    best in efficiency
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center justify-content-center mx-3">
                  <i
                    className={`fa-solid fa-check-double fs-4 ${Style.mainColor}`}
                  ></i>
                </div>
                <div>
                  <p className={`fw-bolder  ${Style.para2}`}>
                    98% customer satisfaction rate, you can trust us with your
                    project Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Et, numquam!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 p-2">
            <div className="cardKey">
              <div
                className={`w-50 highText text-center  text-white rounded-4 py-5 mb-5  ${Style.mainBackGorund} fs-3`}
              >
                <FaHourglass />
              </div>
              <h3 className="text-dark fw-bolder mb-5 px-3">Time Managment</h3>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center justify-content-center mx-3">
                  <i
                    class={`fa-solid fa-check-double fs-4 ${Style.mainColor}`}
                  ></i>
                </div>
                <div>
                  <p className={`fw-bolder  ${Style.para2}`}>
                    We are the best in efficiency. Our team of highly skilled
                    and trained professionals will work tirelessly We are the
                    best in efficiency
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 p-2">
            <div className="cardKey">
              <div
                className={`w-50 highText text-center  text-white rounded-4 py-5 mb-5  ${Style.mainBackGorund} fs-3`}
              >
                <FaBullseye />
              </div>
              <h3 className="text-dark fw-bolder mb-5 px-3">Target</h3>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center justify-content-center mx-3">
                  <i
                    className={`fa-solid fa-check-double fs-4 ${Style.mainColor}`}
                  ></i>
                </div>
                <div>
                  <p className={`fw-bolder  ${Style.para2}`}>
                    We are the best in efficiency. Our team of highly skilled
                    and trained professionals will work tirelessly We are the
                    best in efficiency
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center justify-content-center mx-3">
                  <i
                    className={`fa-solid fa-check-double fs-4 ${Style.mainColor}`}
                  ></i>
                </div>
                <div>
                  <p className={`fw-bolder  ${Style.para2}`}>
                    98% customer satisfaction rate, you can trust us with your
                    project Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Et, numquam!
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center justify-content-center mx-3">
                  <i
                    className={`fa-solid fa-check-double fs-4 ${Style.mainColor}`}
                  ></i>
                </div>
                <div>
                  <p className={`fw-bolder  ${Style.para2}`}>
                    98% customer satisfaction rate, you can trust us with your
                    project Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Et, numquam!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Availability;
