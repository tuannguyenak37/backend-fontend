import "./App.scss";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesLogin from "../router_page/RoutesLogin"; // Đảm bảo đường dẫn đúng đến file RoutesLogin.js

function App() {
  return (
    <BrowserRouter>
      <RoutesLogin />
    </BrowserRouter>
    
  );
}

export default App;
