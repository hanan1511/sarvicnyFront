import React, { useState, useEffect } from "react";
import Style from "./Checkout.module.css";
import Mission from "../Mission/Mission.jsx";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { PaypalCheckoutButton } from "../PaypalCheckoutButton.js";
export default function Checkout() {
  let {state} = useLocation();
  console.log(state);
  const [data, setData] = useState(null);
  console.log("id",state.userId);
  const [error, setError] = useState(null);
  const [summtion, setSum] = useState(0);
  
  useEffect(() => {
    getCart();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (data) {
      const totalSum = data.reduce((acc, curr) => acc + curr.price, 0);
      
      setSum(totalSum);
    }
  }, [data]);

  async function getCart() {
    const response = await axios.get(
      `https://localhost:7188/api/Customer/getCart?customerId=${state.userId}`
    );
    if (!response.data.isError) {
      console.log(response.data.payload);
      setData(response.data.payload.requestedServices);
    }
  }

  async function handelPay() {
    const respone = await axios
      .post(`https://localhost:7188/api/Customer/orderCart?customerId=${state.userId}&paymentMethod=Paymob`)
      .catch((err) => {
        setError(err.response.data.message);
      });
    if (respone) {
      console.log(respone);
      window.location.href = respone.data.payload.paymentUrl;
    }
  }

  // useEffect(() => {
  //   getCart();
  // }, []);

  return (
    <>
      <section className={`p-5 ${Style.services}`}>
        <div className="container bg-white p-5 rounded-2">
          <div className="row">
            <div className="col-md-12 mb-5">
              <div>
                <h1 className="text-center">Checkout</h1>
              </div>
              {error == null ? (
                ""
              ) : (
                <div className="alert alert-danger">{error}</div>
              )}
            {/* </div>
            <div className="col-md-6">
              <div>
                <h4 className="my-3 p-2 fs-2">Biling Details</h4>
              </div>
              <div className="d-flex ">
                <div className="col-md-6 p-2">
                  <input
                    type="text"
                    className={` form-control border-1 border border-black ${Style.formo}`}
                    placeholder="First Name *"
                  />
                </div>
                <div className="col-md-6 p-2">
                  <input
                    type="text"
                    className={` form-control border-1 border border-black ${Style.formo}`}
                    placeholder="Last Name *"
                  />
                </div>
              </div>
              <div className="col-md-12 p-2">
                <input
                  type="text"
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  placeholder="Company Name (optional)"
                />
              </div>
              <div className="col-md-12 p-2">
                <select
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  id="countrySelect"
                  name="country"
                >
                  <option value="" selected disabled>
                    country / Region *
                  </option>
                  <option value="afghanistan">Afghanistan</option>
                  <option value="albania">Albania</option>
                  <option value="zimbabwe">Zimbabwe</option>
                </select>
              </div>
              <div className="col-md-12 p-2">
                <input
                  type="text"
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  placeholder="House number and street name "
                />
              </div>
              <div className="col-md-12 p-2">
                <input
                  type="text"
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />
              </div>
              <div className="col-md-12 p-2">
                <input
                  type="text"
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  placeholder="Town / City *"
                />
              </div>
              <div className="col-md-12 p-2">
                <select
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  id="countrySelect"
                  name="country"
                >
                  <option value="" selected disabled>
                    state *
                  </option>
                  <option value="elsayedaZeinb">elsayeda zeinb</option>
                  <option value="elmaadi">elmaadi</option>
                  <option value="elmo2tm">elmo2tm</option>
                </select>
              </div>
              <div className="col-md-12 p-2">
                <input
                  type="text"
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  placeholder="ZIP *"
                />
              </div>
              <div className="col-md-12 p-2">
                <input
                  type="tel"
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  placeholder="Phone*"
                />
              </div>
              <div className="col-md-12 p-2">
                <input
                  type="email"
                  className={` form-control border-1 border border-black ${Style.formo}`}
                  placeholder="Email Address*"
                />
              </div>*/}
            </div> 
            <div className="col-md-6">
              <div>
                <h4 className="my-3 p-2 fs-2">Your Order</h4>
              </div>

              <div className={`mb-3 ${Style.orderDetails}`}>
                <div
                  className={`d-flex justify-content-between align-items-center p-4 fs-2  ${Style.bottomBorder}`}
                >
                  <h3 className="fw-bolder">Product</h3>
                  <h3 className="fw-bolder">Subtotal</h3>
                </div>
                {data && (
                  <>
                    {data.map((ele) => (
                      
                      <div
                        className={`d-flex justify-content-between align-items-center p-4  ${Style.bottomBorder}`}
                      >
                        <h3>{ele.serviceName}</h3>
                        <h3>{ele.price} EGP</h3>
                      </div>
                    ))}
                  </>
                )}
                {/* <div
                  className={d-flex justify-content-between align-items-center p-4  ${Style.bottomBorder}}
                >
                  <h3>mobile maintaining</h3>
                  <h3>$142.00</h3>
                </div>
                <div
                  className={d-flex justify-content-between align-items-center p-4  ${Style.bottomBorder}}
                >
                  <h3>Shipping</h3>
                  <h3>
                    flat_rate: <br /> $15.00
                  </h3>
                </div> */}
                <div
                  className={`d-flex justify-content-between align-items-center p-4  ${Style.bottomBorder}`}
                >
                  <h3 className="fw-bolder">Total</h3>
                  <h3 className="fw-bolder">{summtion}</h3>
                </div>
              </div>
              {/* <div className="border border-1 border-black p-4 rounded-1 mb-3">
                <h4
                  className="text-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span className="text-dark">Have a coupon? </span>
                  Click here to enter your <br /> coupon code
                  <div className="collapse" id="collapseExample">
                    <div className="card card-body mt-4 border-0">
                      <form>
                        <div className="mb-3">
                          <label
                            for="couponInput"
                            className="form-label text-dark"
                          >
                            If you have a coupon code, please apply it <br />{" "}
                            below.
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="couponInput"
                            placeholder="Enter your coupon code"
                          />
                        </div>
                        <button
                          type="button"
                          className="btn rounded-0 text-dark bg-light fw-bolder"
                        >
                          Apply
                        </button>
                      </form>
                    </div>
                  </div>
                </h4>
              </div>
              <div className="mb-3">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button bg-body-tertiary ${Style.butno}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Direct bank transfer
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button bg-body-tertiary collapsed ${Style.butno}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Check payments
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Please send a check to Store Name, Store Street, Store
                        Town, Store State / County, Store Postcode.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button bg-body-tertiary collapsed ${Style.butno}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Cash on delivery
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Pay with cash upon delivery.
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="mb-3">
                <button
                  className="bg-black text-white btn rounded-1 w-100 fw-bolder"
                  onClick={() => {
                    handelPay();
                  }}
                >
                  Pay by Paymob
                </button>

                <button className="bg-black text-white btn rounded-1 w-100 fw-bolder mt-2 mb-2">
                  Pay Cash
                </button>
              </div>
              {console.log(state.product)}
              <div>
                <PaypalCheckoutButton id="paypal-button" product={state.product} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Mission />
          
    </>
  );
}
