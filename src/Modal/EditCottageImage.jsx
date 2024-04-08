import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { useRef } from "react";
import { IMG_BASE_URL } from "../constants/img.constants";
import toastify from "../utils/toastify";
import DeleteAllModal from "./DeleteAllModal";

//Lazy load
import { LazyLoadImage } from "react-lazy-load-image-component";

//icons
import { CiEdit } from "react-icons/ci";
import { FaUpload } from "react-icons/fa";
import { QUERY_KEYS } from "../Query";

function EditCottageImage({ id, images }) {
  const mainImage = useRef(null);

  const childImagesWrapper = useRef(null);

  const queryClient = useQueryClient();

  const mainImageCottage = images.find((e) => e.isMainImage === true);
  const childImages = images.filter((e) => e.isMainImage !== true);

  const cottageMainImg = useMutation({
    mutationFn: cottageUtils.patchCottageImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const addCottageImage = useMutation({
    mutationFn: cottageUtils.addCottageImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const deletChilImage = useMutation({
    mutationFn: cottageUtils.deleteCottageImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toastify.successMessage("Success delet image");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const addChildImg = async (e) => {
    addCottageImage.mutate({
      cottageId: id,
      image: e.target.files[0],
      isMain: false,
    });
  };

  const handlCottage = async (e) => {
    e.preventDefault();
  };

  const handleMainImage = async (e) => {
    if (mainImageCottage?.id) {
      cottageMainImg.mutate({
        id: mainImageCottage.id,
        image: e.target.files[0],
      });
      return;
    }

    addCottageImage.mutate({
      cottageId: id,
      image: e.target.files[0],
      isMain: true,
    });
    return;
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editImages${id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal modal-lg fade"
        id={`editImages${id}`}
        tabIndex="-1"
        aria-labelledby={`editImages${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold"
                id={`editImages${id}Label`}
              >
                Cottage Images Updete
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
                <div className="main-image-wrapper d-flex align-items-end justify-content-between border p-3">
                  {mainImageCottage?.image && (
                    <LazyLoadImage
                      ref={mainImage}
                      src={`${IMG_BASE_URL}${mainImageCottage.image}`}
                      alt="main-image"
                      width={450}
                      height={280}
                      className="rounded-3"
                    />
                  )}
                  <label className="file-input-label d-block w-25 text-center mb-2">
                    <input
                      onChange={handleMainImage}
                      type="file"
                      name="mainImage"
                      id="cottage-main-img"
                      className="file-input"
                    />
                    <FaUpload size={30} />
                    <span> Main Img</span>
                  </label>
                </div>
                <div className="imagesMultiple mt-4 border p-2 rounded">
                  <label className="file-input-label d-block w-25 text-center mb-2">
                    <input
                      onChange={addChildImg}
                      type="file"
                      name="childimg"
                      id="cottage-main-img"
                      className="file-input"
                      multiple
                    />
                    <FaUpload size={30} />
                    <span>Child Images</span>
                  </label>
                  <div
                    ref={childImagesWrapper}
                    className="imagesChildWrap mt-4 flex-wrap d-flex gap-4"
                  >
                    {childImages?.length &&
                      childImages.map((e) => {
                        return (
                          <div key={e.id} className="childImgCard">
                            <LazyLoadImage
                              src={`${IMG_BASE_URL}${e.image}`}
                              width={100}
                              height={120}
                              alt="childImages"
                              className="childImage"
                              effect="blur"
                            />
                            <DeleteAllModal
                              deleteFunction={deletChilImage.mutate}
                              id={e.id}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
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

export default EditCottageImage;
