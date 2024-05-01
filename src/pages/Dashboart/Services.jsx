import { LazyLoadImage } from "react-lazy-load-image-component";
import AddService from "../../Modal/AddService";
import { QUERY_KEYS, useServices } from "../../Query";
import { IMG_BASE_URL } from "../../constants/img.constants";
import DeleteAllModal from "../../Modal/DeleteAllModal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceUtils } from "../../utils/service.utils";
import toastify from "../../utils/toastify";
import EditService from "../../Modal/EditService";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageServices } from "../../utils/multiLanguages";

const Services = () => {
  const queryClient = useQueryClient();
  // get service
  const services = useServices();

  //delete service
  const deleteService = useMutation({
    mutationFn: serviceUtils.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.services] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.unusedTranslates],
      });

      toastify.successMessage("Service muvaffaqiyat o'chirildi");
    },
    onError: () => {
      toastify.successMessage("Hatolik mavjud");
    },
  });

  // language change
  const { languageChange } = useContext(LanguageContext);

  if (services.isLoading) return <Loading />;

  return (
    <div className="services">
      <div className="language-haed d-flex justify-content-between">
        <h2>{multiLanguageServices.maintitle[languageChange]}</h2>
        <AddService />
      </div>
      <div className="language-inner">
        {services.data?.length ? (
          <table className="table  table-bordered">
            <thead>
              <tr>
                {multiLanguageServices.tableHead.map((head) => (
                  <th className="col" key={head.id}>
                    {head.title[languageChange]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.data?.length &&
                services.data.map((el, i) => {
                  return (
                    <tr key={el.id}>
                      <td>{i + 1}</td>
                      <td>{el.name}</td>
                      <td>
                        {el.images.map((img, i) => {
                          return (
                            <LazyLoadImage
                              src={`${IMG_BASE_URL}${img}`}
                              key={i}
                              className="d-block mb-2"
                              width={100}
                              height={100}
                            />
                          );
                        })}
                      </td>
                      <td>
                        <span className="bg-success p-2 text-white rounded ">
                          {el.serviceCode}
                        </span>
                      </td>
                      <td>{el.description}</td>
                      <td>
                        <EditService id={el.id} />
                      </td>
                      <td>
                        <DeleteAllModal
                          deleteFunction={deleteService.mutate}
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
            <h3>There is no services</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
