import React, { Fragment, useEffect, useState,useCallback } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import  { useHistory } from 'react-router'
const UserLogin = () =>{
    const history = useHistory()
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    })
    const {username,password} = userLogin
    const onChange = useCallback(e=> {
        setUserLogin({...userLogin,[e.target.name]: e.target.value})
    })
const login = () => {
        axios({
            url:"http://localhost:8080/usr/signin",
            method:'post',
            headers: {
                'Content-Type'  : 'application/json',
                  'Authorization' : 'JWT fefege..'
              },
          data: userLogin
            })
            .then(response => {
                if(response.data.token ){
                    history.goBack()
                    localStorage.setItem("user",JSON.stringify(response.data.user))
                    localStorage.setItem("token",response.data.token)
                }else{
                    alert(`토큰값 없음`)
                }
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
        <div className="button-box">
            <div className="login-toggle-btn">
                <input type="checkbox" />
                <label className="ml-10">Remember me</label>
                <Link to={process.env.PUBLIC_URL + "/"}>
                    Forgot Password?
                </Link>
            </div>
        <button type="submit" onClick={login}>
            <span>Login</span>
        </button>
        </div>
    </form>
        
        </>)
}
export default UserLogin