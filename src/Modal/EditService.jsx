import { CiEdit } from "react-icons/ci";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";
import { SERVICE_CODES } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceUtils } from "../utils/service.utils";
import { useRef } from "react";
import { FaUpload } from "react-icons/fa";

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

const EditService = ({ id }) => {
  const queryClient = useQueryClient();
  const unusedTranslates = useUnusedTranslates();

  const childImagesWrapper = useRef(null);

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

  // edit service function
  const editService = useMutation({
    mutationFn: serviceUtils.editService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.services] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  // on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    editService.mutate({
      id: id,
      name: e.target.serviceName.value,
      description: e.target.serviceDescription.value,
      images: e.target.serviceImages.files,
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editService${id}`}
      >
        <CiEdit size={30} />
      </button>

      <div
        className="modal fade"
        id={`editService${id}`}
        tabIndex="-1"
        aria-labelledby={`editService${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`editService${id}Label`}>
                Edit service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label className="d-block mb-3">
                  <span className="d-block mb-1">Edit Service name</span>
                  <select className="form-select" name="serviceName">
                    <option defaultValue value="" selected>
                      select service name
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

                <label className="d-block mb-3">
                  <span className="d-block mb-1">Edit description</span>
                  <select name="serviceDescription" className="form-select">
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

                <p className="mb-0">Upload images</p>
                <div className="imagesMultiple border p-2 rounded mb-4">
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

                <div className="text-end">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;
