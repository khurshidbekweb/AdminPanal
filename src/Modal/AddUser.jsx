

function AddUser() {
  return (
    <div>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Add User
    </button>
    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">User info</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
                <input type="text" className="form-control"  name="usernamr" id="username"  required placeholder="User name"/>
                <input type="password" className="form-control mt-2" name="password" id="Password" required placeholder="password"/>
                <input type="number" className="form-control mt-2" name="phonenumber" id="phonenumber" placeholder="+998 97 123 45 68"/>
                <label className="d-flex gap-2 align-items-center mt-4">
                    <input className="chakbox" type="checkbox" name="name" id="name" />
                    <span className="d-block fw-medium">Supper admin</span>
                </label>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default AddUser