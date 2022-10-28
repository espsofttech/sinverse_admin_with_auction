import React, { Component, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { LoginAction } from '../Action/action';
import Cookies from 'js-cookie'
import config from '../coreFIles/config';

const Login = () => {

  const [form, setForm] = useState({ email: '', password: '' });
  const [validatioError, setvalidatioError] = useState({});

  if (Cookies.get('loginSuccesssinverseAdmin')) {
    window.location.href = `${config.baseUrl}dashboard`;
  }

  const inputHandler = async (e) => {
    const { name, value } = e.target
    setForm((old) => {
        return { ...old, [name]: value }
    })
  }

  function validate() {
    let emailError = "";
    let passwordError = "";

    if (form.email === '') {
      emailError = "email is required."
    }
    if (form.password === '') {
        passwordError = "Password is required."
    }
    if (emailError || passwordError) {
        setvalidatioError({
          emailError, passwordError
        })
        return false
    } else {
        return true
    }
}

const SubmitForm = async (e) => {
    e.preventDefault()
    const isValid = validate();
    if (!isValid) {

    }
    else {
        let res = await LoginAction(form);
        if (res.success) {
            toast.success(res.msg);
             console.log(res.data);
            Cookies.set('loginSuccesssinverseAdmin', JSON.stringify(res.data));
            setTimeout(() => {
                window.location.href = `${config.baseUrl}dashboard`;
            }, 1200);
        } else {
            toast.error(res.msg);
        }
    }
}

  return (
  
    <>
      <div class="hold-transition theme-primary bg-img ">
        <div className="container h-p100">
        <Toaster />
          <div className="row align-items-center justify-content-md-center h-p100">
            <div className="col-12">
              <div className="row justify-content-center g-0">
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="bg-black rounded10 shadow-lg admin-login">
                    <div className="content-top-agile p-20 pb-0">
                  <center class="loginLogo"><img src={`${config.baseUrl}/images/logo.png`} /></center>
                     
                      <h2 className="text-white">Admin Panel</h2>
                      <p className="mb-0">Sign in to continue to Sinverse Admin.</p>
                    </div>
                    <div className="p-40">
                      <form action="" method="post">
                        <div className="form-group">
                          <div className="input-group mb-3">
                            <span className="input-group-text"><i className="ti-user" /></span>
                            <input type="text" className="form-control ps-15 " placeholder="Enter Email Address" onChange={inputHandler} name="email" value={form.email} />
                          </div>
                            <span className="validationErr">{validatioError.emailError}</span>
                        </div>
                        <div className="form-group">
                          <div className="input-group mb-3">
                            <span className="input-group-text"><i className="ti-lock" /></span>
                            <input type="password" className="form-control ps-15 " placeholder="Enter Password" onChange={inputHandler} name="password" value={form.password} />
                          </div>
                            <span className="validationErr">{validatioError.passwordError}</span>
                        </div>
                        <div className="row">
                          <div className="col-12 text-center">
                            <button type="submit" onClick={SubmitForm} className="btn btn-primary mt-10">SIGN IN</button>
                          </div>
                          {/* /.col */}
                        </div>
                      </form>
                    </div>
                  </div>
                                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )

}
export default Login;