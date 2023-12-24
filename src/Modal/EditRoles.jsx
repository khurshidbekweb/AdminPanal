import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { rolesUtils } from "../utils/roles.utils";
import toastify from "../utils/toastify";
import { modelsUtils } from "../utils/models.utils";
import EditImg from "../assets/edit.png";

function EditRoles({ role }) {
  const initialPermissions = [];
  if (role?.permissions?.length) {
    role.permissions.map((e) => {
      e.permissions.forEach((el) => {
        initialPermissions.push(el.id);
      });
    });
  }
  const queryClient = useQueryClient();
  const [perRoles, setPerRoles] = useState({
    permissionCheck: [...initialPermissions],
    response: [...initialPermissions],
  });

  const models = useQuery({
    queryKey: ["models"],
    queryFn: modelsUtils.getModels,
  });
  const editroles = useMutation({
    mutationFn: rolesUtils.patchRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toastify.successMessage("Muvaffaqiyat amalga oshirildi 🙌");
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage("Hatolik mavjud");
    },
  });
  const handlPermissions = (e) => {
    const { value, checked } = e.target;
    const { permissionCheck } = perRoles;
    if (checked) {
      setPerRoles({
        permissionCheck: [...permissionCheck, value],
        response: [...permissionCheck, value],
      });
    } else {
      setPerRoles({
        permissionCheck: permissionCheck.filter((e) => e !== value),
        response: permissionCheck.filter((e) => e !== value),
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editroles.mutate({
        id: role.id,
      name: e.target.name.value,
      permissions: perRoles.response,
    });
  };
  return (
    <div key={role?.id}>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${role?.id}`}
      >
        <img src={EditImg} alt="Edit image" />
      </button>

      <div
        className="modal fade"
        id={`exampleModal${role?.id}`}
        tabIndex="-1"
        aria-labelledby={`exampleModal${role?.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`exampleModal${role?.id}Label`}>
                Roles update
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control py-3"
                  name="name"
                  id="name"
                  required
                  placeholder={role?.name}
                />
                <div
                  className="accordion accordion-flush mt-2"
                  id="accordionFlushExample"
                >
                  {models.data?.length &&
                    models.data.map((el) => {
                      return (
                        <div key={el.id} className="accordion-item">
                          <h2
                            className="accordion-header"
                            id={`flush-heading${el.id}`}
                          >
                            <button
                              className="accordion-button text-uppercase collapsed btn border rounded-1 mt-2"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#flush-collapse${el.id}`}
                              aria-expanded="false"
                              aria-controls={`flush-collapse${el.id}`}
                            >
                              {el.name}
                            </button>
                          </h2>
                          <div
                            id={`flush-collapse${el.id}`}
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              {el.permission.length &&
                                el.permission.map((e) => {
                                  return (
                                    <label key={e.id} className="d-flex gap-3">
                                      <input
                                        type="checkbox"
                                        name={e.id}
                                        value={e.id}
                                        checked={
                                          perRoles.permissionCheck.includes(
                                            e.id
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handlPermissions}
                                      />
                                      <span className="fw-medium">
                                        {e.name}
                                      </span>
                                    </label>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <button type="submit" className="btn btn-primary d-flex mt-2">
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

export default EditRoles;
