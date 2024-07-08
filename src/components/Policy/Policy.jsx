import React, { useState, useEffect } from "react";
import "./Policy.module.css";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Mission from "../Mission/Mission.jsx";

export default function Policy() {
  return (
    <>
      <section class="servicebgColor py-5">
        <div class="container rounded-2 py-5 bg-white">
          <div class="flex justify-content-center align-items-center ">
            <h1 class="text-center">Our Policy</h1>
          </div>
          <div class="mt-5 fs-5">
            <p>
              - If you canceled your order in the day of execution , You will
              not refunded
            </p>
          </div>
          <div class="mt-5 fs-4">
            <p>
              - If you canceled your order the day before execution , You will
              be refunded with 50%
            </p>
          </div>
          <div class="mt-5 fs-4">
            <p>
              - If you canceled your order two days or more before execution ,
              You will be refunded with 100%
            </p>
          </div>
          <div class="mt-5 fs-4">
            <p>
              - If the provider canceled you will be refunded with 100% unless
              you accept another reassigned worker
            </p>
          </div>
        </div>
      </section>
      <Mission />
    </>
  );
}
