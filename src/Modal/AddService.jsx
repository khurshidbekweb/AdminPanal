import { FaUpload } from "react-icons/fa";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";
import { useContext, useRef } from "react";
import { SERVICE_CODES } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceUtils } from "../utils/service.utils";
import toastify from "../utils/toastify";
import { LanguageContext } from "../Helper/LanguageContext";
import { multiAddServices } from "../utils/multiLanguages";

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

const AddService = () => {
  const queryClient = useQueryClient();

  const childImagesWrapper = useRef(null);

  // get unusedTranslates
  const unusedTranslates = useUnusedTranslates();

  // multiple img
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

  // add service
  const addService = useMutation({
    mutationFn: serviceUtils.addService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.services] });
      toastify.successMessage("Service muvaffaqiyati yaratildi.");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    addService.mutate({
      name: e.target.name.value,
      description: e.target.description.value,
      code: e.target.code.value,
      images: e.target.serviceImages.files,
    });
  };

  // language change
  const { languageChange } = useContext(LanguageContext);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addService"
      >
        {multiAddServices[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addService"
        tabIndex="-1"
        aria-labelledby="addServiceLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="addServiceLabel">
                Add Service
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handleSubmit}>
                <label className="d-block mb-4">
                  <span className="d-block mb-1">Select name</span>
                  <select name="name" className="form-select ">
                    <option defaultValue selected disabled>
                      Select name
                    </option>
                    {unusedTranslates.data?.length &&
                      unusedTranslates.data.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.code}
                          </option>
                        );
                      })}
                  </select>
                </label>

                <label className="d-block mb-4">
                  <span className="d-block mb-1">Select description</span>
                  <select name="description" className="form-select">
                    <option defaultValue disabled selected>
                      Select description
                    </option>
                    {unusedTranslates.data?.length &&
                      unusedTranslates.data.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.code}
                          </option>
                        );
                      })}
                  </select>
                </label>

                <label className="d-block mb-4">
                  <span className="d-block mb-1">Select service code</span>
                  <select name="code" className="form-select">
                    <option defaultValue disabled selected>
                      Select service code
                    </option>
                    {SERVICE_CODES?.length &&
                      SERVICE_CODES.map((e) => {
                        return (
                          <option key={e.id} value={e.code}>
                            {e.code}
                          </option>
                        );
                      })}
                  </select>
                </label>

                <p className="mb-0">Upload images</p>
                <div className="imagesMultiple border p-2 rounded">
                  <label className="file-input-label d-block w-50 text-center mb-2">
                    <input
                      onChange={handlmultipleImg}
                      type="file"
                      name="serviceImages"
                      className="file-input"
                      multiple
                    />
                    <FaUpload size={25} />
                    <span> Images </span>
                  </label>
                  <div
                    ref={childImagesWrapper}
                    className="imagesChildWrap mt-4 flex-wrap d-flex gap-4"
                  ></div>
                </div>
                <button
                  type="submit"
                  aria-label="Close"
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
};

export default AddService;
