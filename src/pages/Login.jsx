import { Outlet, useNavigate } from "react-router-dom";
import { authUtils } from "../utils/auth.utils";
import toastify from "../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";

//icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

//logo
import adminLogo from "../assets/AdminLogo.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authUtils.loginAuthAdmin({
        password: e.target.password.value,
        username: e.target.username.value,
      });
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      if (data?.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      toastify.successMessage("Successfully logged in!");
      queryClient.invalidateQueries({
        type: "all",
      });
      setTimeout(() => {
        navigate("/dashboart");
        window.location.reload(true);
      }, 1000);
    } catch (err) {
      toastify.errorMessage(err?.response?.data?.message);
    }
  };

  // hideShow btn
  const [eyeBtn, setEyeBtn] = useState("password");

  const hideShowPassword = () => {
    return eyeBtn === "password" ? setEyeBtn("text") : setEyeBtn("password");
  };

  return (
    <div id="loginWrapper">
      <div className="loginCover">
        <div className="login ml-auto rounded-4  mx-auto">
          <div className="text-center mb-3">
            <LazyLoadImage
              src={adminLogo}
              alt="logo"
              className="w-25 rounded-circle"
              effect="blur"
            />
          </div>
          <h2 className="fs-2 fw-bold text-center text-white">Dachi v gorax</h2>
          <form className="mx-auto  mt-5" onSubmit={userLogin}>
            <label className="fs-4 w-100 fw-medium text-white">
              Username
              <input
                name="username"
                type="text"
                className="form-control  w-100 p-2 rounded-2 fs-5 border mt-1 text-black-50 d-block"
                placeholder="Enter username"
              />
            </label>
            <label className="fs-4 d-block mt-4 w-100 fw-medium text-white position-relative">
              <span>Password</span>
              <input
                name="password"
                type={eyeBtn}
                className="form-control input-password w-100 text-black-50 p-2 rounded-2 border mt-1 d-block fs-5 pe-5"
                placeholder="Enter password"
              />
              <button
                type="button"
                className="eyeBtn text-black-50"
                onClick={hideShowPassword}
              >
                {eyeBtn === "password" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </label>
            <button
              type="submit"
              className="mt-5 p-2 w-100 text-center d-block fs-5 fw-bold  border-0 text-white btn btn-primary"
            >
              LOG IN
            </button>
          </form>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Login;
