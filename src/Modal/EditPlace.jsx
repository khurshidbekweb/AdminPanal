import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { translateUtils } from "../utils/translate.utils";
import { placeUtils } from "../utils/place.utils";
import toastify from "../utils/toastify";

function EditPlace(props) {
  const queryClient = useQueryClient();
  const unusedTranslates = useQuery({
    queryKey: ["unusedTranslate"],
    queryFn: translateUtils.getUnusedTranslates,
  });
  const editplace = useMutation({
    mutationFn: placeUtils.patchPlace,
    onSuccess: () =>
      Promise.all([
        toastify.successMessage("Joy nomi muvaffaqiyatli o'zgartirildi 🙌"),
        queryClient.invalidateQueries({ queryKey: ["unusedTranslate"] }),
        queryClient.invalidateQueries({ queryKey: ["places"] }),
      ]),
    onError: (err) => {
      toastify.errorMessage("Hatolik yuz berdi 😣");
      console.log(err);
    },
  });
  const handlPlace = async (e) => {
    e.preventDefault();
    editplace.mutate({
      id: props.id,
      image: e.target.updeteImg.files[0],
      name: e.target.editPlace.value,
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
              <form className="p-4" onSubmit={handlPlace}>
                <select className="form-control" name="editPlace">
                  {unusedTranslates.data?.length &&
                    unusedTranslates.data.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.code}
                        </option>
                      );
                    })}
                </select>
                <input type="file" name="updeteImg" className="mt-4" />
                <button
                  type="submit"
                  data-bs-toggle="modal"
                  className="btn-modal bg-success btn fs-6 fw-bold rounded-2 mt-3 text-white d-block"
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

export default EditPlace;
