import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { useContext, useRef, useState } from "react";
import { IMG_BASE_URL } from "../constants/img.constants";
import toastify from "../utils/toastify";
import { LanguageContext } from "../Helper/LanguageContext";
import { multiAddCottage } from "../utils/multiLanguages";

// Images transform getbase64Full
async function getBase64Full(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

//icons
import { FaUpload } from "react-icons/fa";
import {
  QUERY_KEYS,
  useComforts,
  useCottageType,
  usePlaces,
  useRegion,
} from "../Query";

function AddCottage() {
  const cottageCloseBtn = useRef(null);
  const childImagesWrapper = useRef(null);
  const mainImage = useRef(null);

  const [cottageInfo, setCottageInfo] = useState({
    dachaType: [],
    response: [],
  });

  const [cottageComforts, setcottageComforts] = useState({
    comforts: [],
    response: [],
  });

  const queryClient = useQueryClient();

  const cottage = useMutation({
    mutationFn: cottageUtils.postCottage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toastify.successMessage("Qo'shish muvaffaqiyat amalga oshirildi ");
    },
    onError: (err) => {
      toastify.errorMessage(err);
      console.log("error:", err);
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
  };

  const handlCottage = (e) => {
    e.preventDefault();
    const images = [];
    for (let i = 0; i < e.target.childimg.files.length; i++) {
      images.push(e.target.childimg.files[i]);
    }
    cottage.mutate({
      name: e.target.cottagename.value,
      images: images,
      mainImage: e.target.mainImage.files[0],
      placeId: e.target.place.value,
      regionId: e.target.region.value,
      price: Number(e.target.price.value),
      priceWeekend: Number(e.target.priceweekend.value),
      cottageType: cottageInfo.response,
      comforts: cottageComforts.response,
      description: e.target.discription.value,
    });
  };

  const isMainImage = async (e) => {
    mainImage.current.src = await getBase64Full(e.target.files[0]);
    mainImage.current.classList.remove("d-none");
  };

  const handlmultipleImg = async (e) => {
    const images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(await getBase64Full(e.target.files[i]));
    }
    for (const image of images) {
      childImagesWrapper.current.insertAdjacentHTML(
        "beforeend",
        `<img src=${image} width="100" height="100" alt="child image" className="overflow-hidden"/>`
      );
    }
  };

  // language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addCottage"
      >
        {multiAddCottage[languageChange]}
      </button>
      <div
        className="modal modal-lg fade"
        id="addCottage"
        tabIndex="-1"
        aria-labelledby="addCottageLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="addCottageLabel">
                Cottage
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
                  placeholder="Name... "
                />
                <div className="imagesMultiple mt-4 border p-2 rounded">
                  <label className="file-input-label d-block w-25 text-center mb-2">
                    <input
                      onChange={isMainImage}
                      type="file"
                      name="mainImage"
                      id="cottage-main-img"
                      className="file-input"
                    />
                    <FaUpload size={25} />
                    <span> Main Images </span>
                  </label>
                  <img
                    ref={mainImage}
                    width={150}
                    height={170}
                    src=""
                    alt="img"
                    className="main-image d-none"
                  />
                </div>
                <div className="imagesMultiple mt-4 border p-2 rounded">
                  <label className="file-input-label d-block w-25 text-center mb-2">
                    <input
                      onChange={handlmultipleImg}
                      type="file"
                      name="childimg"
                      id="cottage-main-img"
                      className="file-input"
                      multiple
                    />
                    <FaUpload size={25} />
                    <span> Child Images </span>
                  </label>
                  <div
                    ref={childImagesWrapper}
                    className="imagesChildWrap mt-4 flex-wrap d-flex gap-4"
                  ></div>
                </div>
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
                            name={e.id}
                            value={e.id}
                            onChange={handlChoseCottageType}
                          />
                        </label>
                      );
                    })}
                </div>
                <select
                  className="form-select"
                  name="region"
                  aria-label="Default select example"
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
                <div className="price mt-2 d-flex justify-content-between gap-2">
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                  />
                  <input
                    className="form-control"
                    type="number"
                    name="priceweekend"
                    id="priceWeek"
                    placeholder="Weekend price"
                  />
                </div>
                <div className="addnew-objects d-flex flex-wrap mt-4">
                  {comforts.data?.length &&
                    comforts.data.map((e) => {
                      return (
                        <div className="addnew-object  gap-2 m-3" key={e.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={e.id}
                            value={e.id}
                            onChange={handleCottageComforts}
                          />
                          <img
                            className="mb-3"
                            src={`${IMG_BASE_URL}${e.image}`}
                            alt="img"
                          />
                          <p className="addnew-object-text">{e.name}</p>
                        </div>
                      );
                    })}
                </div>
                <textarea
                  className="form-control mt-3"
                  name="discription"
                  id="discription"
                  cols="30"
                  rows="10"
                  placeholder="Discription..."
                ></textarea>
                <button
                  ref={cottageCloseBtn}
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCottage;
