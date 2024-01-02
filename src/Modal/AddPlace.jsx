import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { regionUtils } from "../utils/region.utils";
import { placeUtils } from "../utils/place.utils";
import { translateUtils } from "../utils/translate.utils";
import toastify from "../utils/toastify";

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

function AddPlace() {
  const queryClient = useQueryClient();
  const region = useQuery({
    queryKey: ["regions"],
    queryFn: regionUtils.getRegion,
  });

  const unusedTranslates = useQuery({
    queryKey: ["unusedTranslates"],
    queryFn: translateUtils.getUnusedTranslates,
  });

  const addPlace = useMutation({
    mutationFn: placeUtils.postPalce,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["places"],
        }),
        queryClient.invalidateQueries("unusedTranslates"),
        toastify.successMessage("Joy nomi muvaffaqiyatli qo'shildi 🙌")
      ]),
      onError: (err) => {
        console.log(err);
        toastify.errorMessage("Hatolik mavjud")
      }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = await getBase64(e.target.file.files[0]);
    addPlace.mutate({
      name: e.target.placaname.value,
      image: image,
      regionId: e.target.region.value,
    });
    console.log(addPlace.variables);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ADD PLACE
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
                <select name="placaname" className="form-control">
                  {unusedTranslates.data?.length &&
                    unusedTranslates.data.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.code}
                        </option>
                      );
                    })}
                </select>
                <select className="mt-2 form-select mb-4" name="region">
                  {region.data?.length &&
                    region.data.map((e) => {
                      return (
                        <option key={e.id} value={e.id} className="text-dark">
                          {e.name}
                        </option>
                      );
                    })}
                </select>
                <input
                  className="my-2 p-1 w-100 d-block"
                  type="file"
                  name="file"
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
    </>
  );
}

export default AddPlace;
