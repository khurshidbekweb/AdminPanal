import { useQuery } from "@tanstack/react-query"
import { cottageTypeUtils } from "../../utils/cottage-type.utils"
import Delet from '../../assets/trash.png'

function CottageType() {
  const cottageType = useQuery({
    queryKey: ['cottagetypes'],
    queryFn: cottageTypeUtils.getCottageType
  })

  return (
    <div>
      <div className="place">
        <div className="place-haed d-flex justify-content-between">
          <h2>Region</h2>
        </div>
        <div className="language-inner">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delet</th>
              </tr>
            </thead>
            <tbody>
                  {cottageType.data?.length && cottageType.data.map((e, i) => {
                    return  <tr key={e.id}>
                              <th scope="row">{i + 1}</th>
                              <td>{e.name}</td>
                              <td></td>
                              <td><button className="btn"><img src={Delet} alt="delet" /></button></td>
                            </tr> 
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CottageType