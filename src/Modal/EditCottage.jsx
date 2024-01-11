import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { regionUtils } from "../utils/region.utils";
import { placeUtils } from "../utils/place.utils";
import { useState } from "react";
import { comfortUtils } from "../utils/comfort.utils";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import { IMG_BASE_URL } from "../constants/img.constants";
import Edit from "../assets/edit.png";
import toastify from "../utils/toastify";

function EditCottage({ id, cottage }) {
  const cottageTypeUset = []
  const cottageComfortUset = []
  if(cottage.cottageType.length){
      cottage.cottageType.forEach(e => {
        cottageTypeUset.push(e.id)
      })
  }
  if(cottage.comforts.length){
    cottage.comforts.forEach(e => {
      cottageComfortUset.push(e.id)
    })
  }

  const [cottageInfo, setCottageInfo] = useState({
    dachaType: [...cottageTypeUset],
    response: [...cottageTypeUset],
  });
  const [cottageComforts, setcottageComforts] = useState({
    comforts: [...cottageComfortUset],
    response: [...cottageComfortUset],
  });

  const queryClient = useQueryClient();
  const cottageEdit = useMutation({
    mutationFn: cottageUtils.patchCottageText,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cottages"] });
      toastify.successMessage("Tahrirlash muvaffaqiyat bajarildi")
    },
    onError: (err) => {
      console.log(err);
      toastify.successMessage("Hatolik mavjud")
    },
  });
  const region = useQuery({
    queryKey: ["regions"],
    queryFn: regionUtils.getRegion,
  });
  const place = useQuery({
    queryKey: ["places"],
    queryFn: placeUtils.getPlace,
  });
  const comforts = useQuery({
    queryKey: ["comforts"],
    queryFn: comfortUtils.getComfort,
  });
  const cottageType = useQuery({
    queryKey: ["cottageTypes"],
    queryFn: cottageTypeUtils.getCottageType,
  });
  const handlChoseCottageType = (e) => {
    const { value, checked } = e.target;
    const { dachaType } = cottageInfo;
    if (checked) {
      setCottageInfo({
        dachaType: [...dachaType, value],
        response: [...dachaType, value],
      });
    } else {
      setCottageInfo({
        dachaType: dachaType.filter((e) => e !== value),
        response: dachaType.filter((e) => e !== value),
      });
    }
  };
  const handleCottageComforts = (e) => {
    const { value, checked } = e.target;
    const { comforts } = cottageComforts;
    if (checked) {
      setcottageComforts({
        comforts: [...comforts, value],
        response: [...comforts, value],
      });
    } else {
      setcottageComforts({
        comforts: comforts.filter((e) => e !== value),
        response: comforts.filter((e) => e !== value),
      });
    }
    console.log(value);
  };
  const handlCottage = (e) => {
    e.preventDefault();
    cottageEdit.mutate({
      id: id,
      name: e.target.cottagename.value || undefined,
      cottageStatus: e.target.cottageStatus.value || undefined,
      placeId: e.target.place.value || undefined,
      regionId: e.target.region.value || undefined,
      price: +e.target.price.value || undefined,
      priceWeekend: +e.target.priceweekend.value || undefined,
      cottageType: cottageInfo.response,
      comforts: cottageComforts.response || undefined,
      description: e.target.discription.value || undefined,
      latitude: "" || undefined,
      longitude: "" || undefined,
    });
  };
  console.log(cottage);
  return (
    <div>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#editCottageModal${id}`}
      >
        <img src={Edit} alt="edit" />
      </button>
      <div
        className="modal modal-lg fade"
        id={`editCottageModal${id}`}
        tabIndex="-1"
        aria-labelledby={`editCottageModal${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold"
                id={`editCottageModal${id}Label`}
              >
                Edit Cottage
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlCottage}>
                <input
                  className="w-100 p-2 mb-3 form-control"
                  type="text"
                  name="cottagename"
                  value={cottage.name}
                  placeholder="Name... "
                />
                <div className="wrap-type-cottage d-flex mt-3 justify-content-between">
                  {cottageType.data?.length &&
                    cottageType.data.map((e) => {
                      return (
                        <label
                          key={e.id}
                          className="d-flex align-items-center w-25 justify-content-evenly"
                        >
                          <p className="type-text fs-5 d-block">{e.name}</p>
                          <input
                            className="form-check-input mb-3"
                            type="checkbox"
                            onChange={handlChoseCottageType}
                            name={e.id}
                            value={e.id}
                            checked ={cottageInfo.dachaType.includes(e.id)?true:false}
                          />
                        </label>
                      );
                    })}
                </div>
                <select
                  className="form-select"
                  name="region"
                  aria-label="Default select example"
                  value={cottage.region.id}
                >
                  {region.data?.length &&
                    region.data.map((e) => {
                      return (
                        <option key={e.id} selected value={e.id}>
                          {e.name}
                        </option>
                      );
                    })}
                </select>
                <select
                  className="form-select mt-2"
                  name="place"
                  aria-label="Default select example"
                  value={cottage.place.id}
                >
                  {place.data?.length &&
                    place.data.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.name}
                        </option>
                      );
                    })}
                </select>
                <select name="cottageStatus" className="form-select mt-2">
                  <option value="confirmed">Confirmed</option>
                  <option value="rejected">Rejected</option>
                  <option value="progress">Progress</option>
                </select>
                <div className="price mt-2 d-flex justify-content-between gap-2">
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    id="price"
                    value={cottage.price}
                    placeholder="Price"
                  />
                  <input
                    className="form-control"
                    type="number"
                    name="priceweekend"
                    id="priceWeek"
                    value={cottage.priceWeekend}
                    placeholder="Weekend price"
                  />
                </div>
                <div className="addnew-objects d-flex flex-wrap mt-4">
                  {comforts.data?.length &&
                    comforts.data.map((e) => {
                      return (
                        <label
                          className="addnew-object align-items-center gap-2 m-3"
                          key={e.id}
                        >
                          <input
                            className="form-check-input mb-3"
                            type="checkbox"
                            checked={cottageComforts.comforts.includes(e.id)?true:false}
                            name={e.id}
                            value={e.id}
                            onChange={handleCottageComforts}
                          />
                          <img
                            className="mb-2"
                            src={`${IMG_BASE_URL}${e.image}`}
                            alt="img"
                          />
                          <p className="addnew-object-text">{e.name}</p>
                        </label>
                      );
                    })}
                </div>
                <textarea
                  className="form-control mt-3"
                  name="discription"
                  id="discription"
                  cols="30"
                  rows="10"
                  value={cottage.description}
                  placeholder="Discription..."
                ></textarea>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCottage;
