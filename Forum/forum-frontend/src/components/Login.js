import React, { Component } from 'react';
import question from '../question.jpg'
import { Link } from 'react-router-dom';

export class Login extends Component {

  render() {
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
                <form>
                  <h3 className="fw-normal mb-3 pb-3" >Sign into your account</h3>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg w-100" type="button">Login</button>
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
}

export default Login;