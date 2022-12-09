import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import looking from "../../looking.jpg";

export default function NotAllowed () {
const navigate = useNavigate();

return(
    <section className="vh-70">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{borderRadius: "1rem", backgroundColor: "#d3d3d3"}}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                                <img src={looking}
                                     alt="error page" className="img-fluid w-100 h-100"
                                     style={{borderRadius: "1rem 0 0 1rem", objectFit: "cover"}}/>
                                <a style={{position: "absolute", bottom: "8px", left: "16px", color: "black"}}
                                   href="http://www.freepik.com">Designed by starline / Freepik</a>
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">
                                    <h3 className="fw-normal mb-3 pb-3" >Something went wrong, You are not supposed to be here.</h3>
                                    <Link className="fw-normal mb-3 pb-3" role="button" to={"/"}>Let's get back to the start...</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
};