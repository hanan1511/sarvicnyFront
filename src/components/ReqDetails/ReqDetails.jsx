import Style from "./ReqDetails.module.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import FeedbackForm from "../Feedback/FeedbackForm";
import { Link, useNavigate } from "react-router-dom";

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
    const api = `https://localhost:7188/api/ServiceProvider/setOrderStatus?orderId=${id}&status=`;
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

    const doneHandel= async()=>{
        setButtonStates({button1:true,button2:true,button3:true,button4:true,button5:true});
        setCircleStates({circle1: false,
            circle2: false,
            circle3: false,
            circle4: false,
            circle5: false,});
            setComplete(true);
    }
    const pressdoneHandel= async()=>{
        const resp = await axios.post(`${api}Done`).catch((err) => {
            seterror(err.response.data.message);
            });
        if(!resp.isError){
            window.alert("you are done");
            doneHandel();
        }
    }

      const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://localhost:7188/api/ServiceProvider/showOrderDetails?orderRequestId=${id}`
            );
            console.log(response.data);
            const flatOrder = {
                orderId: response.data.payload.orderId,
                customerId: response.data.payload.customerId,
                customerFN: response.data.payload.customerFN,
                customerLastName: response.data.payload.customerLastName,
                address: response.data.payload.address,
                orderStatus: response.data.payload.orderStatus,
                orderPrice: response.data.payload.orderPrice,
                problem: response.data.payload.problem,
                orderDate: response.data.payload.orderDate,
                startTime: response.data.payload.startTime,
                criteriaName:response.data.payload.orderService[0].criteriaName,
                orderService: response.data.payload.orderService,
                providerRate: response.data.payload.providerRate
                 // Keep the orderService array as is
              }
            setLoading(false);
            setOrder(flatOrder);
            console.log("flate",flatOrder);
            switch (flatOrder.orderStatus) {
                case "Completed":
                case "Done":
                    setComplete(true);
                    doneHandel();
                    break;
                case "Canceled":
                    setCancel(true);
                    doneHandel();
                    break;
                case "Start":
                    startHandel();
                    break;
                case "Preparing":
                    prepareHandel();
                    break;
                case "OnTheWay":
                    wayHandel();
                    break;
                case "InProgress":
                    progressHandel();
                    break;
                case "CanceledByProvider":
                    setCancel(true);
                    break;
                default:
                    break;
                }
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

    const startHandel=async ()=>{
            setButtonStates({button1:true,button2:false,button3:true,button4:true,button5:true});
            setCircleStates({circle1: false,
                circle2: true,
                circle3: true,
                circle4: true,
                circle5: true,
            });
        

    }

    const prepareHandel=async ()=>{
            setButtonStates({button1:true,button2:true,button3:false,button4:true,button5:true});
        setCircleStates({circle1: false,
            circle2: false,
            circle3: true,
            circle4: true,
            circle5: true,
        });
        
    }

    const wayHandel=async ()=>{
        
        setButtonStates({button1:true,button2:true,button3:true,button4:false,button5:true});
        setCircleStates({circle1: false,
            circle2: false,
            circle3: false,
            circle4: true,
            circle5: true,
        });
    }

    const progressHandel=async ()=>{
        
        setButtonStates({button1:true,button2:true,button3:true,button4:true,button5:false});
        setCircleStates({circle1: false,
            circle2: false,
            circle3: false,
            circle4: false,
            circle5: true,});
    }

    // if(!loading){
    //     if((order.orderStatus=="Completed"||order.orderStatus=="Done")&&!complet){
    //         flag=true;
    //         setComplete(true);
    //         doneHandel();
    //     }else if (order.orderStatus === "Canceled" &&!cancel) {
    //         flag = true;
    //         setIsApro(true);
    //         setCancel(true);
    //         setButtonStates({ button1: true, button2: true, button3: true, button4: true, button5: true });
    //     }else if(order.orderStatus=="Start"){
    //         flag=true;
    //         startHandel();
    //     }else if(order.orderStatus=="Preparing"){
    //         flag=true;
    //         prepareHandel();
    //     }else if(order.orderStatus=="OnTheWay"){
    //         flag=true;
    //         wayHandel();
    //     }else if(order.orderStatus=="InProgress"){
    //         flag=true;
    //         progressHandel();
    //     }

    // }

    async function handleCancel(){
        const response = await axios.post(`https://localhost:7188/api/ServiceProvider/cancelOrder?orderId=${order.orderId}`)
        .catch((err) => {
        seterror(err.response.data.message);
        console.log(err);
        });
        if(response){
            if(!response.data.isError){
                setCancel(true);
                setButtonStates({button1:true,button2:true,button3:true,button4:true,button5:true});
                window.alert("You have canceled this order");
                window.location.reload();
                //navigate('/');
            }
        }
    }

    const pressstartHandel=async ()=>{
        const resp = await axios.post(`${api}Start`).catch((err) => {
            seterror(err.response.data.message);
            });
        if(resp){
            window.alert("you started the order"); 
            startHandel();
        }

    }

    const pressprepareHandel=async ()=>{
        const resp = await axios.post(`${api}Preparing`).catch((err) => {
            seterror(err.response.data.message);
            });
        if(!resp.isError){
            window.alert("you are preparing the order");
           prepareHandel();
        }
    }

    const presswayHandel=async ()=>{
        const resp = await axios.post(`${api}OnTheWay`).catch((err) => {
            seterror(err.response.data.message);
            });
        if(!resp.isError){
            window.alert("you are on the way");
            wayHandel();
        }
    }

    const pressprogressHandel=async ()=>{
        const resp = await axios.post(`${api}InProgress`).catch((err) => {
            seterror(err.response.data.message);
            });
        if(!resp.isError){
            window.alert("you have arrived");
            progressHandel();
        }
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

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
                        {order.orderService && order.orderService.map((service, index) => (
                            <>
                                <div className={`col-md-6 ${Style.feilds}`}>
                                    <p>Service_{index+1} Needed :</p>
                                </div>
                                <div className={`col-md-6 ${Style.values}`}>
                                    <p>{service.serviceName}</p>
                                </div>
                                <div className={`col-md-6 ${Style.feilds}`}>
                                    <p>Service_{index+1} Price :</p>
                                </div>
                                <div className={`col-md-6 ${Style.values}`}>
                                    <p>{service.price} Egp </p> 
                                </div>
                            </>
                        ))}
                        
                    </div>
                    <div className="row">
                        <div className={`col-md-6 ${Style.feilds}`}>
                            <p>Order Date :</p>
                        </div>
                        <div className={`col-md-6 ${Style.values}`}>
                            <p>{formatDate(order.orderDate)}</p>
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
                    { !cancel && !complet ?
                    <>
                    <div className={`row d-flex justify-content-center align-items-center py-1 `}>
                        <button disabled={cancel}  className={`col-md-3 ${complet ? Style.canceldes : Style.cancel } `} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                    {error == null ? '' : <div className="alert alert-danger">{error}</div>}
                    </>
                    : complet && order.providerRate==null ?
                        <div className={`row d-flex justify-content-center align-items-center py-1 `}>
                            <button className={`col-md-3  border bg-success rounded-1 ${Style.but} `}>
                                <FeedbackForm orderid={order.orderId}/> 
                            </button>
                        </div>
                        :<></>
                    }
                </div>
            </div>
            
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
                            onClick={pressstartHandel}>
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
                            onClick={pressprepareHandel}>
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
                            onClick={presswayHandel}>
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
                            onClick={pressprogressHandel}>
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
                            onClick={pressdoneHandel}>
                                Done
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>}
        </>
    );
}
export default ReqDetails;