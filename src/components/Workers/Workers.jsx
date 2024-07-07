import React, { useState, useEffect } from "react";
import Style from "./Workers.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Swal from 'sweetalert2';

const Employees = () => {
  let { state } = useLocation();
  const serviceIds = state?.services?.map(service => service.childServiceID) || [];
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [workerPrices, setWorkerPrices] = useState({});
  const [selectedDate, setselectedDate] = useState(new Date());
  const [district, setDistrict] = useState([]);

  async function addCart(values) {
    try {
      const response = await axios.post(`https://localhost:7188/api/Customer/addtocart?customerId=${userId}`, values);
      if (!response.data.isError) {
        setOrder(response.data.payload);
        navigate('/cart', { state: { order: response.data.payload, id: userId } });
      } else {
        console.log(response.data.errors[0]);
      }
    } catch (error) {
      if (error.response) {
        console.log("Error data:", error.response.data);
      }
    }
  }

  async function getDistricts() {
    const resp = await axios.get(`https://localhost:7188/api/District/getAllAvailableDistricts`);
    setDistrict(resp.data.payload);
  }

  useEffect(() => {
    getDistricts();
  }, []);

  const handleDayChange = (event) => {
    const selectedDayOfWeek = event.target.value;
    setSelectedDay(selectedDayOfWeek);
  };

  const handleSlotChange = (event) => {
    const selectedTimeSlot = event.target.value;
    setSelectedSlot(selectedTimeSlot);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);
  };

  async function handelButton(worker) {
    if (userId) {
      Swal.fire({
        title: 'Do you want to add a different address?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Enter your new address:',
            input: 'text',
            inputLabel: 'New Address',
            inputPlaceholder: 'Enter your new address',
            showCancelButton: true,
          }).then((addressResult) => {
            if (addressResult.isConfirmed && addressResult.value) {
              const values = {
                providerId: worker.providerId,
                serviceIDs: serviceIds,
                slotID: worker.slotId,
                districtID: selectedDistrict,
                requestDay: selectedDate,
                problemDescription: state.desc,
                address: addressResult.value
              };
              console.log(values);
              addCart(values);
            }
          });
        } else if (result.isDenied) {
          const values = {
            providerId: worker.providerId,
            serviceIDs: serviceIds,
            slotID: worker.slotId,
            districtID: selectedDistrict,
            requestDay: selectedDate,
            problemDescription: state.desc,
          };
          console.log(values);
          addCart(values);
        }
      });
    } else {
      alert("user ID is not found please login first");
      navigate("/loginCustomer");
    }
  }

  async function filterWorkers(dayOfWeek, timeSlot, district) {
    if (timeSlot && dayOfWeek) {
      const values = {
        services: serviceIds,
        startTime: timeSlot,
        dayOfWeek: dayOfWeek,
        customerId: userId,
        ...(district && { districtId: district })
      };
      console.log("data", values);
      const resp = await axios.post(`https://localhost:7188/api/Customer/getAllMatchedProviderSortedbyFav`, values);
      if (!resp.isError) {
        console.log(resp);

        const workers = resp.data.payload;
        setFilteredWorkers(workers);
        calculateWorkerPrices(workers);
      }
    }
  }

  const calculateWorkerPrices = async (workers) => {
    let prices = {};
    for (let worker of workers) {
      let sum = 0;
      for (let serviceprice of worker.services) {
        sum += serviceprice.price;
      }
      prices[worker.providerId] = sum;
    }
    setWorkerPrices(prices);
  }

  const handleDateChange = (date) => {
    if (date) {
      const localDate = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS');
      const isoDate = `${localDate}Z`;
      setselectedDate(isoDate);
      console.log(isoDate);
      const dayOfWeek = moment(date).format('dddd');
      setSelectedDay(dayOfWeek);
    } else {
      setSelectedDay('');
    }
  };

  const iconsData = [
    <i className="fa-solid fa-globe"></i>,
    <i className="fa-solid fa-landmark"></i>,
    <i className="fa-regular fa-comment-dots"></i>,
    <i className="fa-solid fa-headphones"></i>,
    <i className="fa-solid fa-truck-fast"></i>,
    <i className="fa-solid fa-credit-card"></i>,
    <i className="fa-solid fa-award"></i>,
    <i className="fa-solid fa-hands"></i>,
    <i className="fa-solid fa-medal"></i>,
  ];

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconsData.length);
    return iconsData[randomIndex];
  };

  return (
    <>
      <section className={`p-5 ${Style.services} `}>
        <div className="container bg-white p-5 rounded-2">
          <div className="row g-4">
            <div className="col-md-12 mb-3">
              <div>
                <h2>
                  <span className="fw-bolder">Workers</span> of {state?.name}
                </h2>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="selectdate" className="form-label">
                Select Date:
              </label>
              <br/>
                <DatePicker
                  id = "selectdate"
                  className="form-select col-md-3 mb-3"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="dayFilter" className="form-label">
                Filter by Day:
              </label>
              <select
                id="dayFilter"
                className="form-select"
                value={selectedDay}
                onChange={handleDayChange}
              >
                <option value="">Select a Day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="slotFilter" className="form-label">
                Filter by Time Slot:
              </label>
              <select
                id="slotFilter"
                className="form-select"
                value={selectedSlot}
                onChange={handleSlotChange}
              >
                <option value="">Select a Time Slot</option>
                <option value="07:00:00">7:00 AM</option>
                <option value="08:00:00">8:00 AM</option>
                <option value="09:00:00">9:00 AM</option>
                <option value="10:00:00">10:00 AM</option>
                <option value="11:00:00">11:00 AM</option>
                <option value="12:00:00">12:00 PM</option>
                <option value="13:00:00">1:00 PM</option>
                <option value="14:00:00">2:00 PM</option>
                <option value="15:00:00">3:00 PM</option>
                <option value="16:00:00">4:00 PM</option>
                <option value="17:00:00">5:00 PM</option>
                <option value="18:00:00">6:00 PM</option>
                <option value="19:00:00">7:00 PM</option>
                <option value="20:00:00">8:00 PM</option>
                <option value="21:00:00">9:00 PM</option>
                <option value="22:00:00">10:00 PM</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="districtFilter" className="form-label">
                Filter by District:
              </label>
              <select
                id="districtFilter"
                className="form-select"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">Select a District</option>
                {district && district.map((distric) => (
                  <option key={distric.districtID} value={distric.districtID}>
                    {distric.districtName}
                  </option>
                ))}
              </select>
            </div>
            {selectedDay && selectedSlot ? (
              <div className="col-md-3 mb-3">
                <button className="btn btn-primary" onClick={() => filterWorkers(selectedDay, selectedSlot, selectedDistrict)}>See Workers</button>
              </div>
            ) : <></>}
            {filteredWorkers.map((worker) => (
              <div className="col-md-4" key={worker.providerId}>
                <div className="border-1 border-black border p-3 rounded-2 h-100 position-relative">
                  <div className="text-center fs-1 mb-4">{getRandomIcon()}</div>
                  <i className="position-absolute top-0 end-0 p-2 fa fa-star text-warning" aria-hidden="true"></i>
                  <div className="d-flex mb-1">
                    <h5>First name:</h5>
                    <h5>{worker.firstname}</h5>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <h5>Last name:</h5>
                    <h5>{worker.lastname}</h5>
                  </div>
                  <div className="d-flex">
                    <h5>Email: </h5>
                    <h5>{worker.email}</h5>
                  </div>
                  <div className="d-flex">
                    <h5>Total Price of services: </h5>
                    <h5>{workerPrices[worker.providerId] || 'Loading...'}</h5>
                  </div>
                  <div className="col-md-12">
                    <button className="btn bg-black text-white fw-bolder text-center w-100 position-relative" onClick={() => handelButton(worker)}>
                      Hire this worker!
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Employees;
