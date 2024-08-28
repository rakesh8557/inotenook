import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setcredentials] = useState({email:"", password:""});
    const navigate = useNavigate();
    const host = "http://localhost:4000";


    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjNDdlNmQwZTRkYTYzZWZjNTMwYjcxIiwiaWF0IjoxNzI0MjE4NzU3fQ.uqoXjLoWprKhhePACaF6mp2CrXyLpZXkSYzLUxZXqnI",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        if(json.success === true) {
            localStorage.setItem('token',json.authToken);
            navigate('/');
            props.showAlert("User logged in successFully", "success");
        } else {
            props.showAlert("Invalid credentails", "danger");
        }
    };

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    return (
        <>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange} value={credentials.email} name="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={onchange} value={credentials.password} name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login