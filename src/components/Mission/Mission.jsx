import React from "react";
import Style from "./Mission.module.css";

export default function Mission() {
  return (
    <>
      <div>
        <section className={` ${Style.mission} `}>
          <div className="container">
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <h2 className={`text-center my-4  ${Style.bolding} `}>
                  Our Mission
                </h2>
                <p
                  className={`text-center my-4 fs-6  ${Style.para} text-white `}
                >
                  Our mission at Sarvicny is to provide convenient, reliable,
                  and high-quality services to our customers. We believe that
                  everyone deserves easy access to skilled workers, and we are
                  committed to making that a reality. Join us in simplifying
                  your life and enjoying the peace of mind that comes from
                  knowing your needs are in good hands.
                </p>
                <div className="d-flex justify-content-center mt-5">
                  <button className="btn btn-light mx-2  fs-5">
                    Home maintenance
                  </button>
                  <button className="btn btn-light fs-5">Car</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container p-5">
            <div className="row border-bottom border-1 border-black">
              <div className="col-md-4 mb-4">
                <div className="d-flex justify-content-center border-end border-1 border-black ">
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <h4 className={`text-center mb-0 mx-2 ${Style.texto} `}>
                    Secure Payment
                  </h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-center border-end border-1 border-black">
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-truck"></i>
                  </div>
                  <h4 className={`text-center mb-0 mx-2 ${Style.texto} `}>
                    Express Shipping
                  </h4>
                </div>
              </div>
              <div className="col-md-4 my-md-0 my-4 ">
                <div className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-right-left"></i>
                  </div>
                  <h4 className={`text-center mb-0 mx-2 ${Style.texto} `}>
                    Free Return
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="p-4">
                  <h3 className="text-black">Sarvicny</h3>
                  <p className={`lead my-4 ${Style.sPara} `}>
                    Thank you for choosing Sarvicny. Stay up-to-date with our
                    latest news and promotions by following us on social media.
                  </p>
                  <div className="d-flex mt-4">
                    <div className="d-flex justify-content-center align-items-center mx-2">
                      <i className="fa-brands fa-instagram"></i>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mx-2">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mx-2">
                      <i className="fa-brands fa-pinterest"></i>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mx-2">
                      <i className="fa-brands fa-twitter"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-4">
                  <h3 className="mb-3 text-black">Shop</h3>
                  <h5 className={`my-3 ${Style.coloro} `}>car</h5>
                  <h5 className={`my-3 ${Style.coloro} `}>mobile</h5>
                  <h5 className={` ${Style.coloro} `}>maintenance</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-4">
                  <h3 className="mb-3 text-black">About</h3>
                  <h5 className={`my-3 ${Style.coloro} `}>Home</h5>
                  <h5 className={`my-3 ${Style.coloro} `}>Contact</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-4">
                  <h3 className="mb-3 text-black">Need Help?</h3>
                  <h5 className={`my-3 ${Style.coloro} `}>Shop</h5>
                  <h5 className={`my-3 ${Style.coloro} `}>Cart</h5>
                  <h5 className={`my-3 ${Style.coloro} `}>Checkout</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
