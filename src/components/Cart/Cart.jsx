import React ,{useEffect,useState}from "react";
import Style from "./Cart.module.css";
import Mission from "../Mission/Mission.jsx";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from"../context/AppContext";
export default function Cart() {
  const [data,setData]=useState(null);
  let { state } = useLocation();
  const [userId,setUserId] = useState();
  const navigate = useNavigate();
  const [product,setProduct]=useState({description:"service",price:0})
  //http://localhost:3000/
  //const { userId, setUserId } = useAppContext();

//const cutomerID="0b6fba5d-d77f-4861-9799-899446cfd711";
const [summtion,setSum]=useState(0);
console.log(userId);

useEffect(()=>{
    
  const storedUser = localStorage.getItem('userId');
  if (storedUser) {
    setUserId(JSON.parse(storedUser));
    getCart(JSON.parse(storedUser));
  }
  
},[]);

useEffect(() => {
  if (data) {
    const totalSum = data.reduce((acc, curr) => acc + curr.price, 0);
    setProduct({ description: "service", price: totalSum });
    setSum(totalSum);
  }
}, [data]);

async function getCart(userId){
  console.log("in get cart",userId);
  const response = await axios.get(`https://localhost:7188/api/Customer/getCart?customerId=${userId}`);
  if(!response.data.isError){
    setData(response.data.payload.requestedServices);
  }
}

  async function remove(id){
    const response= await axios.post(`https://localhost:7188/api/Customer/removeFromCart?customerId=${userId}&requestId=${id}`);
    if(!response.data.isError){
      alert("the order removed from the cart");
      window.location.reload();
    }
  }
  function handelDelete(id){
    remove(id);
  }


  function handelButton(){
    navigate('/checkout',{state:{userId:userId,product:product}});
  }
  return (
    <>
      <section className={`p-5 ${Style.services}`}>
        <div className="container bg-white p-5 rounded-2">
          <div className="row">
            <div className="col-md-12 mb-5">
              <div>
                <h1 className={`text-center ${Style.text1}`}>Cart</h1>
              </div>
            </div>
            {console.log(data)}
            {data&&
            <div className="row">
              <div className="col-md-8 ">  
                <div className={`rounded-1 ${Style.bordero}`}>
                  <div
                    className={`d-flex justify-content-evenly  p-3 ${Style.bgColor}`}
                  >
                    <h3 className={`${Style.text3}`}>Service</h3>
                    <h3 className={`${Style.text3}`}>Provider</h3>
                    <h3 className={`${Style.text3}`}>Price</h3>
                    <h3 className={`${Style.text3}`}>Action</h3>
                  </div>
                  {data.map((ele) => (
                    <div className="d-flex justify-content-evenly bg-white  p-3 rounded-1" key={ele.serviceRequestID}>
                      <h3 className={`${Style.text3}`}>{ele.serviceName}</h3>
                      <h3 className={`${Style.text3}`}>{ele.firstName}</h3>
                      <h3 className={`${Style.text3}`}>{ele.price}</h3>
                      <h3 className={`${Style.text3}`}>
                        <button className="border-0 rounded-1" onClick={() => handelDelete(ele.serviceRequestID)}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </h3>
                    </div>  
                  ))}
                </div>
              </div>
              <div className="col-md-4">
                <div className={`rounded-1 ${Style.bordero}`}>
                  <div className={`p-4 ${Style.bgColor}`}>
                    <h2 className="text-black">Cart Totals</h2>
                  </div>
                  <div
                    className={`p-3 d-flex justify-content-between bg-white ${Style.bottomBorder}`}
                  >
                    <p className={`${Style.text3}`}>Subtotal</p>
                    <span className={`${Style.text3}`}>{summtion}</span>
                  </div>
                  <div className={`p-3 d-flex justify-content-between bg-white`}>
                    <p className={`${Style.text3}`}>Total</p>
                    <span className={`${Style.text3}`}>{summtion}</span>
                  </div>
                  <div className="bg-white p-3">
                    <button className="btn rounded-1 bg-black text-white fw-bolder w-100" onClick={()=>handelButton()}>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
            </div>
            </div>
            }

          </div>
        </div>
      </section>
      <Mission/>
    </>
  );
}
