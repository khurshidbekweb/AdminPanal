import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { useRef } from "react";
import { IMG_BASE_URL } from "../constants/img.constants";
import Delet from '../assets/trash.png'

// Images transfer base64
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
function EditCottageImage({id, images}) {
  const mainImage = useRef(null);
  const childImagesWrapper = useRef(null) 
  const queryClient = useQueryClient();
  const mainImageCottage = images.find(e => e.isMainImage === true)
  const childImages = images.filter((e) => e.isMainImage !== true)
  const cottageMainImg = useMutation({
    mutationFn: cottageUtils.patchCottageImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cottages"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const addChildImages = useMutation({
    mutationFn: cottageUtils.postCHildImages,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['cottages']})
    },
    onError: (err) => {
        alert(err.message)
    }
  })
  const deletChilImage = useMutation({
    mutationFn: cottageUtils.deleteCottageImage,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['cottages']})
        alert("Success delet image")
    },
    onError: (err) => {
        console.log(err);
    }
  })
  const addChildImg = async (e) => {
    addChildImages.mutate({
        cottageId: id,
        image: await getBase64(e.target.files[0]) 
    })
  }
  const handlCottage = async (e) => {
    e.preventDefault();   
  };
  const handleMainImage = async (e) => {
    cottageMainImg.mutate({
        id: mainImageCottage.id,
        image: await getBase64(e.target.files[0])
    })
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#editImages${id}`}
      >
        Edit
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
              <h1 className="modal-title fs-5 fw-bold" id={`editImages${id}Label`}>
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
                  <label className="file-input-label d-block w-25 text-center mb-2">
                    <input
                      onChange={handleMainImage}
                      type="file"
                      name="mainImage"
                      id="cottage-main-img"
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
                    <span> MainImg</span>
                  </label>
                  <img
                    ref={mainImage}
                    src = {`${IMG_BASE_URL}${mainImageCottage.image}`}
                    alt="main-image"
                    width={250}
                    height={280}
                    className="rounded-3"
                  />
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
                    <span>Child Images</span>                    
                  </label>
                  <div ref={childImagesWrapper} className="imagesChildWrap mt-4 flex-wrap d-flex gap-4">
                    {childImages?.length && childImages.map(e => {
                        return <div key={e.id} className="childImgCard">
                                    <img  src={`${IMG_BASE_URL}${e.image}`} width={100} height={120} alt="childImages" className="childImage"/>
                                    <button onClick={()=> deletChilImage.mutate(e.id)} className="deletChildImg btn"><img src={Delet} alt="delet" /></button>
                                </div>
                    })}
                  </div>
                </div>      
                <button
                  type="submit"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
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

export default EditCottageImage;
