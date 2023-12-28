import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { translateUtils } from "../utils/translate.utils";
import { comfortUtils } from "../utils/comfort.utils";
import toastify from "../utils/toastify";
import { useRef } from "react";

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

function AddComfort() {
  const addComfortBtn =useRef(null)
  const queryClient = useQueryClient();
  const unusedTranslates = useQuery({
    queryKey: ["unusedTranslates"],
    queryFn: translateUtils.getUnusedTranslates,
  });
  const addComfort = useMutation({
    mutationFn: comfortUtils.postComfort,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comforts"] })
      toastify.successMessage("Qo'shish muvaffaqiyat amalga oshirildi 🙌")
    },
    onError: (err) => {
      toastify.errorMessage("Kutilgan hato: ", err.message)
    }
  });
  const handlComforts = async (e) => {
    e.preventDefault();
    const image = await getBase64(e.target.comfortImg.files[0]);
    addComfort.mutate({
      name: e.target.comfort.value,
      image,
    });
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add comforts
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Comforts
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlComforts}>
                <select name="comfort" className="form-control">
                  {unusedTranslates.data?.length &&
                    unusedTranslates.data.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.code}
                        </option>
                      );
                    })}
                </select>
                <label className="file-input-label mt-3">
                  <input
                    type="file"
                    name="comfortImg"
                    id="comfort-img"
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
                  <span>Upload Img</span>
                </label>
                <button
                  ref={addComfortBtn}
                  type="submit"
                  aria-label="Close" 
                  data-bs-dismiss= "modal"                 
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

export default AddComfort;
