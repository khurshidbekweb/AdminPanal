import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { translateUtils } from "../utils/translate.utils";
import { comfortUtils } from "../utils/comfort.utils";
import { useRef } from "react";
import toastify from "../utils/toastify";

// async function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         resolve(reader.result.split(";base64,")[1]);
//       };
//       reader.onerror = reject;
//     });
//   }

function EditComfort(props) {
  const editCloseBtn = useRef(null);
  const queryClient = useQueryClient();
  const unusedTranslates = useQuery({
    queryKey: ["unusedTranslate"],
    queryFn: translateUtils.getUnusedTranslates,
  });
  const editcomfort = useMutation({
    mutationFn: comfortUtils.patchComfort,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["unusedTranslate"] }),
        queryClient.invalidateQueries({ queryKey: ["comforts"] }),
      ]);
      editCloseBtn.current.setAttribute("data-bs-dismiss", "modal");
      toastify.successMessage("Muaffaqiatli tahrirlandi");
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage(err.message);
    },
  });
  const handlComfort = async (e) => {
    e.preventDefault();
    // const image = await getBase64(e.target.updeteImg.files[0])
    editcomfort.mutate({
      id: props.id,
      image: e.target.updeteImg.files[0],
      name: e.target.editComfort.value,
    });
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editModa${props.id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal fade"
        id={`editModa${props.id}`}
        tabIndex="-1"
        aria-labelledby={`editModa${props.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModa${props.id}Label`}>
                Edit Region
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlComfort}>
                <select className="form-control" name="editComfort">
                  {unusedTranslates.data?.length &&
                    unusedTranslates.data.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.code}
                        </option>
                      );
                    })}
                </select>
                <input type="file" name="updeteImg" className="mt-2" />
                <button
                  ref={editCloseBtn}
                  type="submit"
                  className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 mt-3 text-white d-block"
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

export default EditComfort;
