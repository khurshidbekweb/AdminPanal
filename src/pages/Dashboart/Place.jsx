
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AddPlace from '../../Modal/AddPlace'
import Delete from '../../assets/trash.png'
import { placeUtils } from '../../utils/place.utils'
import { IMG_BASE_URL } from '../../constants/img.constants'
import EditPlace from '../../Modal/EditPlace'
import toastify from '../../utils/toastify'
function Place() {
    const queryClient = useQueryClient()
    const place = useQuery({
        queryKey: ["places"],
        queryFn: placeUtils.getPlace
    })
    console.log(place.data);
    const delePlace = useMutation({
        mutationFn: placeUtils.deletePlace,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["places"]})
            toastify.infoMessage("Joy nomi o'chirildi")
        }
    })
  return (
    <div>
        <div className='place'>
        <div className="place-haed d-flex justify-content-between">
            <h2>Place</h2> 
            <AddPlace/>        
        </div>
        <div className="language-inner">
            <table className="table shadow-lg  table-rounded mt-4">
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
                    {place.data?.length && place.data.map((e, i)=>{
                        return <tr key={e.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{e.name}</td>
                                    <td><img width={95} height={65} src={`${IMG_BASE_URL}${e.image}`} alt="img" /></td>
                                    <td><EditPlace id={e.id}/></td>
                                    <td><button className="btn" onClick={()=> delePlace.mutate(e.id)}><img src={Delete} alt="delete"/></button></td>
                                </tr> 
                    })}
                </tbody>
            </table>
        </div>         
    </div>
    </div>
  )
}

export default Place