
import React from "react";
import { Routes,  Route, BrowserRouter as Router } from "react-router-dom";



import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import PrivateRoute from "./Private-route";







function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Register />} />
           <PrivateRoute exact  component={Home} path="/"/>
    
     
      </Routes>
    </Router>
  );
}

export default AppRoutes;
