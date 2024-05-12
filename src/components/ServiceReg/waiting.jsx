import upperCorner2 from "../../assets/upperCorner2.png";
import upperCorner from "../../assets/upperCorner.png";
import downCorner from "../../assets/downCorner.png";
import downcorner4 from "../../assets/downcorner4.png"
import Style from "./ServiceReg.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function Waiting(){
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
          navigate('/');
        }, 10000);
    
        return () => clearTimeout(redirectTimer); // Clean up the timer on component unmount
      }, [navigate]);
    
    return(
        <>
        <div className={`${Style.corners}`}>
            <img src={upperCorner2} className={`${Style.corner3}`} />
            <img src={upperCorner} className={`${Style.corner}`} />
        </div>
        <div className="container py-5 d-flex align-item-center justify-content-center">
            <div className="row">
                <p className="text-center" style={{fontSize:'80px',color:'#152238',fontWeight:'800'}}>
                    Thank you for applying {" "}
                    <span className={` ${Style.mainHeadingSpan}`}>S</span>arvicny  
                </p>
                <p className="text-center" style={{fontSize:'30px',color:'#152238',fontWeight:'500'}}>
                    Wait for yoy Approval or Rejection mail 
                </p>
            </div>
        </div>
        <div className={`${Style.downcorn}`}>
            <img src={downcorner4} className={`${Style.corner2}`} />
            <img src={downCorner} className={`${Style.corner4}`} />
        </div>
        </>
    );
} 