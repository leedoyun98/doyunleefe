import { Link } from "react-router-dom"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import axios from "axios"

const UserRegister = () =>{
    const [userRegister, setUserRegister] = useState({
        username: "",
        password: "",
        usrName: "",
        usrEmail: ""
    })
    const {username,password,usrName,usrEmail} = userRegister
    const onChange = useCallback(e=> {
        setUserRegister({...userRegister,[e.target.name]: e.target.value})
    })
    const [user, setUser] = useState([])
    const sendData = () => {
        axios({
            url:"http://localhost:8080/usr/signup",
            method:'post',
            headers: {
                'Content-Type'  : 'application/json',
                  'Authorization' : 'JWT fefege..'
              },
          data: userRegister
            })
            .then(response => {
                alert(`SUCCESS`)
            })
            .catch(err => {
                alert(`Error`)
                throw err
            });
    }
   
    return (<>
        <form>
            <input
                type="text"
                name="usrName"
                placeholder="name"
                onChange={onChange}
            />
            <input
                type="text"
                name="username"
                placeholder="id"
                onChange={onChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
            />
            <input
                name="user-email"
                placeholder="usrEmail"
                type="email"
                onChange={onChange}
            />
            <div className="button-box">
                <button onClick={sendData}>
                    <span>Register</span>
                </button>
            </div>
        </form>
    </>)
}
export default UserRegister