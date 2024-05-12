import React from "react";
import { PaypalCheckoutButton } from "../PaypalCheckoutButton.js";

export default function Payment() {
  const product = {
    description: "Design+Code React Hooks Course",
    price: 19,
  };
  return (
    <>
      <div className="">
        <PaypalCheckoutButton id="paypal-button" product={product} />
      </div>
    </>
  );
}
