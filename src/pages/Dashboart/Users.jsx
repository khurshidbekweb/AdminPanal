import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userUtils } from "../../utils/user.utils";
import AddUser from "../../Modal/AddUser";
import toastify from "../../utils/toastify";
import EditUser from "../../Modal/EditUser";
import { IMG_BASE_URL } from "../../constants/img.constants";
import SentUserNotification from "../../Modal/SentUserNotification";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../../Components/Loading/Loading";
import { multiLanguageUsers } from "../../utils/multiLanguages";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { QUERY_KEYS, useUsers } from "../../Query";

function Users() {
  const queryClient = useQueryClient();

  // get users
  const users = useUsers();

  // delete users
  const deletUser = useMutation({
    mutationFn: userUtils.deletUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] });
      toastify.successMessage("User muvaffaqiyatli o'chirildi");
    },
    onError: (err) => {
      toastify.errorMessage(err);
    },
  });

  // language Change
  const { languageChange } = useContext(LanguageContext);

  if (users.isLoading) return <Loading />;

  return (
    <div className="comforts">
      <div className="language-haed d-flex justify-content-between">
        <h2>{multiLanguageUsers.maintitle[languageChange]}</h2>
        <AddUser />
      </div>
      <div className="user-inner">
        {users.data?.length ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                {multiLanguageUsers.tableHead.map((head) => (
                  <th className="col" key={head.id}>
                    {head.title[languageChange]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.data.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <th scope="row">{i + 1}</th>
                    <td className="fw-medium fs-5">{el.username}</td>
                    <td className="fw-medium fs-5">
                      {el.name === null ? "-" : el.name}
                    </td>
                    <td className="fw-medium fs-5">
                      {el.image === null ? (
                        "-"
                      ) : (
                        <LazyLoadImage
                          src={`${IMG_BASE_URL}${el.image}`}
                          alt="userImg"
                          width={70}
                          height={80}
                          effect="blur"
                        />
                      )}
                    </td>
                    <td>{el.phone}</td>
                    <td>{el.email === null ? "-" : el.email}</td>
                    <td>{el.password}</td>
                    <td>
                      {el.roles?.length &&
                        el.roles.map((e) => {
                          return <h5 key={e.role.id}>{e.role.name}</h5>;
                        })}
                    </td>
                    <td>{el.balance === null ? "-" : el.balance}</td>
                    <td>
                      <SentUserNotification mes={el.id} />
                    </td>
                    <td>
                      <EditUser user={el} />
                    </td>
                    <td>
                      <DeleteAllModal
                        deleteFunction={deletUser.mutate}
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
            <h3 className="mt-4 text-xl">There is no user</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
