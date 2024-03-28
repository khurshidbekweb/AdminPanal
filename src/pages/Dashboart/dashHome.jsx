import { useQuery } from "@tanstack/react-query";
import User from "../../assets/user.svg";
import Cottage from "../../assets/cottage.svg";
import Languages from "../../assets/languages.svg";
import Region from "../../assets/region.svg";
import Place from "../../assets/place.svg";
import Comforts from "../../assets/comforts.svg";
import Notification from "../../assets/notification.svg";
import { userUtils } from "../../utils/user.utils";
import { cottageUtils } from "../../utils/cottage.utils";
import "./main.css";
import { languageUtils } from "../../utils/language.utils";
import { regionUtils } from "../../utils/region.utils";
import { placeUtils } from "../../utils/place.utils";
import { comfortUtils } from "../../utils/comfort.utils";
import { notificationUtils } from "../../utils/notification.utilis";

function DashHome() {
  // window.location.reload(true)
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
  return (
    <div className="home-page-wrapper d-flex gap-3 flex-wrap">
      <div
        className={
          users.data
            ? "users w-25 p-2 border rounded bg-worning bg-success"
            : "d-none"
        }
      >
        <h2 className="text-white">Users</h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <img className="bg-light rounded-circle p-2" src={User} alt="users" />
          <h3 className="text-white fw-bold">{users?.data?.length}</h3>
        </div>
      </div>
      <div className="users w-25 p-2 border rounded bg-warning bg-success">
        <h2 className="text-white">Cottages</h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <img
            className="bg-light rounded-circle p-2"
            src={Cottage}
            alt="users"
          />
          <h3 className="text-white fw-bold">{cottage?.data?.length}</h3>
        </div>
      </div>
      <div className="users w-25 p-2 border rounded bg-primary">
        <h2 className="text-white">Languages</h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <img
            className="bg-light rounded-circle p-2"
            src={Languages}
            alt="users"
          />
          <h3 className="text-white fw-bold">{language?.data?.length}</h3>
        </div>
      </div>
      <div className="users w-25 p-2 border rounded bg-info">
        <h2 className="text-white">Region</h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <img
            className="bg-light rounded-circle p-2"
            src={Region}
            alt="users"
          />
          <h3 className="text-white fw-bold">{region?.data?.length}</h3>
        </div>
      </div>
      <div className="users w-25 p-2 border rounded bg-danger">
        <h2 className="text-white">Place</h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <img
            className="bg-light rounded-circle p-2"
            src={Place}
            alt="users"
          />
          <h3 className="text-white fw-bold">{place?.data?.length}</h3>
        </div>
      </div>
      <div className="users w-25 p-2 border rounded bg-secondary">
        <h2 className="text-white">Camforts</h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <img
            className="bg-light rounded-circle p-2"
            src={Comforts}
            alt="users"
          />
          <h3 className="text-white fw-bold">{camforts?.data?.length}</h3>
        </div>
      </div>
      <div
        className={
          notification.data
            ? "users w-25 p-2 border rounded bg-worning bg-success"
            : "d-none"
        }
      >
        <h2 className="text-white">Notification</h2>
        <div className="info mt-5 rounded d-flex align-items-center justify-content-between px-3">
          <img
            className="bg-light rounded-circle p-2"
            src={Notification}
            alt="users"
          />
          <h3 className="text-white fw-bold">{notification?.data?.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default DashHome;
