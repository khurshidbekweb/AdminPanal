import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationUtils } from "../../utils/notification.utilis";
import AddNotifications from "../../Modal/AddNotifications";
import toastify from "../../utils/toastify";
import { useContext, useRef, useState } from "react";
import { userUtils } from "../../utils/user.utils";
import { IMG_BASE_URL } from "../../constants/img.constants";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import Loading from "../../Components/Loading/Loading";
import { LanguageContext } from "../../Helper/LanguageContext";
import {
  multiLanguageAddNotification,
  multiLanguageTablePersonal,
  multiLanguageTablePublic,
} from "../../utils/multiLanguages";

function Notification() {
  const [isTrue, setIsTrue] = useState(true);
  const publicMes = useRef(null);
  const personalMes = useRef(null);

  const handleChangeMes = () => {
    setIsTrue((item) => !item);
    if (isTrue) {
      publicMes.current.classList.add("d-none");
      personalMes.current.classList.remove("d-none");
    } else {
      publicMes.current.classList.remove("d-none");
      personalMes.current.classList.add("d-none");
    }
  };

  const queryClient = useQueryClient();

  const notification = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationUtils.getAllNitification,
  });

  const users = useQuery({
    queryKey: ["users"],
    queryFn: userUtils.getUsers,
  })?.data;

  const deletNotification = useMutation({
    mutationFn: notificationUtils.deleteNatification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toastify.successMessage("Habarnoma o'chirildi 😍");
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage("Hatolik mavjud😣");
    },
  });

  // language Change
  const { languageChange } = useContext(LanguageContext);

  if (notification.isLoading) return <Loading />;

  return (
    <>
      <div className="notification-wrap">
        <div className="public-noti">
          <div className="notif-haed d-flex justify-content-between">
            <h2>{multiLanguageAddNotification.mainTitle[languageChange]}</h2>
            <AddNotifications />
          </div>
          <div className="change-type w-25 d-flex gap-5">
            <button
              onClick={handleChangeMes}
              className="btn change-type-notif border"
            >
              {isTrue ? "Personal" : "Public"}
            </button>
          </div>
          <div ref={publicMes} className="public-inner">
            {notification.data?.length ? (
              <table className="table mt-4 table-bordered text-center">
                <thead>
                  <tr>
                    {multiLanguageTablePublic.map((head) => (
                      <th className="col" key={head.id}>
                        {head.title[languageChange]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notification.data
                    .filter((item) => item.type === "public")
                    .map((mes, i) => {
                      return (
                        <tr key={mes.id}>
                          <th>{i + 1}</th>
                          <td>
                            <pre>{mes.message}</pre>
                          </td>
                          <td>
                            <DeleteAllModal
                              deleteFunction={deletNotification.mutate}
                              id={mes.id}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div>
                <h3 className="mt-4">There is no notification yet :(</h3>
              </div>
            )}
          </div>
          <div ref={personalMes} className="personal-inner d-none">
            {notification.data?.length ? (
              <table className="table table-bordered text-center  mt-4">
                <thead>
                  <tr>
                    {multiLanguageTablePersonal.map((head) => (
                      <th className="col" key={head.id}>
                        {head.title[languageChange]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notification.data
                    .filter((item) => item.type === "personal")
                    .map((mes, i) => {
                      return (
                        <tr key={mes.id}>
                          <th>{i + 1}</th>
                          <td>
                            <pre>{mes.message}</pre>
                          </td>
                          <td>
                            {" "}
                            {
                              users?.find((mess) => mess.id === mes.userId)
                                ?.name
                            }{" "}
                          </td>
                          <td>
                            {" "}
                            {
                              <img
                                width={50}
                                src={`${IMG_BASE_URL}${
                                  users?.find((mess) => mess.id === mes.userId)
                                    ?.image
                                }`}
                                alt="userImg"
                              />
                            }{" "}
                          </td>
                          <td>
                            <DeleteAllModal
                              deleteFunction={deletNotification.mutate}
                              id={mes.id}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div>
                <h3 className="mt-4">There is no notification yet :(</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
