import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { useState } from "react";
import { IMG_BASE_URL } from "../constants/img.constants";
import { CiEdit } from "react-icons/ci";
import toastify from "../utils/toastify";
import {
  QUERY_KEYS,
  useComforts,
  useCottageType,
  usePlaces,
  useRegion,
} from "../Query";

function EditCottage({ id, cottage }) {
  const cottageTypeUset = [];

  const cottageComfortUset = [];

  if (cottage.cottageType.length) {
    cottage.cottageType.forEach((e) => {
      cottageTypeUset.push(e.id);
    });
  }

  if (cottage.comforts.length) {
    cottage.comforts.forEach((e) => {
      cottageComfortUset.push(e.id);
    });
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toastify.successMessage("Tahrirlash muvaffaqiyat bajarildi");
    },
    onError: (err) => {
      console.log(err);
      toastify.successMessage("Hatolik mavjud");
    },
  });

  const region = useRegion();

  const place = usePlaces();

  const comforts = useComforts();

  const cottageType = useCottageType();

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
      name: e.target.cottagename.value,
      cottageStatus: e.target.cottageStatus.value,
      placeId: e.target.place.value,
      regionId: e.target.region.value,
      price: +e.target.price.value,
      priceWeekend: +e.target.priceweekend.value,
      cottageType: cottageInfo.response,
      comforts: cottageComforts.response,
      description: e.target.discription.value,
      lattitude: "",
      longitude: "",
      isTop: e.target.bannerStatus.value === "true" ? true : false,
      status: e.target.status.value === "true" ? "active" : "inactive",
    });
    console.log(cottageEdit.variables);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editCottageModal${id}`}
      >
        <CiEdit size={25} />
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
                <label className="d-block mb-3">
                  <span className="d-block mb-1">Cottage name</span>
                  <input
                    className="w-100 p-2  form-control"
                    type="text"
                    name="cottagename"
                    placeholder="Cottage name"
                    defaultValue={cottage.name}
                  />
                </label>

                <p className="mb-0">Edit cottage type</p>
                <div className="wrap-type-cottage d-flex align-items-center gap-5">
                  {cottageType.data?.length &&
                    cottageType.data.map((e) => {
                      return (
                        <label
                          key={e.id}
                          className="d-flex align-items-center gap-2  justify-content-evenly"
                        >
                          <p className="type-text fs-5 d-block">{e.name}</p>
                          <input
                            className="form-check-input mb-3"
                            type="checkbox"
                            onChange={handlChoseCottageType}
                            name={e.id}
                            value={e.id}
                            checked={
                              cottageInfo.dachaType.includes(e.id)
                                ? true
                                : false
                            }
                          />
                        </label>
                      );
                    })}
                </div>
                <label className="d-block mb-3">
                  <span className="d-block mb-1">Edit cottage region</span>
                  <select
                    className="form-select"
                    name="region"
                    aria-label="Default select example"
                    defaultValue={cottage.region.id}
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
                </label>
                <label className="d-block mb-2">
                  <span className="d-block mb-1">Edit cottage place</span>
                  <select
                    className="form-select"
                    name="place"
                    aria-label="Default select example"
                    defaultValue={cottage.place.id}
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
                </label>
                <div className="select-mini-wrap d-flex gap-2 mb-3 row">
                  <label className="d-block col">
                    <span className="d-block mb-1">Progress</span>
                    <select
                      defaultValue="progress"
                      name="cottageStatus"
                      className="form-select"
                    >
                      <option value="progress">Progress</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </label>
                  <label className="d-block col">
                    <span className="d-block mb-1">Banner</span>
                    <select
                      defaultValue="banner"
                      name="bannerStatus"
                      className="form-select"
                    >
                      <option value="banner" disabled>
                        Banner
                      </option>
                      <option value="true">Bannerga qo`shish</option>
                      <option value="false">Bannerga o`chirish</option>
                    </select>
                  </label>
                  <label className="d-block col">
                    <span className="d-block mb-1">Status</span>
                    <select
                      name="status"
                      defaultValue="true"
                      className="form-select"
                    >
                      <option value="true">Active</option>
                      <option value="falce">Inactive</option>
                    </select>
                  </label>
                </div>
                <div className="price mt-2 d-flex justify-content-between gap-2 mb-3">
                  <label className="d-block w-50">
                    <span className="text-start d-block Cottage Price">
                      Edit cottage price
                    </span>
                    <input
                      className="form-control"
                      type="number"
                      name="price"
                      id="price"
                      defaultValue={cottage.price}
                    />
                  </label>
                  <label className="d-block w-50">
                    <span className="d-block">Edit weekend price</span>
                    <input
                      className="form-control"
                      type="number"
                      name="priceweekend"
                      id="priceWeek"
                      defaultValue={cottage.priceWeekend}
                      placeholder="Weekend price"
                    />
                  </label>
                </div>

                <p className="mb-1">Select cottage comforts</p>
                <div className="addnew-objects d-flex flex-wrap mb-3">
                  {comforts.data?.length &&
                    comforts.data.map((e) => {
                      return (
                        <label className="addnew-object gap-2" key={e.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                              cottageComforts.comforts.includes(e.id)
                                ? true
                                : false
                            }
                            name={e.id}
                            value={e.id}
                            onChange={handleCottageComforts}
                          />
                          <img src={`${IMG_BASE_URL}${e.image}`} alt="img" />
                          <p className="mb-0">{e.name}</p>
                        </label>
                      );
                    })}
                </div>
                <label className="d-block">
                  <span className="d-block mb-1">Cottage description</span>
                  <textarea
                    className="form-control"
                    name="discription"
                    id="discription"
                    cols="30"
                    rows="10"
                    defaultValue={cottage.description}
                    placeholder="Discription..."
                  ></textarea>
                </label>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Save changes
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
