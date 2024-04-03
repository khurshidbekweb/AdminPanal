import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddRoles from "../../Modal/AddRoles";
import { rolesUtils } from "../../utils/roles.utils";
import toastify from "../../utils/toastify";
import EditRoles from "../../Modal/EditRoles";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageRoles } from "../../utils/multiLanguages";
import { QUERY_KEYS, useRoles } from "../../Query";

function Roles() {
  const queryClient = useQueryClient();

  // get roles
  const roles = useRoles();

  // delete roles
  const deletRoles = useMutation({
    mutationFn: rolesUtils.deleteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.roles] });
      toastify.successMessage("Role muvaffaqiyat o'chirildi");
    },
    onError: () => {
      toastify.successMessage("Hatolik mavjud");
    },
  });

  // language Change
  const { languageChange } = useContext(LanguageContext);

  if (roles.isLoading) return <Loading />;

  return (
    <div className="comforts">
      <div className="language-haed d-flex justify-content-between">
        <h2>{multiLanguageRoles.maintitle[languageChange]}</h2>
        <AddRoles />
      </div>
      <div className="language-inner">
        {roles.data?.length ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                {multiLanguageRoles.tableHead.map((head) => (
                  <th className="col" key={head.id}>
                    {head.title[languageChange]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.data.map((el, i) => {
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
        ) : (
          <div>
            <h3 className="mt-4 text-xl">There is no roles</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Roles;
