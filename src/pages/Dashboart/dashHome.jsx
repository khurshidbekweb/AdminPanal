import { useQuery } from "@tanstack/react-query";
import Cottage from "../../assets/cottage.svg";
import Region from "../../assets/region.svg";
import Place from "../../assets/place.svg";
import Comforts from "../../assets/comforts.svg";
import { userUtils } from "../../utils/user.utils";
import { cottageUtils } from "../../utils/cottage.utils";

import "./main.css";

import { languageUtils } from "../../utils/language.utils";
import { regionUtils } from "../../utils/region.utils";
import { placeUtils } from "../../utils/place.utils";
import { comfortUtils } from "../../utils/comfort.utils";
import { notificationUtils } from "../../utils/notification.utilis";

// icons
import { FaUsers } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { IoNotificationsCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { homePageLanguages } from "../../utils/multiLanguages";
import Loading from "../../Components/Loading/Loading";

function DashHome() {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: userUtils.getUsers,
  });

  const cottage = useQuery({
    queryKey: ["cottages"],
    queryFn: cottageUtils.getCottage,
  });

  const language = useQuery({
    queryKey: ["languages"],
    queryFn: languageUtils.getLanguage,
  });

  const region = useQuery({
    queryKey: ["regions"],
    queryFn: regionUtils.getRegion,
  });

  const place = useQuery({
    queryKey: ["places"],
    queryFn: placeUtils.getPlace,
  });

  const camforts = useQuery({
    queryKey: ["comforts"],
    queryFn: comfortUtils.getComfort,
  });

  const notification = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationUtils.getAllNitification,
  });

  //language Change
  const { languageChange } = useContext(LanguageContext);

  if (
    users.isLoading &&
    cottage.isLoading &&
    language.isLoading &&
    region.isLoading &&
    place.isLoading &&
    camforts.isLoading &&
    notification.isLoading
  )
    return <Loading />;

  return (
    <div className="home-page-wrapper d-flex gap-3 flex-wrap">
      <Link
        to="/dashboart/user"
        className={
          users.data ? "users w-25 p-2 border rounded  bg-success" : "d-none"
        }
      >
        <h2 className="text-white fs-3">
          {homePageLanguages.users[languageChange]}
        </h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <span className="text-white">
            <FaUsers size={30} />
          </span>
          <h3 className="text-white fw-bold">{users?.data?.length}</h3>
        </div>
      </Link>
      <Link
        to="/dashboart/cottage"
        className="users w-25 p-2 border rounded bg-warning"
      >
        <h2 className="text-white fs-3">
          {homePageLanguages.cottages[languageChange]}
        </h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <LazyLoadImage
            className="bg-light rounded-circle p-2"
            src={Cottage}
            alt="users"
            effect="blur"
          />
          <h3 className="text-white fw-bold">{cottage?.data?.length}</h3>
        </div>
      </Link>
      <Link
        to="/dashboart/language"
        className="users w-25 p-2 border rounded bg-primary"
      >
        <h2 className="text-white fs-3">
          {homePageLanguages.languages[languageChange]}
        </h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <span className="text-white">
            <MdLanguage size={30} />
          </span>
          <h3 className="text-white fw-bold">{language?.data?.length}</h3>
        </div>
      </Link>
      <Link
        to="/dashboart/region"
        className="users w-25 p-2 border rounded bg-info"
      >
        <h2 className="text-white fs-3">
          {homePageLanguages.regions[languageChange]}
        </h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <LazyLoadImage
            className="bg-light rounded-circle p-2"
            src={Region}
            alt="users"
            effect="blur"
          />
          <h3 className="text-white fw-bold">{region?.data?.length}</h3>
        </div>
      </Link>
      <Link
        to="/dashboart/place"
        className="users w-25 p-2 border rounded bg-danger"
      >
        <h2 className="text-white fs-3">
          {homePageLanguages.places[languageChange]}
        </h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <LazyLoadImage
            className="bg-light rounded-circle p-2"
            src={Place}
            alt="users"
            effect="blur"
          />
          <h3 className="text-white fw-bold">{place?.data?.length}</h3>
        </div>
      </Link>
      <Link
        to="/dashboart/comfort"
        className="users w-25 p-2 border rounded bg-secondary"
      >
        <h2 className="text-white fs-3">
          {homePageLanguages.comforts[languageChange]}
        </h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <LazyLoadImage
            className="bg-light rounded-circle p-2"
            src={Comforts}
            alt="users"
            effect="blur"
          />
          <h3 className="text-white fw-bold">{camforts?.data?.length}</h3>
        </div>
      </Link>
      <Link
        to="/dashboart/notification"
        className={
          notification.data
            ? "users w-25 p-2 border rounded bg-success"
            : "d-none"
        }
      >
        <h2 className="text-white fs-3">
          {homePageLanguages.notification[languageChange]}
        </h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <span className="text-white">
            <IoNotificationsCircle size={38} />
          </span>
          <h3 className="text-white fw-bold">{notification?.data?.length}</h3>
        </div>
      </Link>
    </div>
  );
}

export default DashHome;
