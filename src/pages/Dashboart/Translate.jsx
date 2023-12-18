import AddTranslate from '../../Modal/AddTranslate'

function Translate() {
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
                            <th scope="col">Language</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <th scope="row">1</th>
                              <td>uz</td>
                              <td>O`zbek tili</td>
                          </tr>
                          <tr>
                              <th scope="row">2</th>
                              <td>en</td>
                              <td>Ingliz tili</td>
                          </tr>
                      </tbody>
                  </table>
              </div>         
        </div>
  )
}

export default Translate