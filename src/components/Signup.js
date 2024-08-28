import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setcredentials] = useState({email:"", password:"", cpassword :"", name:""});
    const navigate = useNavigate();
    const host = "http://localhost:4000";


    const handlesubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`${host}/api/auth/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjNDdlNmQwZTRkYTYzZWZjNTMwYjcxIiwiaWF0IjoxNzI0MjE4NzU3fQ.uqoXjLoWprKhhePACaF6mp2CrXyLpZXkSYzLUxZXqnI",
            },
            body: JSON.stringify({name, email, password}),
        });
        const json = await response.json();
        console.log(json);
        if(json.success === true) {
            localStorage.setItem('token',json.authToken);
            navigate('/');
            props.showAlert("User created successFully", "success");
        } else {
            props.showAlert("Internal error", "danger");
        }
    };

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <form onSubmit={handlesubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name="name" autoComplete="new-password" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" autoComplete="new-password" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' autoComplete="new-password" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' autoComplete="new-password" onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup