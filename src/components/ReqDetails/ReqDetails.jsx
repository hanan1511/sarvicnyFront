import Style from "./ReqDetails.module.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { querySelector } from "@syncfusion/ej2/maps";
function ReqDetails(){
    const [error, seterror] = useState(null);
    const [IsApro, setIsApro] = useState(false);
    const [order,setOrder]=useState(null);
    const [loading,setLoading]=useState(true);
    const[cancel,setCancel]=useState(false);
    const [complet,setComplete]=useState(false);
    const location = useLocation();
    let navigate = useNavigate();
    let id = location.state?.id || "";
    console.log(id);
    const [buttonStates, setButtonStates] = useState({
        button1: false,
        button2: true,
        button3: true,
        button4: true,
        button5: true,
      });
      const [circleStates, setCircleStates] = useState({
        circle1: true,
        circle2: true,
        circle3: true,
        circle4: true,
        circle5: true,
      });
      const doneHandel=()=>{
        setButtonStates({button1:true,button2:true,button3:true,button4:true,button5:true});
        setCircleStates({circle1: false,
            circle2: false,
            circle3: false,
            circle4: false,
            circle5: false,});
            setComplete(true);
    }
      const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7188/api/ServiceProvider/ShowOrderDetails?orderId=${id}`
            );
            console.log(response.data);
            const flatorder ={
                orderId: response.data.payload.orderId,
                customerId: response.data.payload.customerId,
                customerFN: response.data.payload.customerFN,
                customerLN: response.data.payload.customerLN,
                address: response.data.payload.address,
                orderStatus: response.data.payload.orderStatus,
                orderPrice: response.data.payload.orderPrice,
                // Add more fields as needed
                ...response.data.payload.orderService[0]
            }
            setLoading(false);
            setOrder(flatorder);
            console.log("flate",flatorder);
        } catch (error) {
          // Handle errors
            console.error('Error fetching data:', error);
          //seterror('Error fetching data');
          setLoading(false);
        }finally {
          setLoading(false);
        }
      };
    
    useEffect(() => {
        fetchData();
    }, []);

    let flag=false;
    if(!loading){
        if(order.orderStatus=="Approved"&&!IsApro){
            flag=true;
            setIsApro(true);
        }
        else if(order.orderStatus=="Completed"&&!complet){
            flag=true;
            setComplete(true);
            doneHandel();
        }else if (order.orderStatus === "Canceled" &&!cancel) {
            flag = true;
            setIsApro(true);
            setCancel(true);
            setButtonStates({ button1: true, button2: true, button3: true, button4: true, button5: true });
        }

    }
    async function handleAccept(){
        const response = await axios.post(`https://localhost:7188/api/ServiceProvider/approveorder?orderId=${order.orderId}`)
        .catch((err) => {
        seterror(err.response.data.message);
      });
        if(!response.data.isError){
            setIsApro(prevIsApro => true);
        }
    }

    async function handleReject(){
        const response = await axios.post(`https://localhost:7188/api/ServiceProvider/rejectorder?orderId=${order.orderId}`)
        .catch((err) => {
        seterror(err.response.data.message);
        });
        if(!response.data.isError){
            alert("You have rejected this order")
            navigate('/');
        }
    }

    async function handleCancel(){
        const response = await axios.post(`https://localhost:7188/api/ServiceProvider/Cancelorder?orderId=${order.orderId}`)
        .catch((err) => {
        seterror(err.response.data.message);
        });
        if(!response.data.isError){
            setCancel(true);
            setButtonStates({button1:true,button2:true,button3:true,button4:true,button5:true});
            alert("You have canceled this order");
            //navigate('/');
        }
    }

    const startHandel=()=>{
        setButtonStates({button1:true,button2:false,button3:true,button4:true,button5:true});
        setCircleStates({circle1: false,
            circle2: true,
            circle3: true,
            circle4: true,
            circle5: true,});
    }

    const prepareHandel=()=>{
        setButtonStates({button1:true,button2:true,button3:false,button4:true,button5:true});
        setCircleStates({circle1: false,
            circle2: false,
            circle3: true,
            circle4: true,
            circle5: true,
        });
    }

    const wayHandel=()=>{
        setButtonStates({button1:true,button2:true,button3:true,button4:false,button5:true});
        setCircleStates({circle1: false,
            circle2: false,
            circle3: false,
            circle4: true,
            circle5: true,
        });
    }

    const progressHandel=()=>{
        setButtonStates({button1:true,button2:true,button3:true,button4:true,button5:false});
        setCircleStates({circle1: false,
            circle2: false,
            circle3: false,
            circle4: false,
            circle5: true,});
    }

    return(
        <>
        {loading? <div> is loading </div> :
        <div className="container py-5 mb-5">
            <div className="row mb-5 d-flex justify-content-center">
                <div className="col-md-12 ">
                    <p className={`${Style.bigHead}`}>Details</p>
                    <p className={`${Style.smallHead}`}>Details</p>
                    <p className={`${Style.desc}`}>Customer Request Details of needed service</p>
                </div>
                <div className={`col-md-9 ${Style.detForm} mt-5`}>
                    <div className="row ">
                        <div className={`col-md-12 ${Style.headerF}`}>
                            <p>Order Details</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-md-12 ${Style.head}`}>
                            <p>Customer Info :</p>
                        </div>
                        <div className={`col-md-6 ${Style.feilds}`}>
                            <p>Customer Name :</p>
                        </div>
                        <div className={`col-md-6 ${Style.values}`}>
                            <p>{order.customerFN}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-md-6 ${Style.feilds}`}>
                            <p>Customer Address :</p>
                        </div>
                        <div className={`col-md-6 ${Style.values}`}>
                            <p>{order.address}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-md-12 ${Style.head}`}>
                            <p>Service Info :</p>
                        </div>
                        <div className={`col-md-6 ${Style.feilds}`}>
                            <p>Service Critria :</p>
                        </div>
                        <div className={`col-md-6 ${Style.values}`}>
                            <p>{order.criteriaName}</p>
                        </div>
                        <div className={`col-md-6 ${Style.feilds}`}>
                            <p>Service Needed :</p>
                        </div>
                        <div className={`col-md-6 ${Style.values}`}>
                            <p>{order.serviceName}</p>
                        </div>
                        <div className={`col-md-6 ${Style.feilds}`}>
                            <p>Service Price :</p>
                        </div>
                        <div className={`col-md-6 ${Style.values}`}>
                            <p>{order.orderPrice} Egp </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-md-6 ${Style.feilds}`}>
                            <p>Order Date :</p>
                        </div>
                        <div className={`col-md-6 ${Style.values}`}>
                            <p>{order.OrderDate}date</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-md-6 ${Style.feilds}`}>
                            <p>Order Time :</p>
                        </div>
                        <div className={`col-md-6 ${Style.values}`}>
                            <p>{order.startTime}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-md-12 ${Style.head}`}>
                            <p>Problem Info :</p>
                        </div>
                        <div className={`col-md-12 ${Style.feilds}`}>
                            <p>Problem Statment :</p>
                        </div>
                        <div className={`col-md-12 ${Style.values}`}>
                            <p>{order.problemDescription}</p>
                        </div>
                    </div>
                    {(!(IsApro||complet)&&!flag) ?
                    <div className="row mb-3 mt-2">
                        <div className={`col-md-6 d-flex justify-content-center align-items-center py-1`}>
                            <button className={`${Style.acc}`} onClick={handleAccept}>
                                Accept
                            </button>
                        </div>
                        <div className={`col-md-6 d-flex justify-content-center align-items-center py-1 `}>
                            <button className={`${Style.rej}`} onClick={handleReject}>
                                Reject
                            </button>
                        </div>
                    </div> 
                    :
                    <div className={`row d-flex justify-content-center align-items-center py-1 `}>
                        <button disabled={buttonStates.button5}  className={`col-md-3 ${complet ? Style.canceldes : Style.cancel } `} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                    }
                </div>
            </div>
           
            {(IsApro||complet||flag) && 
            <div className="row mt-5">
                 <div className="col-md-12 mb-5 ">
                    <p className={`${Style.bigHead}`}>Order Status</p>
                    <p className={`${Style.smallHead}`}>Order Status</p>
                    <p className={`${Style.desc}`}>The Order is under which process</p>
                </div>
                <div className="d-flex justify-content-center align-item-center mt-5">
                    <ul className={`${Style.steps_list}`}>
                        <li className={`${circleStates.circle1 ? Style.steps_item : Style.steps_item2}`}>
                            <span id="circle1" 
                            className={`${circleStates.circle1 ? Style.count : Style.countCurr}`}>1</span>
                            <button id="button1" 
                            disabled={buttonStates.button1} 
                            className={`${buttonStates.button1 ? Style.infoDes : Style.info} mt-3`} 
                            onClick={startHandel}>
                                Start
                            </button>
                        </li>
                        <li className={`${circleStates.circle2 ? Style.steps_item : Style.steps_item2}`}>
                            <span id="circle2" 
                            className={`${circleStates.circle2 ? Style.count : Style.countCurr}`}>2</span>
                            <button 
                            id="button2" 
                            disabled={buttonStates.button2} 
                            className={`${buttonStates.button2 ? Style.infoDes : Style.info} mt-3`} 
                            onClick={prepareHandel}>
                                Preparing
                            </button>
                        </li>
                        <li className={`${circleStates.circle3 ? Style.steps_item : Style.steps_item2}`}>
                            <span id="circle3" 
                            className={`${circleStates.circle3 ? Style.count : Style.countCurr}`}>3</span>
                            <button 
                            id="button3" 
                            disabled={buttonStates.button3} 
                            className={`${buttonStates.button3 ? Style.infoDes : Style.info} mt-3`} 
                            onClick={wayHandel}>
                            On The Way
                            </button>
                        </li>
                        <li className={`${circleStates.circle4 ? Style.steps_item : Style.steps_item2}`}>
                            <span id="circle4" 
                            className={`${circleStates.circle4 ? Style.count : Style.countCurr}`}>4</span>
                            <button 
                            id="button4" 
                            disabled={buttonStates.button4} 
                            className={`${buttonStates.button4 ? Style.infoDes : Style.info} mt-3`} 
                            onClick={progressHandel}>
                                In Progress
                            </button>
                        </li>
                        <li className={`${Style.steps_item_last}`}>
                            <span id="circle5" 
                            className={`${circleStates.circle5 ? Style.count : Style.countCurr}`}>5</span>
                            <button 
                            id="button5" 
                            disabled={buttonStates.button5} 
                            className={`${buttonStates.button5 ? Style.infoDes : Style.info} mt-3`} 
                            onClick={doneHandel}>
                                Done
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            }
        </div>}
        </>
    );
}
export default ReqDetails;