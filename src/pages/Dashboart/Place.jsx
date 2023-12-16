
import AddPlace from '../../Modal/AddPlace'

function Place() {
  return (
    <div>
        <div className='place'>
        <div className="place-haed d-flex justify-content-between">
            <h2>Place</h2> 
            <AddPlace/>        
        </div>
        <div className="language-inner">
            <table className="table shadow-lg table-bordered table-rounded mt-4">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Img</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Chorbog`</td>
                        <td><img src="https://picsum.photos/id/123/50/50" alt="img" /></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Chirchiq</td>
                        <td><img src="https://picsum.photos/id/23/50/50" alt="img" /></td>
                    </tr>
                </tbody>
            </table>
        </div>         
    </div>
    </div>
  )
}

export default Place