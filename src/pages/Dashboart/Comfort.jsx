import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import AddComfort from "../../Modal/AddComfort"
import { comfortUtils } from "../../utils/comfort.utils"
import { IMG_BASE_URL } from "../../constants/img.constants"
import EditComfort from "../../Modal/EditComfort"
import Delet from '../../assets/trash.png'


function Comfort() {
    const queryClient = useQueryClient()
    const comforts = useQuery({
        queryKey: ['comforts'],
        queryFn: comfortUtils.getComfort
    }) 
    const deletComfort = useMutation({
        mutationFn: comfortUtils.deleteComfort,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['comforts']})
        }
    }) 
  return (
    <div className='comforts'>
           <div className="language-haed d-flex justify-content-between">
            <h2>Comfort</h2>     
            <AddComfort/>      
        </div>
        <div className="language-inner">
            <table className="table table-bordered shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Img</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delet</th>
                    </tr>
                </thead>
                <tbody>
                    {comforts.data?.length && comforts.data.map((e, i)=> {
                        return <tr key={e.id}>
                                    <th scope="row">{i+1}</th>
                                    <td className="fw-medium fs-5">{e.name}</td>
                                    <td><img src={`${IMG_BASE_URL}${e.image}`} width={50} height={60} alt="img" /></td>
                                    <td><EditComfort id={e.id}/></td>
                                    <td><button className="btn" onClick={()=> deletComfort.mutate(e.id)}><img src={Delet} alt="remove" /></button></td>
                                </tr> 
                    })}
                </tbody>
            </table>
        </div>         
    </div>
  )
}

export default Comfort