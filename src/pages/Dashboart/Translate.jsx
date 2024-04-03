import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddTranslate from "../../Modal/AddTranslate";
import { translateUtils } from "../../utils/translate.utils";
import toastify from "../../utils/toastify";
import { authUtils } from "../../utils/auth.utils";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageTranslate } from "../../utils/multiLanguages";
import { QUERY_KEYS, useTranslate } from "../../Query";

function Translate() {
  const queryClient = useQueryClient();

  // get Translate
  const translate = useTranslate();

  if (translate.isError && translate.error.response.status == 406) {
    authUtils.refreshAuth();
  }

  // delete translate
  const deletTranslate = useMutation({
    mutationFn: translateUtils.deleteTranslate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.translates] });
      toastify.successMessage("Translate muvaffaqiyatli o'chirildi.");
    },
    onError: (err) => {
      toastify.errorMessage("Kutilgan hato", err.message);
    },
  });

  // language Change
  const { languageChange } = useContext(LanguageContext);

  if (translate.isLoading) return <Loading />;

  return (
    <div className="translate">
      <div className="translate-haed d-flex justify-content-between">
        <h2>{multiLanguageTranslate.maintitle[languageChange]}</h2>
        <AddTranslate />
      </div>
      <div className="translate-inner">
        {translate?.data?.length ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                {multiLanguageTranslate.tableHead.map((head) => (
                  <th scope="col" key={head.id}>
                    {head.title[languageChange]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {translate.data.map((e, i) => {
                return (
                  <tr key={e.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{e.code}</td>
                    <td>{e.type}</td>
                    <td>
                      {e.definition.map((e) => {
                        return (
                          <div
                            className="d-flex gap-1 lh-1"
                            key={Math.random()}
                          >
                            <strong>{e.language.code}: </strong>{" "}
                            <p>{e.value}</p>
                          </div>
                        );
                      })}
                    </td>
                    <td>
                      <button
                        className={
                          e.status === "inactive"
                            ? "bg-danger ds-6 text-white btn btn-group fw-medium"
                            : "bg-success text-white btn btn-group fw-medium"
                        }
                      >
                        {e.status}
                      </button>
                    </td>
                    <td>
                      <DeleteAllModal
                        deleteFunction={deletTranslate.mutate}
                        id={e.id}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <h3 className="text-xl mt-4">There is no translate</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Translate;
