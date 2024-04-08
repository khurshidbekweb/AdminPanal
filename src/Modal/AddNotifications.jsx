import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationUtils } from "../utils/notification.utilis";
import toastify from "../utils/toastify";
import { multiLanguageAddNotification } from "../utils/multiLanguages";
import { useContext } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { QUERY_KEYS } from "../Query";

function AddNotifications() {
  const queryClient = useQueryClient();

  // add notifications
  const addNotification = useMutation({
    mutationFn: notificationUtils.postNatification,
    mutationKey: queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.notifications],
    }),
  });

  const handleNotification = (e) => {
    e.preventDefault();
    addNotification.mutate({
      message: e.target.message.value,
      userId: null,
      type: "public",
    });
    toastify.successMessage("Habarnoma jo'natildi");
  };

  //language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addnotifications"
      >
        {multiLanguageAddNotification.addNotifications[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addnotifications"
        tabIndex="-1"
        aria-labelledby="addnotificationsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addnotificationsLabel">
                Add Notification
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handleNotification}>
                <label className="d-block">
                  <span className="d-block mb-1">Enter notification</span>
                  <textarea
                    name="message"
                    cols="25"
                    rows="5"
                    className="form-control"
                    placeholder="enter notification..."
                  ></textarea>
                </label>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal mt-3 bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNotifications;
