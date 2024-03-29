import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import User from "../../assets/user.svg";
import "./main.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { languageUtils } from "../../utils/language.utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Dashboart() {
  const queryClient = useQueryClient();
  const language = useQuery({
    queryKey: ["languages"],
    queryFn: languageUtils.getLanguage,
  });

  const defaultLang = localStorage.getItem("language");

  const changeLnguage = (e) => {
    e.preventDefault();
    localStorage.setItem("language", e.target.value);
    queryClient.invalidateQueries({ type: "all" });
  };

  return (
    <div>
      <div className="dashboart">
        <div className="dashboart-inner">
          <div className="aside-dashboart w-25">
            <LazyLoadImage
              className="dash-img-logo"
              src={Logo}
              alt="logo"
              effect="blur"
              width={200}
            />
            <hr />
            <div className="link-wrap-dash">
              <NavLink className="dash-link" to="home">
                Home
              </NavLink>
              <NavLink className="dash-link" to="language">
                Language
              </NavLink>
              <NavLink className="dash-link" to="translate">
                Translate
              </NavLink>
              <NavLink className="dash-link" to="region">
                Region
              </NavLink>
              <NavLink className="dash-link" to="place">
                Place
              </NavLink>
              <NavLink className="dash-link" to="cottage-type">
                Cottage type
              </NavLink>
              <NavLink className="dash-link" to="comfort">
                Comfort
              </NavLink>
              <NavLink className="dash-link" to="cottage">
                Cottage
              </NavLink>
              <NavLink className="dash-link" to="notification">
                Notification
              </NavLink>
              <NavLink className="dash-link" to="roles">
                Roles
              </NavLink>
              <NavLink className="dash-link" to="user">
                Users
              </NavLink>
            </div>
          </div>
          <div className="main-dashboart">
            <div className="header-dashboart">
              <div className="d-flex justify-content-between w-100">
                <div>
                  <h1 className="fs-4">Admin Panel</h1>
                </div>
                <div className="user-dashboatr-header d-flex align-items-center gap-3">
                  <select
                    name="language"
                    className="form-control fw-medium"
                    onChange={changeLnguage}
                  >
                    {language.data?.length &&
                      language.data.map((e) => {
                        if (e.code === defaultLang) {
                          return (
                            <option key={e.id} selected value={e.code}>
                              {e.code}
                            </option>
                          );
                        }
                        return (
                          <option key={e.id} value={e.code}>
                            {e.code}
                          </option>
                        );
                      })}
                  </select>
                  <img className="userLogo" src={User} alt="userLogo" />
                </div>
              </div>
            </div>
            <hr />
            <div className="dashboart-main-structure">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboart;
