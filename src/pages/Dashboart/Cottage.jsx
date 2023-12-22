import { useQuery } from "@tanstack/react-query"
import AddCottage from "../../Modal/AddCottage"
import { cottageUtils } from "../../utils/cottage.utils"

function Cottage() {
    const cottage = useQuery({
        queryKey: ['cottages'],
        queryFn: cottageUtils.getCottage
    })   
  return (
    <div className='comforts'>
           <div className="language-haed d-flex justify-content-between">
            <h2>Cottage</h2> 
            <AddCottage/>    
        </div>
        <div className="language-inner">
            <table className="table table-bordered shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Img</th>
                    <th scope="col">Type</th>
                    <th scope="col">Rejion</th>
                    <th scope="col">Place</th>
                    <th scope="col">Price</th>
                    <th scope="col">WeekPrice</th>
                    <th scope="col">Comfort</th>
                    <th scope="col">Disceiption</th>                    
                    <th scope="col">Edit</th>                    
                    <th scope="col">Delet</th>                    
                    </tr>
                </thead>
                <tbody>
                    {cottage.data?.length && cottage.data.map((el, i) => {
                        return <tr key={el.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{el.name}</td>
                                    <td><img src="https://picsum.photos/id/24/50/70" width={50} height={60} alt="img" /></td>
                                    <td>{el.cottageType?.map((e, i) => {
                                        return <p key={i}>{e}</p>
                                    })}</td>
                                    <td>{el.regionId}</td>
                                    <td>{el.placeId}</td>
                                    <td>{el.price}</td>
                                    <td>{el.priceWeekend}$</td>
                                    <td>
                                        {el.comforts?.length && el.comforts.map(e => {
                                            return <p key={Math.random()}>{e}</p>
                                        })}
                                    </td>
                                    <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</td>
                                    <td><button className="btn">✏️</button></td>
                                    <td><button className="btn bg-danger text-white">Delet</button></td>
                                </tr> 
                    })}
                </tbody>
            </table>
        </div>         
    </div>
  )
}

export default Cottage