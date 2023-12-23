import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./modal.css";
import { languageUtils } from "../utils/language.utils";
import toastify from "../utils/toastify";

function AddLanguage() {  
  const queryClient = useQueryClient();
  const addLanguage = useMutation({
    mutationFn: languageUtils.postLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] })
      toastify.successMessage("Til muvaffaqiyati yaratildi.")
    },
    onError: (err) => {
        console.log(err)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    addLanguage.mutate({
        code: e.target.code.value,
        title: e.target.title.value
    })
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ADD LANGUAGE
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
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
                <input
                  className="w-100 p-1"
                  type="text"
                  name="code"
                  placeholder="ex: uz"
                  required
                />
                <input
                  className="my-2 p-1 w-100 d-block"
                  type="text"
                  name="title"
                  placeholder="ex: O`zbek tili"
                  required
                />
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
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

export default AddLanguage;
