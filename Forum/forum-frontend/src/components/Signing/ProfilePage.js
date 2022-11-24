import React, {useContext, useEffect, useState} from "react";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import {getLoggedInUser, updateUser} from "../ApiRequest";
import { Link, useNavigate } from 'react-router-dom';
import {Password} from "./Password";
import {UserContext} from "../../App";

const validate = values => {
    const errors = {};

   if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }  else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!+@&#_-]).{6,}$/i.test(values.password)){
        errors.password = "Must be 6 characters or more and must contain: a number, an UPPERCASE letter and a special character";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'The two passwords are not matching';
    }

    return errors;
}


export function ProfilePage() {
    const userContext = useContext(UserContext);
    const user = userContext.user;
        
    const navigate = useNavigate();
    
    const [formState, setFormState] = useState(true);
    
    function handleClick() {
        setFormState(!formState);
    }
    
    return (
        <section className="vh-70">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{borderRadius: "1rem", backgroundColor: "#d3d3d3"}}>
                            
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <Formik
                                            initialValues={{
                                                name: user.userName,
                                                email: user.email,
                                                password: '',
                                                confirmPassword: ''
                                            }}
                                            validate={validate}
                                            onSubmit= {values => {
                                                updateUser({
                                                    name: values.name,
                                                    email: values.email,
                                                    password: values.password
                                                }).then(x => {
                                                    if (x === true){
                                                        navigate("/");
                                                    }
                                                })
                                            }}
                                        >
                                            {({ errors, touched }) => (
                                        <Form>
                                            <div className="row g-0">
                                            <h3 className="fw-normal mb-3 pb-3">Edit your profile</h3>
                                            
                                                <button className="btn btn-dark btn-lg pt-1 mb-4" type="button" onClick={handleClick}>Edit
                                                </button>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Field name={"name"} disabled={formState} type={"text"} className="form-control form-control-lg"/>
                                                <label htmlFor={"name"}>Username</label><br/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Field name={"email"} disabled={formState} type={"email"} className="form-control form-control-lg" />
                                                <label htmlFor={"email"}>E-mail address</label><br/>
                                                <ErrorMessage name={"email"} render={msg => <div className={"text-danger"}>{msg}</div>}/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Field name={"password"} component={Password} />
                                                <label htmlFor={"password"}>New password</label><br/>
                                                <ErrorMessage name={"password"} render={msg => <div className={"text-danger"}>{msg}</div>}/>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <Field name={"confirmPassword"} component={Password}/>
                                                <label htmlFor={"confirmPassword"}>Confirm password</label><br/>
                                                <ErrorMessage name={"confirmPassword"} render={msg => <div className={"text-danger"}>{msg}</div>} />
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg w-100" disabled={formState} type="submit">Save
                                                </button>
                                            </div>

                                           
                                        </Form>
                                                )}
                                        </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
}