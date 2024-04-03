import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddLanguage from "../../Modal/AddLanguage";
import { languageUtils } from "../../utils/language.utils";
import EditLanguage from "../../Modal/EditLanguage";
import toastify from "../../utils/toastify";
import DeleteAllModal from "../../Modal/DeleteAllModal";

//Loading
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguagePage } from "../../utils/multiLanguages";
import { QUERY_KEYS, useLanguage } from "../../Query";

function Language() {
  const queryClient = useQueryClient();

  // get Langugae
  const languages = useLanguage();

  // delete Language
  const deleteLanguage = useMutation({
    mutationFn: languageUtils.deletLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
      toastify.successMessage("Til muvaffaqiyatli o'chirildi");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  // langugae Change
  const { languageChange } = useContext(LanguageContext);

  if (languages.isLoading) return <Loading />;

  return (
    <div className="language">
      <div className="language-haed d-flex justify-content-between">
        <h2>{multiLanguagePage.maintitle[languageChange]}</h2>
        <AddLanguage />
      </div>
      <div className="language-inner">
        {languages?.data?.length ? (
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                {multiLanguagePage.tableHead.map((head) => (
                  <th scope="col" key={head.id}>
                    {head.title[languageChange]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {languages.data.map((e, i) => {
                return (
                  <tr key={e.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{e.code}</td>
                    <td>{e.title}</td>
                    <td>
                      <EditLanguage id={e.id} />
                    </td>
                    <td>
                      <DeleteAllModal
                        deleteFunction={deleteLanguage.mutate}
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
            <h3 className="text-xl mt-4">there is no language</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Language;
