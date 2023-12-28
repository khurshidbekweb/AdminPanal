import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AddTranslate from '../../Modal/AddTranslate'
import Delete from '../../assets/trash.png'
import { translateUtils } from '../../utils/translate.utils'
import toastify from '../../utils/toastify'
import { authUtils } from '../../utils/auth.utils'

function Translate() {
    const queryClient = useQueryClient()
    const translate = useQuery({
         queryKey: ["translates"],
         queryFn: translateUtils.getTranslate,
    })

    if(translate.isError && translate.error.response.status == 406){
        authUtils.refreshAuth()
    }
    const deletTranslate = useMutation({
        mutationFn: translateUtils.deleteTranslate,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["translates"]})
            toastify.successMessage("Translate muvaffaqiyatli o'chirildi.")
        },
        onError: (err) => {
            toastify.errorMessage("Kutilgan hato", err.message)
        }
    })
  return (
            <div className='translate'>
              <div className="translate-haed d-flex justify-content-between">
                  <h2>Translate</h2>   
                  <AddTranslate/>         
              </div>
              <div className="translate-inner">
                  <table className="table">
                      <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Code</th>
                            <th scope="col">Type</th>
                            <th scope="col">Definition</th>
                            <th scope="col">Status</th>
                            <th scope='col'>Delet</th>
                          </tr>
                      </thead>
                      <tbody>
                          {translate?.data?.length && translate.data.map((e, i) => {
                            return <tr key={e.id}>
                                        <th scope="row">{i+1}</th>
                                        <td>{e.code}</td>
                                        <td>{e.type}</td>
                                        <td>
                                            {e.definition.map(e => {
                                                return <div className="d-flex gap-1 lh-1" key={Math.random()}>
                                                            <strong>{e.language.code}: </strong> <p>{e.value}</p>
                                                        </div>
                                            })}
                                        </td>
                                        <td><button className={e.status === "inactive" ? "bg-danger ds-6 text-white btn btn-group fw-medium" : "bg-success text-white btn btn-group fw-medium"}>{e.status}</button></td>
                                        <td><button className='btn' onClick={()=> deletTranslate.mutate(e.id)}><img src={Delete} alt="delele" /></button></td>
                                    </tr>
                          })}
                      </tbody>
                  </table>
              </div>         
        </div>
  )
}

export default Translate