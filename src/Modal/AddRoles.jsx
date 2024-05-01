import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { rolesUtils } from "../utils/roles.utils";
import toastify from "../utils/toastify";
import { multiAddRoles } from "../utils/multiLanguages";
import { LanguageContext } from "../Helper/LanguageContext";
import { QUERY_KEYS, useModels } from "../Query";

function AddRoles() {
  const queryClient = useQueryClient();

  const [perRoles, setPerRoles] = useState({
    permissionCheck: [],
    response: [],
  });

  const models = useModels();

  const roles = useMutation({
    mutationFn: rolesUtils.postRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.roles] });
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
    roles.mutate({
      name: e.target.name.value,
      permissions: perRoles.response,
    });
  };

  // language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addRoles"
      >
        {multiAddRoles[languageChange]}
      </button>

      <div
        className="modal fade"
        id="addRoles"
        tabIndex="-1"
        aria-labelledby="addRolesLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRolesLabel">
                Roles add
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
                <label className="d-block">
                  <span className="mb-1 d-block">Enter role</span>
                  <input
                    type="text"
                    className="form-control py-3"
                    name="name"
                    id="name"
                    required
                    placeholder="Name"
                  />
                </label>
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
                <div className="text-end">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success  mt-3 px-4 py-2"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoles;
