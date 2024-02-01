import { useMutation, useQueryClient } from "@tanstack/react-query"
import { languageUtils } from "../utils/language.utils";
import Edit from '../assets/edit.png'
function EditLanguage(props) {
    const queryClient = useQueryClient();
    
    const editLanguage = useMutation({
        mutationFn: languageUtils.pachtLanguage,
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["languages"]})
        },
        onError: (e) =>{
          alert(e.message)
        }
    })    
    const patchLanguage = (e) => {
        e.preventDefault();
        editLanguage.mutate({
          id: props.id,
          title: e.target.title.value
        })
    }

  return (
    <div className="edit-language">

      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={`#editModal${props?.id}`}
      >
        <img src={Edit} alt="edit" />
      </button>
      <div
        className="modal fade"
        id={`editModal${props?.id}`}
        tabIndex="-1"
        aria-labelledby={`editModal${props?.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModal${props?.id}Label`}>
                Edit Language
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={patchLanguage}>
                <input
                  className="my-2 p-1 w-100 d-block"
                  type="text"
                  name="title"
                  placeholder="ex: O`zbek tili"
                />
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLanguage