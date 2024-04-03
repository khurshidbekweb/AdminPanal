import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeUtils } from "../utils/place.utils";
import toastify from "../utils/toastify";
import { multiAddPlace } from "../utils/multiLanguages";
import { useContext } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { QUERY_KEYS, useRegion, useUnusedTranslates } from "../Query";

function AddPlace() {
  const queryClient = useQueryClient();

  // get region
  const region = useRegion();

  // unusedTranslates
  const unusedTranslates = useUnusedTranslates();

  // add place
  const addPlace = useMutation({
    mutationFn: placeUtils.postPalce,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.places],
        }),
        queryClient.invalidateQueries(QUERY_KEYS.unusedTranslates),
        toastify.successMessage("Joy nomi muvaffaqiyatli qo'shildi 🙌"),
      ]);
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage("Hatolik mavjud");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    addPlace.mutate({
      name: e.target.placaname.value,
      image: e.target.file.files[0],
      regionId: e.target.region.value,
    });
  };

  // language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPlace"
      >
        {multiAddPlace[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addPlace"
        tabIndex="-1"
        aria-labelledby="addPlaceLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addPlaceLabel">
                Add Place
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
