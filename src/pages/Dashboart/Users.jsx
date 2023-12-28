import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Delet from "../../assets/trash.png";
import { userUtils } from "../../utils/user.utils";
import AddUser from "../../Modal/AddUser";
import toastify from "../../utils/toastify";
import EditUser from "../../Modal/EditUser";
import { IMG_BASE_URL } from "../../constants/img.constants";

function Users() {
  const queryClient = useQueryClient();
  const users = useQuery({
    queryKey: ["users"],
    queryFn: userUtils.getUsers,
  });
  const deletUser = useMutation({
    mutationFn: userUtils.deletUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastify.successMessage("User muvaffaqiyatli o'chirildi");
    },
    onError: (err) => {
      toastify.errorMessage(err);
    },
  });
  return (
    <div className="comforts">
      <div className="language-haed d-flex justify-content-between">
        <h2>Users</h2>
        <AddUser />
      </div>
      <div className="language-inner">
        <table className="table table-bordered shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Roles</th>
              <th scope="col">Balance</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.data?.length &&
              users.data.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <th scope="row">{i + 1}</th>
                    <td className="fw-medium fs-5">{el.username}</td>
                    <td className="fw-medium fs-5">{el.name===null?"-":el.name}</td>
                    <td className="fw-medium fs-5">{el.image === null ? "-" : <img src={`${IMG_BASE_URL}${el.image}`} alt="userImg" width={70} height={80}/> }</td>
                    <td>{el.phone}</td>
                    <td>{el.email ===null? "-" : el.email}</td>
                    <td>{el.password}</td>
                    <td>
                      {el.roles?.length &&
                        el.roles.map((e) => {
                          return <h5 key={e.role.id}>{e.role.name}</h5>;
                        })}
                    </td>
                    <td>{el.balance===null? "-" : el.balance}</td>
                    <td>
                      <EditUser user={el}/>
                    </td>
                    <td>
                      <button
                        onClick={() => deletUser.mutate(el.id)}
                        className="btn"
                      >
                        <img src={Delet} alt="remove" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
