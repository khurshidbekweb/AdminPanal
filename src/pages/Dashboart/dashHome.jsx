import Cottage from "../../assets/cottage.svg";
import Region from "../../assets/region.svg";
import Place from "../../assets/place.svg";
import Comforts from "../../assets/comforts.svg";

import "./main.css";

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

import {
  useComforts,
  useCottage,
  useLanguage,
  useNotifications,
  usePlaces,
  useRegion,
  useUsers,
} from "../../Query";

function DashHome() {
  // get users
  const users = useUsers();

  // get cottage
  const cottage = useCottage();

  // get Language
  const language = useLanguage();

  // get Regions
  const region = useRegion();

  // get Places
  const place = usePlaces();

  // get comforts
  const camforts = useComforts();

  // get notifications
  const notification = useNotifications();

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
  ) {
    return <Loading />;
  }

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
