import { useQuery } from '@tanstack/react-query'
import User from '../../assets/user.svg'
import { userUtils } from '../../utils/user.utils'

function dashHome() {
  // const users = useQuery({
  //   queryKey: ["users"],
  //   queryFn: userUtils.getUsers
  // })
  // console.log(users);
  return (
    <div className="home-page-wrapper">
      <div className="users w-25 p-2 border rounded bg-worning bg-success">
          <h2>Users</h2>
          <div className="info">
            <img src={User} alt="" />
            <h3></h3>
          </div>
      </div>
    </div>
  )
}

export default dashHome