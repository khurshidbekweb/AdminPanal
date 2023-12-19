
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


function Login() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const userLogin = (e) =>{
    e.preventDefault();
    if(userName==="" || password===""){
        alert("Enter you username or password")
    }if(userName==="admin" && password==="1234"){
            navigate('/dashboart')
    }
    
}
  return (
    <div className="login">
            <div className="login--wrapper ml-auto p-4 rounded-2">
              <h2 className="fs-1 fw-bold text-center text-white">Admin Panel</h2>
              <form className="mx-auto w-50 mt-5">
                <label className="fs-4 w-100 fw-medium text-white"> User name
                  <input onChange={(e)=> setUserName(e.target.value)} type="text" className="input-username w-100 p-2 rounded-2 border mt-1 fs-5 d-block" />
                </label>
                <label className="fs-4 d-block mt-4 fw-medium text-white"> Password
                  <input onChange={(e)=> setPassword(e.target.value)} type="password"  className="input-password w-100 p-2 rounded-2 border mt-1 d-block fs-5" />
                </label>
                <button onClick={(e)=> userLogin(e)} className="btn-group mt-5 p-2 w-100 text-center d-block fs-4 fw-bold bg-success border-0 text-white">LOG IN</button>
              </form>
            </div>       
         
        <Outlet/>     
    </div>
  )
}


export default Login;