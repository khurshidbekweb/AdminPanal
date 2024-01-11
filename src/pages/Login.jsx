
import { Outlet, useNavigate } from "react-router-dom";
import { authUtils } from "../utils/auth.utils";
import toastify from "../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";

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
      }, 1000);
    } catch (err) {
      toastify.errorMessage(err?.response?.data?.message);
    }
  };



  return (
    <div className="login">
      <div className="login--wrapper ml-auto p-4 rounded-2">
        <h2 className="fs-1 fw-bold text-center text-white">Admin Panel</h2>
        <form className="mx-auto w-50 mt-5" onSubmit={userLogin}>
          <label className="fs-4 w-100 fw-medium text-white">
            Username
            <input
              name="username"
              type="text"
              className="input-username w-100 p-2 rounded-2 border mt-1 fs-5 d-block"
            />
          </label>
          <label className="fs-4 d-block mt-4 fw-medium text-white">
            Password
            <input
              name="password"
              type="password"
              className="input-password w-100 p-2 rounded-2 border mt-1 d-block fs-5"
            />
          </label>
          <button
            type="submit"
            className="btn-group mt-5 p-2 w-100 text-center d-block fs-4 fw-bold bg-success border-0 text-white"
          >
            LOG IN
          </button>
        </form>
      </div>

      <Outlet />
    </div>
  );
}

export default Login;
