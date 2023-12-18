import AddComfort from "../../Modal/AddComfort"


function Comfort() {
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td className="fw-medium fs-5">Hello</td>
                        <td><img src="https://picsum.photos/id/24/50/70" width={50} height={60} alt="img" /></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td className="fw-medium fs-5">Camfort</td>
                        <td><img src="https://picsum.photos/id/25/50/70" alt="img" /></td>
                    </tr>
                </tbody>
            </table>
        </div>         
    </div>
  )
}

export default Comfort