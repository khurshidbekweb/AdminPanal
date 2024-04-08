import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEYS, useTariff } from "../../Query";
import { tariffUtils } from "../../utils/tariff.utils";
import toastify from "../../utils/toastify";
import AddTarif from "../../Modal/AddTarif";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import EditTarif from "../../Modal/EditTariff";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageTariff } from "../../utils/multiLanguages";

const Tariff = () => {
  const queryClient = useQueryClient();

  // get Tariff
  const tariff = useTariff();

  // delete Tariff
  const deleteTariff = useMutation({
    mutationFn: tariffUtils.deleteTariff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.unusedTranslates],
      });

      toastify.successMessage("Tarif muvaffaqiyat o'chirildi");
    },
    onError: () => {
      toastify.successMessage("Hatolik mavjud");
    },
  });

  // disable Tarif
  const disableTariff = useMutation({
    mutationFn: tariffUtils.disableTariff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.unusedTranslates],
      });

      toastify.successMessage("Tarif muvaffaqiyatli disabled qilindi");
    },
    onError: () => {
      toastify.successMessage("Hatolik mavjud");
    },
  });

  // language change
  const { languageChange } = useContext(LanguageContext);

  if (tariff.isLoading) return <Loading />;

  return (
    <div className="tariff">
      <div className="language-haed d-flex justify-content-between">
        <h2>{multiLanguageTariff.maintitle[languageChange]}</h2>
        <AddTarif />
      </div>
      <div className="language-inner">
        {tariff.data?.length ? (
          <table className="table  table-bordered">
            <thead>
              <tr>
                {multiLanguageTariff.tableHead.map((head) => (
                  <th className="col" key={head.id}>
                    {head.title[languageChange]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tariff.data.length &&
                tariff.data.map((el, i) => {
                  return (
                    <tr key={el.id}>
                      <td>{i + 1}</td>
                      <td>{el.days}</td>
                      <td>{el.description}</td>
                      <td>{el.price}</td>
                      <td>{el.service["name"]}</td>
                      <td>{el.type}</td>
                      <td>
                        <EditTarif id={el.id} tariff={tariff} />
                      </td>
                      <td>
                        <DeleteAllModal
                          deleteFunction={deleteTariff.mutate}
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
            <h3>There is no tariff</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tariff;
