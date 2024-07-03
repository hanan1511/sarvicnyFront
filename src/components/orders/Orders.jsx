import { useState,useEffect } from "react";
import  Style  from "./Orders.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from"../context/AppContext";
import FeedbackForm from "../Feedback/FeedbackForm";
export function OrdersCust(){
    const [data,setData]=useState(null);
    const navigate= useNavigate();
    const [error,setError]=useState(null);
    const  userId  = localStorage.getItem('userId');
    //const id ="0b6fba5d-d77f-4861-9799-899446cfd711";
    async function getOrders(){
        const response = await axios.get(`https://localhost:7188/api/Customer/getCustomerOrdersLog/${userId}`)
        .catch((err)=>(
            console.log(err.response.data.message)
        ));
        
        if(response){
            if(!response.data.isError){
                setData(response.data.payload);
                console.log(response.data.payload);
            }
        }
    }
    async function handelDone(id){
        const resp = await axios.post(`https://localhost:7188/api/Customer/MarkOrderComplete/${id}`).catch((err) => {
            setError(err.response.data.message);
            console.log(err);
        });
        if(resp){
            window.alert("you have marked the order done");
        }
    }
    function handelDelete(id){
        navigate("/status",{state:userId});
    }
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    useEffect(()=>{
        getOrders();
    },[]);
    return(
        <>
        <div className={`container ${Style.cont} py-5`}>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mb-1">Orders</h1>
                </div>
                {error == null ? '' : <div className="alert alert-danger col-md-12">{error}</div>}
            <div className="col-md-12"> 
            
                <div className={`rounded-1 ${Style.bordero}`}>
                  <div
                    className={`d-flex justify-content-evenly  p-3 ${Style.bgColor}`}
                  >
                    <h3 className={` ${Style.text3}`}>Service</h3>
                    <h3 className={`${Style.text3}`}>Provider</h3>
                    <h3 className={`${Style.text3}`}>Price</h3>
                    <h3 className={` ${Style.text3}`}>Requsted Date</h3>
                    <h3 className={` ${Style.text3}`}>Time</h3>
                    <h3 className={` ${Style.text3}`}>Problem</h3>
                    <h3 className={` ${Style.text3}`}>Status</h3>
                    <h3 className={` ${Style.text3}`}>Action</h3>

                  </div>
                  {data&&
                        data.map((elem)=>(
                            <div className="d-flex justify-content-evenly bg-white  p-3 rounded-1" key={elem.serviceRequestID}>
                                <h3 className={`${Style.text3}`}>{elem.orderService[0].parentServiceName}</h3>
                                <h3 className={`${Style.text3}`}>{elem.providerFN}</h3>
                                <h3 className={`${Style.text3}`}>{elem.orderPrice}</h3>
                                <h3 className={`${Style.text3}`}>{formatDate(elem.requestedDay)}</h3>
                                <h3 className={`${Style.text3}`}>{elem.startTime}</h3>
                                <h3 className={`${Style.text3}`}>{elem.problem}</h3>
                                <h3 className={`${Style.text3}`}>{elem.orderStatus}</h3>
                                { elem.orderStatus=="Done"? 
                                <h3 className={`${Style.text3}`}>
                                    <button className={`border bg-primary rounded-1 ${Style.but} p-1`} onClick={() => handelDone(elem.orderId)}>
                                        mark done 
                                    </button>
                                </h3>:<></>
                                }
                                { elem.orderStatus=="Completed"? 
                                <h3 className={`${Style.text3}`}>
                                    <button className={`border bg-primary rounded-1 ${Style.but} p-1`}>
                                        <FeedbackForm orderid={elem.orderId}/> 
                                    </button>
                                    
                                </h3>:<></>
                                }

                            </div>
                            // elem.payload.orderService?
                            //     elem.payload.orderService.map((ele) => (
                            //         <div className="d-flex justify-content-evenly bg-white  p-3 rounded-1" key={ele.serviceRequestID}>
                            //             <h3 className={`${Style.text3}`}>{ele.serviceName}</h3>
                            //             <h3 className={`${Style.text3}`}>{ele.firstName}</h3>
                            //             <h3 className={`${Style.text3}`}>{ele.price}</h3>
                            //             <h3 className={`${Style.text3}`}>{ele.startTime}</h3>
                            //             <h3 className={`${Style.text3}`}>Paid</h3>
                            //             <h3 className={`${Style.text3}`}>
                            //             <button className={`border bg-primary rounded-1 ${Style.but} p-1`} onClick={() => handelDelete(ele.id)}>
                            //                 Details
                            //             </button>
                            //             </h3>
                            //         </div>  
                              //  ))
                                //:""
                            ))
                        }
                </div>
              </div>
            </div>
        </div>
        </>
    );
}