import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Style from "./criteria.module.css";
import png from "../../../assets/homemaintan.jpg"
export default function Criteria({ id, criteriaName }) {
    const [imge, setImge] = useState("homeMaintin.jpg");

    useEffect(() => {
        if (criteriaName === "Home Criteria") {
            setImge(png);
        } else if (criteriaName === "cars") {
            setImge("../../../assets/carmaintan.jpg");
        }
    }, [criteriaName]); // Run this effect whenever criteriaName changes

    return (
        <div className="col-md-6 mt-5">
            <div className={`position-relative ${Style.cards}`}>
                <div>
                    <img src={imge} alt="customer" width={'auto'} height={'400'} className="w-100 rounded-3" />
                </div>
                {console.log(id)}
                {/* <Link to={{ 
                    pathname: "/criteria",
                    state:{id} 
                }}>*/}
                    <div className={`${Style.overlay} position-absolute`}>
                        <h2 className='text-center text-dark font-weight-bold'>{criteriaName}</h2>
                    </div>
                {/* </Link> */}
            </div>
        </div>
    );
}
