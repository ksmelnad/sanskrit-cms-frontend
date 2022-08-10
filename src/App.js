import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Homepage/Home.js";
import Login from "./components/Loginpage/Login.js";
import Create from "./components/CRUD/create.js";
import Navbarcomp from "./components/Navbar/Navbarcomp.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { myContext } from "./Context.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import PublicTexts from "./components/PublicTexts/PublicTexts.js";
import Error from "./components/Error.js";
import Text from "./components/CRUD/text.js";
import Edit from "./components/CRUD/edit.js";
import NoPage from "./components/Nopage.js";

function App() {
  const context = useContext(myContext);

  return (
    <BrowserRouter>
      <Navbarcomp />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
        {context ? (
          <>
            <Route path="/create" element={<Create />} />
            <Route path="/text/:id" element={<Text />} />
            <Route path="/edit/:id" element={<Edit />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/public" element={<PublicTexts />} />
            <Route path="*" element={<Error />} />
          </>
        ) : (
          <Route path="*" element={<NoPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
