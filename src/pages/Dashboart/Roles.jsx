import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Delet from "../../assets/trash.png";
import AddRoles from "../../Modal/AddRoles";
import { rolesUtils } from "../../utils/roles.utils";
import toastify from "../../utils/toastify";
import EditRoles from "../../Modal/EditRoles";
import DeleteAllModal from "../../Modal/DeleteAllModal";

function Roles() {
  const queryClient = useQueryClient();
  const roles = useQuery({
    queryKey: ["roles"],
    queryFn: rolesUtils.getRoles,
  });
  const deletRoles = useMutation({
    mutationFn: rolesUtils.deleteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toastify.successMessage("Role muvaffaqiyat o'chirildi");
    },
    onError: () => {
      toastify.successMessage("Hatolik mavjud");
    },
  });
  return (
    <div className="comforts">
      <div className="language-haed d-flex justify-content-between">
        <h2>Roles</h2>
        <AddRoles />
      </div>
      <div className="language-inner">
        <table className="table table-bordered shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Permissions</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {roles.data?.length &&
              roles.data.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <th scope="row">{i + 1}</th>
                    <td className="fw-medium fs-5">{el.name}</td>
                    <td>
                      <ol>
                        {el.permissions.length &&
                          el.permissions.map((e) => {
                            return (
                              <li
                                key={e.id}
                                className="fw-medium fs-5 text-uppercase"
                              >
                                {e.name}
                                <ul>
                                  {e.permissions?.length &&
                                    e.permissions.map((e) => {
                                      return (
                                        <li
                                          key={e.id}
                                          className="fs-6 text-lowercase mx-3"
                                        >
                                          {e.name}
                                        </li>
                                      );
                                    })}
                                </ul>
                              </li>
                            );
                          })}
                      </ol>
                    </td>
                    <td>
                      <EditRoles role={el} />
                    </td>
                    <td>
                      <DeleteAllModal
                        deleteFunction={deletRoles.mutate}
                        id={el.id}
                      />
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

export default Roles;
