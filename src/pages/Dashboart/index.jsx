import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import User from "../../assets/user.svg";
import "./main.css";
import { useQuery } from "@tanstack/react-query";
import { languageUtils } from "../../utils/language.utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

//links
import { multilanguageLinks } from "../../utils/multiLanguages";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";

function Dashboart() {
  const language = useQuery({
    queryKey: ["languages"],
    queryFn: languageUtils.getLanguage,
  });

  const { languageChange, toggleLanguage } = useContext(LanguageContext);

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
              {multilanguageLinks.map((link) => (
                <NavLink key={link.id} className="dash-link" to={link.to}>
                  {link.title[languageChange]}
                </NavLink>
              ))}
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
                    onChange={toggleLanguage}
                  >
                    {language.data?.length &&
                      language.data.map((e) => {
                        if (e.code === languageChange) {
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
