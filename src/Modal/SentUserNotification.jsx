
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Sent from '../assets/sent.svg'
import { notificationUtils } from '../utils/notification.utilis'
import toastify from '../utils/toastify'


function SentUserNotification({mes}) {
    console.log(mes);
    const queryClient = useQueryClient()
    const sentNotif = useMutation({
        mutationFn: notificationUtils.postNatification,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notifications"]})
            toastify.successMessage("Habarnoma Yuborildi !!!")
        },
        onError: (err) => {
            console.log(err);
            toastify.successMessage("Hatolik mavjud 😣")
        }
    })

    const handleNotification = (e) => {
        e.preventDefault()
        sentNotif.mutate({
            userId: mes,
            message: e.target.message.value,
            type: "personal"
        })
        console.log(sentNotif.variables);
    }

  return (

    <div className="edit-language">

    <button
      type="button"
      className="btn"
      data-bs-toggle="modal"
      data-bs-target={`#editModal${mes}`}
    >
      <img src={Sent} alt="edit" />
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
            <form className="p-4" onSubmit={handleNotification}>
              <textarea name="message" id="" cols="55" rows="8" className='p-2'></textarea>
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
              >
                Sent
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default SentUserNotification