

function AddCottage() {
  return (
    <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Cottage
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">  
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Cottage</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='p-4'>
                            <input className='w-100 p-2 mb-3 form-control' type="text" name="name"  placeholder='Name... '/>
                            <label className="file-input-label d-block w-50 text-center mb-2" >                                    
                                <input type="file" name="comfort-img" id="comfort-img" className="file-input" />
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="upload"
                                    className="svg-inline--fa fa-upload fa-w-16"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    >
                                    <path
                                        fill="currentColor"
                                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                    ></path>
                                </svg>
                            <span>Upload Img</span>
                            </label>
                            <div className="wrap-type-cottage d-flex mt-3 justify-content-between">
                                <label className="d-flex align-items-center w-25 justify-content-evenly">
                                    <p className="type-text fs-5">Дача</p>
                                    <input type="checkbox" name="dacha" id="dachaId" className="fs-4 mb-2" />
                                </label>
                                <label className="d-flex align-items-center w-25 justify-content-evenly">
                                    <p className="type-text fs-5">Пикник</p>
                                    <input type="checkbox" name="dacha" id="dachaId" className="fs-4 mb-2" />
                                </label>
                                <label className="d-flex align-items-center w-25 justify-content-evenly">
                                    <p className="type-text fs-5">Рыбалка</p>
                                    <input type="checkbox" name="dacha" id="dachaId" className="fs-4 mb-2" />
                                </label>
                            </div>     
                            <select className="form-select" aria-label="Default select example">
                                <option selected value='tashkent'>Tashkent</option>
                                <option value="namangan">Namangan</option>
                            </select>
                            <select className="form-select mt-2" aria-label="Default select example">
                                <option selected value='tashkent'>Chorbog`</option>
                                <option value="namangan">Burchmulla</option>
                            </select>
                            <div className="price mt-2 d-flex justify-content-between gap-2">
                                <input className="form-control" type="number" name="price" id="price" placeholder="Price" />
                                <input className="form-control" type="number" name="priceWeek" id="priceWeek" placeholder="Weekend price" />
                            </div>
                            <div className="addnew-objects d-flex justify-content-between mt-4">
                                <div className="addnew-objects-l">
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />                                        
                                        <p className="addnew-object-text">Парковка</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />                                        
                                        <p className="addnew-object-text">WiFi</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Круглосуточная стойка регистрации</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Завтрак</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Обед/ужин</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Семейные номера</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Глажка</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Фитнес-центр</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Прачечная</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Бассейн</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Ресторан</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Место для курение/комната для курящих</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Трансфер от/до аеропорта/вокзал</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Настольный теннис</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Летняя кухня</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Мангал</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Бильярд</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Тапчан</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Сан.узел внутри дома</p>
                                    </div>
                                </div>
                                <div className="addnew-objects-r">
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Бар</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Детская зона</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Комната/зал для проведение переговорови конференц</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Телевизор</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Интернет</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Кондиционер</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Холодильник</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Летный бассейн</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Зимний бассейн</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Камин</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Сауна</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Домашние животные</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        <p className="addnew-object-text">Пункт обмена валют</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Гараж</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Душ/ванна</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Горячая вода</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />
                                        
                                        <p className="addnew-object-text">Детская площадка</p>
                                    </div>
                                    <div className="addnew-object">
                                        <input className="addnew-check" type="checkbox" />                    
                                        <p className="addnew-object-text">Барбекю</p>
                                    </div>
                                </div>
                            </div>
                            <textarea className="form-control mt-3" name="discription" id="discription" cols="30" rows="5" placeholder="Discription..."></textarea>
                            <button type='submit' className='btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block'> Add</button>
                        </form>                        
                    </div>
                </div>                
            </div>            
        </div>        
    </div>
  )
}

export default AddCottage