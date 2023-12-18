import AddCottage from "../../Modal/AddCottage"

function Cottage() {
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Cottage</td>
                        <td><img src="https://picsum.photos/id/24/50/70" width={50} height={60} alt="img" /></td>
                        <td>Dacha, Picnik, Baliq ovi</td>
                        <td>Tashkent</td>
                        <td>Chorbog`</td>
                        <td>150$</td>
                        <td>200$</td>
                        <td>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis sint nisi explicabo ut voluptatem possimus facere quasi autem, nesciunt dignissimos incidunt provident nulla doloribus velit? Harum ducimus modi alias libero.
                        </td>
                        <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore a nisi est pariatur necessitatibus provident odit magni officiis esse, inventore animi cumque dolor unde mollitia magnam maiores dolore dolorem nesciunt.</td>
                    </tr>                   
                </tbody>
            </table>
        </div>         
    </div>
  )
}

export default Cottage