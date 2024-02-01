import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationUtils } from "../utils/notification.utilis"


function AddNotifications() {

  const queryClient = useQueryClient()

  const addNotification = useMutation({
    mutationFn: notificationUtils.postNatification,
    mutationKey: queryClient.invalidateQueries({queryKey: ["notifications"]})
  })

  const handleNotification = (e) => {
    e.preventDefault()
    console.log(e.target.message.value);
    addNotification.mutate({
      message: e.target.message.value,
      type: "public"
    })
    console.log(addNotification.data);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Send notifivation
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
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
                <textarea name="message" cols="25" rows="5" className="form-control"></textarea>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal mt-2 bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNotifications