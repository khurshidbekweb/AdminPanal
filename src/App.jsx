import { Route, Routes} from "react-router-dom";
import Home from "./pages/Dashboart/dashHome";
import Dashboart from "./pages/Dashboart";
import Language from "./pages/Dashboart/Language";
import Comfort from "./pages/Dashboart/Comfort";
import Place from "./pages/Dashboart/Place";
import Translate from "./pages/Dashboart/Translate";
import Region from "./pages/Dashboart/Region";
import Login from "./pages/Login";
import Cottage from "./pages/Dashboart/Cottage";
import Notification from "./pages/Dashboart/Notification";
import CottageType from "./pages/Dashboart/CottageType";
import Roles from "./pages/Dashboart/Roles";
import Users from "./pages/Dashboart/Users";

function App() {
  const language = localStorage.getItem("language");
  if (!language) {
    localStorage.setItem("language", "uz");
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboart" element={<Dashboart />}>
          <Route index element={<Home/>}/>
          <Route path="home" element={<Home />} />
          <Route path="language" element={<Language />} />
          <Route path="comfort" element={<Comfort />} />
          <Route path="place" element={<Place />} />
          <Route path="translate" element={<Translate />} />
          <Route path="region" element={<Region />} />
          <Route path="cottage" element={<Cottage />} />
          <Route path="notification" element={<Notification />} />
          <Route path="cottage-type" element={<CottageType />} />
          <Route path="roles" element={<Roles />} />
          <Route path="user" element={<Users/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
