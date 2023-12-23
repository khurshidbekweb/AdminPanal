import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { languageUtils } from "../utils/language.utils"
import { translateUtils } from "../utils/translate.utils"
import toastify from "../utils/toastify"


function Translate() {
    const queryClient = useQueryClient()
    const language = useQuery({
        queryKey: ["languages_translate"],
        queryFn: languageUtils.getLanguage
    })
    const addTranslate = useMutation({
        mutationFn: translateUtils.postTranslate,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["translates"]})
            toastify.successMessage("Translate muvaffaqiyatli qo'shildi.")
        },
        onError: () => {
            toastify.errorMessage("Hatolik yuz berdi")
        }
    })
    const handlTranslate = (e) => {
        e.preventDefault();
        const definition = {}
        for(let el of language.data){
            definition[el.code] = e.target[el.code].value
        }
        addTranslate.mutate({
            code: e.target.code.value,            
            definition,
            type: e.target.type.value
        })
    }
  return (
            <div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    TRANSLATE
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Translate</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='p-4' onSubmit={handlTranslate}>
                                <input className='w-100 p-1 mb-3 form-control' required type="text" name="code"  placeholder='code: '/>
                                <p className="fw-medium fs-5">Difinition</p>
                                {language?.data?.length && language.data.map(e => {
                                    return <input key={e.id} className='my-2 p-1 w-100 d-block form-control' required type="text" name={e.code} placeholder={e.code}/>
                                })}
                                <select className="form-select form-select-sm p-1" name="type" required aria-label=".form-select-sm example">
                                    <option value="content">Content</option>
                                    <option value="error">Error</option>
                                </select>
                                <button type='submit' data-bs-dismiss="modal" className='btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block'> Add</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
  )
}

export default Translate