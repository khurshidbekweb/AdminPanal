import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddRegion from "../../Modal/AddRegion";
import { regionUtils } from "../../utils/region.utils";
import EditRegion from "../../Modal/EditRegion";
import toastify from "../../utils/toastify";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageRegion } from "../../utils/multiLanguages";
import { QUERY_KEYS, useRegion } from "../../Query";

function Region() {
  const queryClient = useQueryClient();

  // get region
  const region = useRegion();

  // delete region
  const deleteRegion = useMutation({
    mutationFn: regionUtils.deleteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.regions] });
      toastify.successMessage("Viloyat muvaffaqiyatli o'chirildi.");
    },

    onError: () => {
      toastify.errorMessage("Hatolik yuz berdi");
    },
  });

  // language change
  const { languageChange } = useContext(LanguageContext);

  if (region.isLoading) return <Loading />;

  return (
    <div>
      <div className="place">
        <div className="place-haed d-flex justify-content-between">
          <h2>{multiLanguageRegion.maintitle[languageChange]}</h2>
          <AddRegion />
        </div>
        <div className="language-inner">
          {region?.data?.length ? (
            <table className="table text-center table-bordered">
              <thead>
                <tr>
                  {multiLanguageRegion.tableHead.map((head) => (
                    <th scope="col" key={head.id}>
                      {head.title[languageChange]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {region.data.map((e, i) => {
                  return (
                    <tr key={e.id}>
                      <th scope="row">{i + 1}</th>
                      <td>{e.name}</td>
                      <td>
                        <EditRegion id={e.id} />
                      </td>
                      <td>
                        <DeleteAllModal
                          deleteFunction={deleteRegion.mutate}
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
              <h3 className="text-xl mt-4">There is no region</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Region;
