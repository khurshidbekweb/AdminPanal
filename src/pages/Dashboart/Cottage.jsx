import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddCottage from "../../Modal/AddCottage";
import { cottageUtils } from "../../utils/cottage.utils";
import { IMG_BASE_URL } from "../../constants/img.constants";
import EditCottage from "../../Modal/EditCottage";
import EditCottageImage from "../../Modal/EditCottageImage";
import toastify from "../../utils/toastify";
import "./main.css";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageCottage } from "../../utils/multiLanguages";
import { QUERY_KEYS, useCottage } from "../../Query";

function Cottage() {
  const queryClient = useQueryClient();

  // get cottage
  const cottage = useCottage();

  // delete cottage
  const deletCottage = useMutation({
    mutationFn: cottageUtils.deleteCottageAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toastify.successMessage("O'chirish muvaffaqiyat amalga oshirildi.");
    },
  });

  // language Change
  const { languageChange } = useContext(LanguageContext);

  if (cottage.isLoading) return <Loading />;

  return (
    <div className="cottage">
      <div className="language-haed d-flex justify-content-between">
        <h2>{multiLanguageCottage.maintitle[languageChange]}</h2>
        <AddCottage />
      </div>
      <div className="cottage-inner">
        {cottage.data?.length ? (
          <table className="table table-cottage table-bordered shadow">
            <thead>
              <tr>
                {multiLanguageCottage.tableHead.map((head) => (
                  <th className="col" key={head.id}>
                    {head.title[languageChange]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cottage.data.map((el, i) => {
                return (
                  <tr key={el.id} className="singil-cottage">
                    <th scope="row">{i + 1}</th>
                    <td>{el.name}</td>
                    <td>
                      <ul className="list-unstyled img-wrap-cottage gap-2">
                        {el.images?.length &&
                          el.images.map((e) => {
                            return (
                              <li key={e.id} className="d-wrap">
                                <LazyLoadImage
                                  src={`${IMG_BASE_URL}${e.image}`}
                                  className={
                                    e.isMainImage
                                      ? "border border-5 d-block border-warning rounded-3 "
                                      : "rounded-3 "
                                  }
                                  width={80}
                                  height={80}
                                  alt="img"
                                  effect="blur"
                                />
                              </li>
                            );
                          })}
                      </ul>
                      <EditCottageImage id={el.id} images={el.images} />
                    </td>
                    <td>
                      {el.cottageType?.map((e) => {
                        return <p key={e.id}>{e.name}</p>;
                      })}
                    </td>
                    <td>{el.region.name}</td>
                    <td>{el.place.name}</td>
                    <td>
                      <p
                        className={
                          el.cottageStatus === "confirmed"
                            ? "p-2 rounded fw-bold bg-success text-white"
                            : "p-2 rounded fw-bold text-center bg-warning text-white"
                        }
                      >
                        {el.cottageStatus}
                      </p>{" "}
                    </td>
                    <th>
                      <p
                        className={
                          el.status === "active"
                            ? "p-1 bg-success text-white rounded text-center"
                            : "p-1 bg-danger text-white rounded"
                        }
                      >
                        {el.status}
                      </p>
                    </th>
                    <th>
                      <p
                        className={
                          el.isTop
                            ? "p-1 bg-success text-white rounded text-center"
                            : "p-1 bg-danger text-white rounded"
                        }
                      >
                        {String(el.isTop)}
                      </p>
                    </th>
                    <td>{el.price}</td>
                    <td>{el.priceWeekend}$</td>
                    <td>
                      {el.comforts?.length &&
                        el.comforts.map((e) => {
                          return (
                            <div
                              key={e.id}
                              className="comforts d-flex align-items-centr gap-2"
                            >
                              <img
                                width={20}
                                height={20}
                                src={`${IMG_BASE_URL}${e.image}`}
                                alt={e.name}
                              />
                              <p>{e.name}</p>
                            </div>
                          );
                        })}
                    </td>
                    <td>
                      <pre>{el.description}</pre>
                    </td>
                    <td>
                      <EditCottage id={el.id} cottage={el} />
                    </td>
                    <td>
                      <DeleteAllModal
                        deleteFunction={deletCottage.mutate}
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
            <h3 className="text-xl mt-4">There is no cottage yet:(</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cottage;
