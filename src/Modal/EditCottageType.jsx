import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Edit from '../assets/edit.png'
import { translateUtils } from '../utils/translate.utils'
import { cottageTypeUtils } from '../utils/cottage-type.utils'


function EditCottageType(props) {
    const queryClient = useQueryClient()
    const unusedTranslates = useQuery({
        queryKey: ["unusedTranslate"],
        queryFn: translateUtils.getUnusedTranslates
    })
    const editCottage = useMutation({
        mutationFn: cottageTypeUtils.patchCottageType,
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({queryKey: ['cottagetypes']})
        ]),
        onError: (err) => {
            console.log(err);
        }
    })
    const handlCottageType = (e) =>{
        e.preventDefault();
        editCottage.mutate({
            id: props.id,
            name: e.target.editCottageType.value,
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
              <form className="p-4" onSubmit={handlCottageType}>  
                <select className='form-control' name='editCottageType'>
                    {unusedTranslates.data?.length && unusedTranslates.data.map(e=>{
                        return <option key={e.id} value={e.id}>{e.code}</option>
                    })}
                </select>   
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

export default EditCottageType