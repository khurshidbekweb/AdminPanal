import { rolesUtils } from "../utils/roles.utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { userUtils } from "../utils/user.utils";
import toastify from "../utils/toastify";
import { CiEdit } from "react-icons/ci";
import { IoMdCloudUpload } from "react-icons/io";

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

function EditUser({ user }) {
  const queryClient = useQueryClient();
  const [perRoles, setPerRoles] = useState({
    rolesChack: [],
    response: [],
  });
  const role = useQuery({
    queryKey: ["roles"],
    queryFn: rolesUtils.getRoles,
  });
  const editUser = useMutation({
    mutationFn: userUtils.patchUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastify.successMessage("User muvaffaqiyatli tahrirlandi. ");
    },
    onError: (err) => {
      toastify.errorMessage("Hatolik mavjud");
      console.log(err);
    },
  });
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
  const handlEditUser = (e) => {
    e.preventDefault();
    editUser.mutate({
      id: user.id,
      name: e.target.name.value,
      username: e.target.username.value,
      password: e.target.password.value,
      phone: e.target.phonenumber.value,
      roles: perRoles.response,
      email: e.target.email.value,
      favoriteCottages: "",
      image: e.target.userImg.files[0],
    });
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-success d-block mx-auto"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${user.id}`}
      >
        <CiEdit size={25} className="text-white" />
      </button>

      <div
        className="modal fade"
        id={`exampleModal${user.id}`}
        tabIndex="-1"
        aria-labelledby={`exampleModal${user.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`exampleModal${user.id}Label`}>
                User info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlEditUser}>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  placeholder="Name"
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  name="username"
                  id="username"
                  placeholder="User name"
                />
                <input
                  type="password"
                  className="form-control mt-2"
                  name="password"
                  placeholder="Password"
                />
                <input
                  type="number"
                  className="form-control mt-2"
                  name="phonenumber"
                  placeholder="+998 97 123 45 68"
                />
                <input
                  type="email"
                  className="form-control mt-2"
                  name="email"
                  placeholder="demo@email.com"
                />
                <label className="file-input-label mt-3">
                  <input type="file" name="userImg" className="file-input" />
                  <IoMdCloudUpload size={25} />
                  <span>User Img</span>
                </label>
                <h4 className="mt-2">Roles: </h4>
                <div className="roles-wrap px-3">
                  {role.data?.length &&
                    role.data.map((e) => {
                      return (
                        <label
                          key={e.id}
                          className="d-flex gap-2 align-items-center mt-4"
                        >
                          <input
                            className="chakbox"
                            type="checkbox"
                            name={e.id}
                            value={e.id}
                            onChange={handlRole}
                          />
                          <span className="d-block fw-medium">{e.name}</span>
                        </label>
                      );
                    })}
                </div>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-primary mt-3"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
