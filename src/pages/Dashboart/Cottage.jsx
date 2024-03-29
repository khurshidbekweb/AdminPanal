import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddCottage from "../../Modal/AddCottage";
import { cottageUtils } from "../../utils/cottage.utils";
import { IMG_BASE_URL } from "../../constants/img.constants";
import EditCottage from "../../Modal/EditCottage";
import EditCottageImage from "../../Modal/EditCottageImage";
import toastify from "../../utils/toastify";
import "./main.css";

function Cottage() {
  const queryClient = useQueryClient();
  const cottage = useQuery({
    queryKey: ["cottages"],
    queryFn: cottageUtils.getCottage,
  });
  console.log(cottage.data);
  const deletCottage = useMutation({
    mutationFn: cottageUtils.deleteCottageAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cottages"] });
      toastify.successMessage("O'chirish muvaffaqiyat amalga oshirildi.");
    },
  });
  return (
    <div className="cottage">
      <div className="language-haed d-flex justify-content-between">
        <h2>Cottage</h2>
        <AddCottage />
      </div>
      <div className="cottage-inner">
        <table className="table table-cottage table-bordered shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col" className="img-table">
                Img
              </th>
              <th scope="col">Type</th>
              <th scope="col">Rejion</th>
              <th scope="col">Place</th>
              <th scope="col">CottStatus</th>
              <th scope="col">Status</th>
              <th scope="col">isTop</th>
              <th scope="col">Price</th>
              <th scope="col">WeekPrice</th>
              <th scope="col">Comfort</th>
              <th scope="col">Disceiption</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {cottage.data?.length &&
              cottage.data.map((el, i) => {
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
                                <img
                                  src={`${IMG_BASE_URL}${e.image}`}
                                  className={
                                    e.isMainImage
                                      ? "border border-2 d-block border-warning rounded-3"
                                      : "rounded-3 "
                                  }
                                  width={50}
                                  height={40}
                                  alt="img"
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
                      <button
                        onClick={() => deletCottage.mutate(el.id)}
                        className="btn bg-danger text-white"
                      >
                        Delet
                      </button>
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

export default Cottage;
