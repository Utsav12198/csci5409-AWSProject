import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SellProduct from "./components/SellProduct";
import ViewProduct from "./components/ViewProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          {/* <Route path="/" element={<Navigationbar />}></Route> */}
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/sellcar" element={<SellProduct />}></Route>
          <Route path="/viewcar" element={<ViewProduct />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
