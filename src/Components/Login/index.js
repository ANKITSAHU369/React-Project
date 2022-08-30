import React, { useState } from 'react'

function Login(props){
    const {setisLoggedIn} = props
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        };
        fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login", requestOptions)
        .then((res) => {return res.json()})
            .then((res) => {
                console.log(res)
                // Right now its logging in the user event though api call failed, please add an appropriate success check when api starts working
                if(true){
                    alert('Login Successful..!')
                    window.localStorage.setItem('loginStatus',true)
                    setisLoggedIn(true)
                }
            })
            .catch((error)=>console.log(error))
    }
    
    return(
        <div id="pharmacy-login-wrapper">
        <form className="Login-form-Page" id="loginform">
            <h1 style={{textAlign: 'center'}}>Sign In</h1>
            <input className="login-Form-field" type="text" name="username" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e?.target?.value)}/>
            <input className="login-Form-field" type="password" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e?.target?.value)}/>
            <input className="loginForm-submit-Button" value="Login" onClick={login}/>
        </form>
    </div>
    )
}

export default Login;