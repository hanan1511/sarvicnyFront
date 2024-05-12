import Style from "./Guest.module.css";
import { Link } from 'react-router-dom'

function Guest(){
    return(
        <>
        <div className={`${Style.img1}`}>
        <div className="container py-3 ">
            <div className="col-md-12 ">
                <div className="row mt-5 justify-content-center align-item-center w-auto py-3 no-wrap">
                    <div className="col-md-6 align-self-center py-3">
                        <div className={`${Style.welcome}`}>
                            <div className={` ${Style.mainHeading}`}>
                                <p className={` ${Style.mainHeading} text-center`}>
                                    Welcome to {" "}
                                    <span className={` ${Style.mainHeadingSpan}`}>S</span>arvicny
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 align-self-center py-3">
                        <img src="logo2.png" className={` ${Style.imgo}`}/> 
                    </div>
                </div> 
            </div>
        </div>
        </div>
            <div className="container-fluid p-5">
                <div className="row gx-5 justify-content-center align-item-center">
                    <div className="col-md-12 d-flex justify-content-center align-item-center ">
                        <p className={`${Style.head2}`}>
                            You Want to Enter As
                        </p>
                        <br />
                    </div>
                    <div className="col-md-12">
                    <p className="text-center" >
                            or you Already have an account {" "} 
                            <Link to="/loginCustomer" className={` ${Style.mainLogin}`}>
                                Log in
                            </Link>
                        </p>
                    </div>
                    <div className="col-md-4 mt-5 ">
                        <div className={`position-relative ${Style.cards}`} >
                            <div >
                                <img src="workerGust.jpg" alt="worker" width={'auto'} height={'400'} className="w-100 rounded-3 " />
                            </div>
                            <Link to={'/provider/workerReg'}>
                                <div className={`${Style.overlay} position-absolute`}>
                                    <i class="fa-solid fa-user-gear fa-3x mb-2" style={{color: '#14235c;'}}></i>
                                    <p style={{fontSize:'30px'}}>Worker</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4  mt-5">
                        <div className={`position-relative ${Style.cards}`} >
                            <div >
                                <img src="customer.jpg" alt="customer" width={'auto'} height={'400'} className="w-100 rounded-3 " />
                            </div>
                            <Link to={'/registerCustomer'}>
                                <div className={`${Style.overlay} position-absolute`}>
                                    <i className="fa-solid fa-user-check fa-3x mb-2" style={{color: '#14235c'}}></i>
                                    <p style={{fontSize:'30px'}}>Customer</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4  mt-5">
                        <div className={`position-relative ${Style.cards}`} >
                            <div >
                                <img src="guest.jpg" alt="guest" width={'auto'} height={'400'} className="w-100  rounded-3 " />
                            </div>
                            <Link to={'/home'}>
                                <div className={`${Style.overlay} position-absolute`}>
                                <i class="fa-solid fa-person-circle-question fa-4x mb-2" style={{color: '#14235c;'}}></i>
                                    <p style={{fontSize:'30px'}}>Guest</p>
                                </div>
                            </Link>
                        </div>
                    </div>
            </div>        
        </div>
        </>
    );
}

export default Guest;