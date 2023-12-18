

function Translate() {
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
                            <form className='p-4'>
                                <input className='w-100 p-1 mb-3 form-control' type="text" name="code"  placeholder='code: '/>
                                <p className="fw-medium fs-5">Difinition</p>
                                <input className='my-2 p-1 w-100 d-block form-control' type="text" name="uz" placeholder='uz: '/>
                                <input className='my-2 p-1 w-100 d-block form-control' type="text" name="ru" placeholder='ru: '/>
                                <select className="form-select form-select-sm p-1" aria-label=".form-select-sm example">
                                    <option selected hidden >Choos text type</option>
                                    <option value="content">Content</option>
                                    <option value="error">Error</option>
                                </select>
                                <button type='submit' className='btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block'> Add</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
  )
}

export default Translate