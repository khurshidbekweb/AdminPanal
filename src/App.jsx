import { Route, Routes } from "react-router-dom"
import Home from './pages/Dashboart/dashHome'
import Dashboart from './pages/Dashboart'
import Language from "./pages/Dashboart/Language"
import Comfort from "./pages/Dashboart/Comfort"
import Place from "./pages/Dashboart/Place"
import Translate from "./pages/Dashboart/Translate"
import Region from "./pages/Dashboart/Region"
import Login from "./pages/Login"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboart" element={<Dashboart/>}>
          <Route path="home" element ={<Home/>}/>
          <Route path="language" element ={<Language/>}/>
          <Route path="comfort" element ={<Comfort/>}/>
          <Route path="place" element={<Place/>}/>
          <Route path="translate" element={<Translate/>}/>
          <Route path="region" element={<Region/>}/>
        </Route>        
      </Routes>
    </div>
  )
}

export default App
