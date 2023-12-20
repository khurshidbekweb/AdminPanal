import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Edit from '../assets/edit.png'
import { translateUtils } from '../utils/translate.utils'
import { placeUtils } from '../utils/place.utils'


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

function EditPlace(props) {
    const queryClient = useQueryClient()
    const unusedTranslates = useQuery({
        queryKey: ["unusedTranslate"],
        queryFn: translateUtils.getUnusedTranslates
    })
    const editplace = useMutation({
        mutationFn: placeUtils.patchPlace,
        onSuccess: Promise.all([
            queryClient.invalidateQueries({queryKey: ["unusedTranslate"]}),
            queryClient.invalidateQueries({queryKey: ['places']})
        ])
    });
    const handlPlace = async (e) =>{
        e.preventDefault();
        const image = await getBase64(e.target.updeteImg.files[0])
        editplace.mutate({
            id: props.id,
            image,
            name: e.target.editPlace.value,
       })
    }
    return (
        <div>
        <button
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target={`#editModa${props.id}`}
        >
            <img src={Edit} alt="edit" />
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
                <select className='form-control' name='editPlace'>
                    {unusedTranslates.data?.length && unusedTranslates.data.map(e=>{
                        return <option key={e.id} value={e.id}>{e.code}</option>
                    })}
                </select>   
                <input type="file" name='updeteImg' className='mt-2' />
                <button
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
    )
}

export default EditPlace