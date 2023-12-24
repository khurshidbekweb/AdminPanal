import { rolesUtils } from "../utils/roles.utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import { userUtils } from "../utils/user.utils";
import toastify from "../utils/toastify";
function AddUser() { 
  const queryClient = useQueryClient() 
  const [perRoles, setPerRoles] = useState({
    rolesChack: [],
    response: [],
  });
  const role = useQuery({
    queryKey: ['roles'],
    queryFn: rolesUtils.getRoles
})
  const addlUser = useMutation({
    mutationFn: userUtils.postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]})
      toastify.successMessage("User muvaffaqiyatli qo'shildi. ")
    },
    onError: (err) => {
      toastify.errorMessage("Hatolik mavjud")
      console.log(err);
    }
  })
const handlRole = (e) => {
  const { value, checked } = e.target;
  const { rolesChack } = perRoles;
  if (checked) {
    setPerRoles({
      rolesChack: [...rolesChack, value],
      response: [...rolesChack, value],
    });
  } else {
    setPerRoles({
      rolesChack: rolesChack.filter((e) => e !== value),
      response: rolesChack.filter((e) => e !== value),
    });
  }
};
  const handlUser = (e) => {
    e.preventDefault()
    addlUser.mutate({
      username: e.target.username.value,
      password: e.target.password.value,
      phone: e.target.phonenumber.value,
      roles: perRoles.response
    })
  }
  return (
    <div>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Add User
    </button>
    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">User info</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handlUser}>
                <input type="text" className="form-control"  name="username" id="username"  required placeholder="User name"/>
                <input type="password" className="form-control mt-2" name="password" id="Password" required placeholder="password"/>
                <input type="number" className="form-control mt-2" name="phonenumber" id="phonenumber" placeholder="+998 97 123 45 68"/>
                <h4 className="mt-2">Roles: </h4>
                <div className="roles-wrap px-3">
                  {role.data?.length && role.data.map(e => {
                    return <label key={e.id} className="d-flex gap-2 align-items-center mt-4">
                                <input className="chakbox" type="checkbox" name={e.id} value={e.id} onChange={handlRole}/>
                                <span className="d-block fw-medium">{e.name}</span>
                            </label>
                  })}
                </div> 
                <button type="submit" className="btn btn-primary mt-3" data-bs-dismiss="modal">Add</button>
            </form>
          </div>         
        </div>
      </div>
    </div></div>
  )
}

export default AddUser