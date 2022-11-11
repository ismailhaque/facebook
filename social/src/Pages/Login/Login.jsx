import React from 'react'
import { useState } from 'react'
import facebook_svg from '../../images/facebook.svg'
import { createTost } from '../../utility/Alert/Alert'
import axios from 'axios'
import swal from 'sweetalert'
import './Login.scss'

const Login = () => {
  // email and phone number pattern
  const mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const phoneno = /^\d{11}$/;

  // login form manage
  const [login, setLogin] = useState({
    phone_email: '',
    password: ''
  })

  // login form submit
  const login_submit = (e) => {
    e.preventDefault()
  }

  const login_change = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  console.log(login);

  // signup form manage
  const [signup, setSignup] = useState({
    frist_name: '',
    surename: '',
    phone_email: '',
    password: '',
    day: '',
    month: '',
    year: '',
    gander: ''
  })

  const signup_change = (e) => {

    setSignup((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  }



  // sign up form submit
  const signup_submit = async (e) => {

    e.preventDefault()

    if (!signup.frist_name || !signup.surename || !signup.phone_email || !signup.password || !signup.day || !signup.month || !signup.year || !signup.gander) {

      createTost('error', 'All feilds are required!')

    } else {

      if (!signup.phone_email.match(mailformat) && !signup.phone_email.match(phoneno)) {
        createTost('error', 'Please valid email address or phone number!')
      }

      if (signup.phone_email.match(mailformat)) {

        await axios.post(`http://localhost:5000/api/user/`, {

          name: signup.frist_name + ' ' + signup.surename,
          email: signup.phone_email,
          password: signup.password,
          brithdate: signup.day + '-' + signup.month + '-' + signup.year,
          gander: signup.gander

        }).then(res => {

          console.log(res.data);

          swal({
            title: "Wellcome Our Facebook!",
            text: "Facebook Account Create Successfully!",
            icon: "success",
            button: "Ok",
          });

          createTost('success', 'successfull!')

        })

      }

      if (signup.phone_email.match(phoneno)) {

        axios.post(`http://localhost:5000/api/user/`, {

          name: signup.frist_name + ' ' + signup.surename,
          phone: signup.phone_email,
          password: signup.password,
          brithdate: signup.day + '-' + signup.month + '-' + signup.year,
          gander: signup.gander

        }).then(res => {

          console.log(res);

          swal({
            title: "Wellcome Our Facebook!",
            text: "Facebook Account Create Successfully!",
            icon: "success",
            button: "Ok",
          });

        })

      }
    }
  }


  // date
  const date = new Date()
  const year = date.getFullYear();


  const getmonth = (val) => {

    switch (val) {

      case 1:
        return 'Jan';
        break;

      case 2:
        return 'Fab';
        break;

      case 3:
        return 'Mar'
        break;

      case 4:
        return 'Apr';
        break;

      case 5:
        return 'May';
        break;

      case 6:

        return 'Jun';
        break;

      case 7:

        return 'Jul';
        break;

      case 8:

        return 'Aug';
        break;

      case 9:

        return 'Sep';
        break;

      case 10:

        return 'Nov';
        break;

      case 11:

        return 'Jul';
        break;

      case 12:

        return 'Dec';
        break;

    }
  }


  // day 
  const select_day = []

  for (let index = 1; index < 32; index++) {

    select_day.push(<option value={index} >{index}</option>);

  }

  // month 
  const select_month = []

  for (let index = 1; index < 13; index++) {

    select_month.push(<option value={getmonth(index)} >{getmonth(index)}</option>);

  }

  // year 
  const len = year - 100;
  const select_year = []

  for (let index = len; index <= year; index++) {

    select_year.push(<option value={index} >{index}</option>);

  }

  return (
    <>

      <div className="login-container">
        <div className="login-wraper">
          <div className="f-col1">
            <img src={facebook_svg} alt="" />
            <p>FacebookFacebook helps you connect and share with the people in your life.</p>
          </div>

          <div className="f-col2">
            <form onSubmit={login_submit}>
              <input name='phone_email' value={login.phone_email} type="text" onChange={login_change} placeholder='Email address or phone number' className='form-control' />
              <br />
              <input name='password' onChange={login_change} value={login.password} type="password" placeholder='Password' className='form-control' />
              <br />
              <input type="submit" value="Log In" className='sub-btn' />
            </form>

            <br />

            <a href='#' className="forgot-password" >Forgotten password?</a>

            <hr />
            <div className="d-flex justify-content-center">
              <a type="button" class="create-account" data-bs-toggle="modal" data-bs-target="#signUpModal">Create New Account</a>
            </div>

          </div>
        </div>
      </div>


      {/* Modals */}

      <div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">Sign Up
              </h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={signup_submit}>
                <p className='inline-input'>
                  <input name='frist_name' onChange={signup_change} value={signup.frist_name} type="text" placeholder='Frist name' className='form-control' />
                  <input name='surename' onChange={signup_change} value={signup.surename} type="text" placeholder='Surename' className='form-control' />
                </p>
                <p className='inline-input'>
                  <input name='phone_email' value={signup.phone_email} onChange={signup_change} type="text" placeholder='Mobile number or email address' className='form-control' />
                </p>
                <p className='inline-input'>
                  <input value={signup.password} onChange={signup_change} name='password' type="Password" placeholder='New password' className='form-control' />
                </p>
                <p>Date of birth</p>
                <p className='inline-input'>
                  <select name="day" onChange={signup_change} id="">
                    <option selected value="">Date</option>
                    {select_day}
                  </select>
                  <select name="month" onChange={signup_change} id="">
                    <option selected value="">Month</option>
                    {select_month}
                  </select>
                  <select className='year' onChange={signup_change} name="year" id="">
                    <option selected value="">Year</option>
                    {select_year.reverse()}
                  </select>
                </p>
                <p>Gender</p>
                <p className='inline-input'>
                  <p className="radio_box">
                    <label htmlFor="female">Female</label>
                    <input name='gander' value="female" onChange={signup_change} type="radio" id='female' />
                  </p>
                  <p className="radio_box">
                    <label htmlFor="male">Male</label>
                    <input name='gander' onChange={signup_change} value='male' type="radio" id='male' />
                  </p>
                  <p className="radio_box">
                    <label htmlFor="custom">Other</label>
                    <input name='gander' onChange={signup_change} type="radio" value='other' id='custom' />
                  </p>
                </p>

                <p>
                  People who use our service may have uploaded your contact information to Facebook. Learn more.
                  <br />
                  By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.
                </p>

                <p className='d-flex justify-content-center'>
                  <input type="submit" value="Sign Up" className='signup w-50' />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login