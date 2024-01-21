import { useQuery } from "@tanstack/react-query"
import { notificationUtils } from "../../utils/notification.utilis"
import AddNotifications from "../../Modal/AddNotifications";


function Notification() {   
  const notification = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationUtils.getAllNitification
  })    
  console.log(notification.data); 
return (
  <>
    <div className='place'>
        <div className="place-haed d-flex justify-content-between">
            <h2>Place</h2> 
            <AddNotifications/>        
        </div>
        <div className="language-inner">
            <table className="table shadow-lg  table-rounded mt-4">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Img</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delet</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>         
    </div>
  </>
)
}

export default Notification