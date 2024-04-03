import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BiLogoTelegram } from "react-icons/bi";
import { notificationUtils } from "../utils/notification.utilis";
import toastify from "../utils/toastify";
import { QUERY_KEYS } from "../Query";

function SentUserNotification({ mes }) {
  const queryClient = useQueryClient();

  const sentNotif = useMutation({
    mutationFn: notificationUtils.postNatification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.notifications] });
      toastify.successMessage("Habarnoma Yuborildi !!!");
    },
    onError: (err) => {
      console.log(err);
      toastify.successMessage("Hatolik mavjud 😣");
    },
  });

  const handleNotification = (e) => {
    e.preventDefault();
    sentNotif.mutate({
      userId: mes,
      message: e.target.message.value,
      type: "personal",
    });
  };

  return (
    <div className="edit-language">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#editModal${mes}`}
      >
        <BiLogoTelegram size={30} />
      </button>
      <div
        className="modal fade"
        id={`editModal${mes}`}
        tabIndex="-1"
        aria-labelledby={`editModal${mes}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModal${mes}Label`}>
                Sent Notification
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4 w-100" onSubmit={handleNotification}>
                <textarea
                  name="message"
                  cols="48"
                  rows="8"
                  className="p-2 form-control mb-4"
                  placeholder="sent notification"
                ></textarea>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentUserNotification;
