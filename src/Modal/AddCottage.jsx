import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { regionUtils } from "../utils/region.utils";
import { placeUtils } from "../utils/place.utils";
import { useRef, useState } from "react";
import { comfortUtils } from "../utils/comfort.utils";
import { IMG_BASE_URL } from "../constants/img.constants";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import toastify from "../utils/toastify";

// Images transfer base64
async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result.split(";base64,")[1]);
    };
    reader.onerror = reject;
  });
}
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

function AddCottage() {
  const mainImage = useRef(null);
  const cottageCloseBtn = useRef(null)
  const childImagesWrapper = useRef(null)
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
      queryClient.invalidateQueries({ queryKey: ["cottages"] });
      toastify.successMessage("Qo'shish muvaffaqiyat amalga oshirildi ")
    },
    onError: (err) => {
      console.log(err);
      toastify.successMessage("Kutilgan hato: ", err.message)
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
    console.log(value)
  };
  const handlCottage = async (e) => {
    e.preventDefault();
    const images = []
    images.push({
        image: await getBase64(e.target.mainImage.files[0]),
        isMain: true
    })
    for (let i = 0; i < e.target.childimg.files.length; i++) {
        images.push(
            {
                image: await getBase64(e.target.childimg.files[i]),
                isMain: false,
            }
        )
      }
    cottage.mutate({
      name: e.target.cottagename.value,
      images: images,
      placeId: e.target.place.value,
      regionId: e.target.region.value,
      price: +e.target.price.value,
      priceWeekend: +e.target.priceweekend.value,
      cottageType: cottageInfo.response,
      comforts: cottageComforts.response,
      description: e.target.discription.value,
      latitude: "" || undefined,
      longitude: "" || undefined,
    });
    e.target.cottagename.value = ""
    e.target.price.value = ''
    e.target.priceWeekend.value = ""
    e.target.discription.value =""
    cottageInfo.dachaType = []
    cottageComforts.response = []
  };
  const handleMainImage = async (e) => {
    const mainImgUrl = await getBase64Full(e.target.files[0]);
    mainImage.current.classList.remove("d-none");
    mainImage.current.setAttribute("src", mainImgUrl);
  };
  const handlmultipleImg = async (e) => {
      const images = []
      for (let i = 0; i < e.target.files.length; i++) {
        images.push(await getBase64Full(e.target.files[i]))
      }
      for(const image of images){
          childImagesWrapper.current.insertAdjacentHTML("beforeend", `<img src=${image} width="100" height="100" alt="child image" className="overflow-hidden"/>`)
      }
    };



  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Cottage
      </button>
      <div
        className="modal modal-lg fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
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
                <div className="main-image-wrapper d-flex align-items-end justify-content-between border p-3">
                  <label className="file-input-label d-block w-25 text-center mb-2">
                    <input
                      onChange={handleMainImage}
                      type="file"
                      name="mainImage"
                      id="cottage-main-img"
                      className="file-input"
                    />
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="upload"
                      className="svg-inline--fa fa-upload fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                      ></path>
                    </svg>
                    <span> MainImg</span>
                  </label>
                  <img
                    ref={mainImage}
                    src=""
                    alt="main-image"
                    width={300}
                    height={300}
                    className="d-none rounded-3"
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
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="upload"
                      className="svg-inline--fa fa-upload fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                      ></path>
                    </svg>
                    <span> Child Images </span>
                  </label>
                  <div ref={childImagesWrapper} className="imagesChildWrap mt-4 flex-wrap d-flex gap-4">
                    
                  </div>
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
                        <div
                          className="addnew-object align-items-center gap-2 m-3"
                          key={e.id}
                        >
                          <input
                            className="form-check-input mb-3"
                            type="checkbox"
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


