import { useQuery } from '@tanstack/react-query'
import Delet from '../../assets/trash.png'
import { userUtils } from '../../utils/user.utils'
import AddUser from '../../Modal/AddUser';


function Users() {
    const users = useQuery({
        queryKey: ['users'],
        queryFn: userUtils.getUsers
    })
    console.log(users.data);
  return (
    <div className='comforts'>
           <div className="language-haed d-flex justify-content-between">
            <h2>Users</h2>    
            <AddUser/>
        </div>
        <div className="language-inner">
            <table className="table table-bordered shadow">
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
                    <tr>
                        <th scope="row">1</th>
                        <td className="fw-medium fs-5">Karim</td>
                        <td></td>
                        <td></td>
                        <td><button className="btn"><img src={Delet} alt="remove" /></button></td>
                    </tr>
                </tbody>
            </table>
        </div>         
    </div>
  )
}

export default Users