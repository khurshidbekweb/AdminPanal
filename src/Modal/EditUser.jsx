import { rolesUtils } from "../utils/roles.utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import { userUtils } from "../utils/user.utils";
import toastify from "../utils/toastify";
import Edit from '../assets/edit.png'


// Images transfer base64
async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.split(";base64,")[1]);
      };
      reader.onerror = reject;
    });
  }


function EditUser({user}) { 
  const queryClient = useQueryClient() 
  const [perRoles, setPerRoles] = useState({
    rolesChack: [],
    response: [],
  });
  const role = useQuery({
    queryKey: ['roles'],
    queryFn: rolesUtils.getRoles
})
  const editUser = useMutation({
    mutationFn: userUtils.patchUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']})
      toastify.successMessage("User muvaffaqiyatli tahrirlandi. ")
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
  const handlEditUser = async (e) => {
      e.preventDefault()
    const image = await getBase64(e.target.userImg.files[0])
    editUser.mutate({
        id: user.id,
        name: e.target.name.value || undefined,
        username: e.target.username.value || undefined,
        password: e.target.password.value || undefined,
        phone: e.target.phonenumber.value || undefined,
        roles: perRoles.response || undefined,
        email: e.target.email.value || undefined,
        favoriteCottages: undefined,
        image: image || undefined,
    })
  }
  console.log(editUser.variables);
  return (
    <div>
    <button type="button" className="btn d-block mx-auto" data-bs-toggle="modal" data-bs-target={`#exampleModal${user.id}`}>
      <img src={Edit} alt="edit" />
    </button>
    
    <div className="modal fade" id={`exampleModal${user.id}`} tabIndex="-1" aria-labelledby={`exampleModal${user.id}Label`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`exampleModal${user.id}Label`}>User info</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handlEditUser}>
                <input type="text" className="form-control"  name="name" id="name"  required placeholder="Name"/>
                <input type="text" className="form-control mt-2"  name="username" id="username"  required placeholder="User name"/>
                <input type="password" className="form-control mt-2" name="password" id="Password" required placeholder="Password"/>
                <input type="number" className="form-control mt-2" name="phonenumber" id="phonenumber" placeholder="+998 97 123 45 68"/>
                <input type="email" className="form-control mt-2" name="email" placeholder="demo@email.com" />
                <label className="file-input-label mt-3">
                  <input
                    type="file"
                    name="userImg"
                    className="file-input"
                  />
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    className="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                  <span>User Img</span>
                </label>
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

export default EditUser