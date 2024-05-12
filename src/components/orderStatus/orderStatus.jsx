import React, { useState,useEffect } from "react";
import Style from "./orderStatus.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function Box() {
  const [first, setfirst] = useState(false);
  const textColor = first ? "black" : "white";
  const location = useLocation();
  const orderId = location.state || "";
  console.log(orderId);

  return (
    <>
    <section className={` ${Style.service} mb-1`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center align-items-center bg-body-secondary p-3 rounded">
              <div className="col-md-8">
                <div>
                  <h2 style={{ color: 'black' }}>Paied: </h2>
                  <p className={`mt-4 lead`} style={{ color: 'black' }}>
                    "Paid , The Customer paied successfuly for the order. "
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div>
                  <button
                    className="btn rounded-pill p-2 fs-2"
                    style={{ color: 'black' }}
                  >
                    Paid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={` ${Style.service} mb-1`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center align-items-center bg-body-secondary p-3 rounded">
              <div className="col-md-8">
                <div>
                  <h2 style={{ color: 'black' }}>Started: </h2>
                  <p className={`mt-4 lead`} style={{ color: 'black' }}>
                    "In the Started statge in order status means that the worker started the order to complete your order today ."
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div>
                  <button
                    className="btn rounded-pill p-2 fs-2"
                    style={{ color: textColor }}
                  >
                    Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={` ${Style.service} mb-1`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center align-items-center bg-body-secondary p-3 rounded">
              <div className="col-md-8">
                <div>
                  <h2 style={{ color: 'black' }}>preparing: </h2>
                  <p className={`mt-4 lead`} style={{ color: 'black' }}>
                    "In the preparing stage of an order status, The worker is preparing the tools and the needed things to complete your order."
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div>
                  <button
                    className="btn rounded-pill p-2 fs-2"
                    style={{ color: textColor }}
                  >
                    Preparing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={` ${Style.service} mb-1`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center align-items-center bg-body-secondary p-3 rounded">
              <div className="col-md-8">
                <div>
                  <h2 style={{ color: 'black' }}>On the way: </h2>
                  <p className={`mt-4 lead`} style={{ color: 'black' }}>
                    "In the on the way stage of an order status, The worker is on the way to the address provided yo complete the order"
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div>
                  <button
                    className="btn rounded-pill p-2 fs-2"
                    style={{ color: textColor }}
                  >
                    On the Way
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={` ${Style.service} mb-1`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center align-items-center bg-body-secondary p-3 rounded">
              <div className="col-md-8">
                <div>
                  <h2 style={{ color: 'black' }}> In progress: </h2>
                  <p className={`mt-4 lead`} style={{ color: 'black' }}>
                    "In the in progress stage of an order status, The worker is at the address provided and is fulfilling your needes ."
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div>
                  <button
                    className="btn rounded-pill p-2 fs-2"
                    style={{ color: textColor }}
                  >
                    In progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={` ${Style.service} mb-1 pb-5`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center align-items-center bg-body-secondary p-3 rounded">
              <div className="col-md-8">
                <div>
                  <h2 style={{ color: 'black' }}>Completed: </h2>
                  <p className={`mt-4 lead`} style={{ color: 'black' }}>
                    "In the Completed stage of an order status, The Order is Done."
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div>
                  <button
                    className="btn rounded-pill p-2 fs-2"
                    style={{ color: textColor }}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}