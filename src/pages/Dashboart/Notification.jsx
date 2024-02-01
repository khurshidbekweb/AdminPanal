import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { notificationUtils } from "../../utils/notification.utilis"
import AddNotifications from "../../Modal/AddNotifications";
import toastify from "../../utils/toastify";
import Delete from '../../assets/trash.png'
import { useRef, useState } from "react";


function Notification() {   
  
  const [isTrue, setIsTrue] = useState(true)
  const publicMes = useRef(null)
  const personalMes = useRef(null) 
  
  const handleChangeMes = () => {
    setIsTrue(item => !item)
    if(isTrue){
      publicMes.current.classList.add("d-none")
      personalMes.current.classList.remove("d-none")
    }else{
      publicMes.current.classList.remove("d-none")
      personalMes.current.classList.add("d-none")
    }
  }
  const queryClient = useQueryClient()
  const notification = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationUtils.getAllNitification
  })    
  const deletNotification = useMutation({
    mutationFn: notificationUtils.deleteNatification,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ["notifications"]})
      toastify.successMessage("Habarnoma o'chirildi 😍")
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage("Hatolik mavjud😣")
    }
  })
return (
  <>
    <div className="notification-wrap">        
      <div className='public-noti'>
          <div className="notif-haed d-flex justify-content-between">
              <h2>Notifications</h2> 
              <AddNotifications/>        
          </div>
          <div className="change-type w-25 d-flex gap-5">
              <button onClick={handleChangeMes} className="btn change-type-notif border">{isTrue?"Personal":"Public"}</button>
          </div>
          <div ref={publicMes} className="public-inner">
              <table className="table shadow-lg  table-rounded mt-4">
                  <thead>
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">Message</th>
                      <th scope="col">Delet</th>
                      </tr>
                  </thead>
                  <tbody>
                      {notification.data?.length && notification.data.filter(item => item.type === "public").map((mes, i) => {
                        return <tr key={mes.id}>
                                  <th>{i+1}</th>
                                  <td><pre>{mes.message}</pre></td>
                                  <td> <button className="btn" onClick={() => deletNotification.mutate(mes.id)}> <img src={Delete} alt="trash" /> </button> </td>
                                </tr>
                      })}
                  </tbody>
              </table>
          </div>  
          <div ref={personalMes} className="personal-inner d-none">
                  <table className="table shadow-lg  table-rounded mt-4">
                      <thead>
                          <tr>
                          <th scope="col">#</th>
                          <th scope="col">Message</th>
                          <th scope="col">Delet</th>
                          </tr>
                      </thead>
                      <tbody>
                          {notification.data?.length && notification.data.filter(item => item.type === "personal").map((mes, i) => {
                            return <tr key={mes.id}>
                                      <th>{i+1}</th>
                                      <td><pre>{mes.message}</pre></td>
                                      <td> <button className="btn" onClick={() => deletNotification.mutate(mes.id)}> <img src={Delete} alt="trash" /> </button> </td>
                                    </tr>
                          })}
                      </tbody>
                  </table>
              </div> 
      </div>
    </div>
  </>
)
}

export default Notification