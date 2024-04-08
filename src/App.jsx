import { Route, Routes } from "react-router-dom";
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
import { useState } from "react";
import { LanguageContext } from "./Helper/LanguageContext";
import { useQueryClient } from "@tanstack/react-query";
import Services from "./pages/Dashboart/Services";
import Tariff from "./pages/Dashboart/Tariff";

function App() {
  const queryClient = useQueryClient();

  if (!localStorage.getItem("language")) localStorage.setItem("language", "uz");

  const [languageChange, setLanguageChange] = useState(
    localStorage.getItem("language")
  );

  const toggleLanguage = (e) => {
    localStorage.setItem("language", e.target.value);
    setLanguageChange(e.target.value);
    queryClient.invalidateQueries({ type: "all" });
  };

  return (
    <div className="App">
      <LanguageContext.Provider value={{ languageChange, toggleLanguage }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboart" element={<Dashboart />}>
            <Route index element={<Home />} />
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
            <Route path="user" element={<Users />} />
            <Route path="services" element={<Services />} />
            <Route path="tariff" element={<Tariff />} />
          </Route>
        </Routes>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
