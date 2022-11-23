import React, { useContext } from 'react';
import question from '../../question.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, postLogin } from '../ApiRequest';
import { UserContext } from '../../App';
import {useFormik} from 'formik';


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
  
  return errors;
}

export function Login() {
    const userContext = useContext(UserContext);

  const navigate = useNavigate();
    const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
      validate,
    onSubmit: values => {
      postLogin({
        email: values.email,
        password: values.password
      }).then(x => {
        if (x === true){userContext.refreshUser();
          navigate("/");
        }
      })
    },
  });
  
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
                      <form onSubmit={formik.handleSubmit}>
                        <h3 className="fw-normal mb-3 pb-3" >Sign into your account</h3>

                        <div className="form-outline mb-4">
                          <input type="email" id="email" className="form-control form-control-lg" 
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                                  value={formik.values.email}/>
                          <label className="form-label" htmlFor="email">Email address</label>
                          {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" id="password" className="form-control form-control-lg" 
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                          value={formik.values.password}/>
                          <label className="form-label" htmlFor="password">Password</label>
                          {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg w-100" type="submit">Login</button>
                        </div>

                        <a className="small text-muted" href="#!">Forgot password?</a>
                        <p className="mb-5 pb-lg-2" >Don't have an account? <Link to="/Register"
                            >Register here</Link></p>
                      </form>

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

export default Login;