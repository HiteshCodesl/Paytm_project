import React, { useState } from 'react'
import FormHandler from '../components/Form'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", newUser)

    if (response.status === 201) {
      const data = response.data;
      localStorage.setItem("token", data.token)

      navigate("/dashboard")
    }

    setFirstname("");
    setEmail("");
    setLastname("");
    setPassword("");

  }
  return (
    <div className='flex justify-center items-center h-screen w-full '>
      <FormHandler>

        <div className="form-container">
          <p className="title">Sign Up</p>

          <form className="form" onSubmit={(e) => {
            submitHandler(e)
          }}>

            <div className="input-group">
              <label htmlFor="firstname">firstname</label>
              <input id="firstname" name="firstname" type="text" value={firstname} onChange={(e) => {
                setFirstname(e.target.value);
              }} />
            </div>

            <div className="input-group">

              <label htmlFor="lastname">lastname</label>
              <input  id="lastname" name="lastname" type="lastname" value={lastname} onChange={(e) => {
                setLastname(e.target.value);
              }} />

              <label htmlFor="email">Email</label>
              <input  id="email" name="email" type="email" value={email} onChange={(e) => {
                setEmail(e.target.value)
              }
              } />

              <label htmlFor="password">password</label>
              <input type="password" value={password} onChange={(e) => {
                setPassword(e.target.value)
              }
              } />

            </div>

            <button style={{ marginTop: '6%' }} className="sign">Submit</button>

          </form>
          <div className="social-message">
            <div className="line" />
            <p className="message">Already signed up</p>
            <Link to={"/signin"}>Login</Link>
            <div className="line" />
          </div>
        </div>

      </FormHandler>
    </div>
  )
}

export default Signup
