import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import question from '../../question.jpg'
import { Formik, Field, Form, ErrorMessage} from 'formik';
import {postRegister} from "../ApiRequest";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';


const validate = values => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }
  
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'The two passwords are not matching'
  }

  return errors;
}

export function Register() {
  const navigate = useNavigate();
      return (
<section className="vh-70">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem", backgroundColor: "#d3d3d3"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
            <img src={question}
                alt="login form" class="img-fluid w-100 h-100" style={{borderRadius: "1rem 0 0 1rem", objectFit: "cover"}} />
            <a style={{position: "absolute", bottom: "8px", left: "16px", color: "black"}} href="http://www.freepik.com">Designed by starline / Freepik</a>
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <Formik
                    initialValues={{
                  email: '',
                  password: '',
                  confirmPassword: '', 
                      showPassword: false
                }}
                validate={validate}
                onSubmit= {values => {
                postRegister({
                  email: values.email,
                  password: values.password
                }).then(x => {
                  if (x === true){
                    navigate("/");
                  }
                })
              }}
                >
                  {({ errors, touched, values}) => (
                      <Form>
                        <h3 className="fw-normal mb-3 pb-3" >Register an account</h3>

                        <div className="form-outline mb-4">
                          <Field name={"email"} type={"email"} className="form-control form-control-lg" />
                          <label htmlFor={"email"}>E-mail address</label><br/>
                          <ErrorMessage name={"email"} render={msg => <div className={"text-danger"}>{msg}</div>}/>
                        </div>

                        <div className="form-outline mb-4">
                          <Field name={"password"} type={values.showPassword ? 'text' : 'password'} className="form-control form-control-lg"/>
                          <label htmlFor={"password"}>Password</label><br/>
                          <ErrorMessage name={"password"} render={msg => <div className={"text-danger"}>{msg}</div>}/>
                        </div>

                        <div className="form-outline mb-4">
                          <Field name={"confirmPassword"} type={"password"} className="form-control form-control-lg"/>
                          <label htmlFor={"confirmPassword"}>Confirm password</label><br/>
                          <ErrorMessage name={"confirmPassword"} render={msg => <div className={"text-danger"}>{msg}</div>} />
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg w-100" type="submit">Register</button>
                        </div>

                        <a className="small text-muted" href="#!">Forgot password?</a>
                        <p className="mb-5 pb-lg-2" >Already Have an account? <Link to="/Login"
                        >Login here</Link></p>
                      </Form>
                      )}
                  
                </Formik>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
  
}

export default Register;