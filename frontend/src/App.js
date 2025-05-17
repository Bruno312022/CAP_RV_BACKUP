import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Cadatro from "./Components/Cadastro"
import sideBar from "./Components/Sidebar";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadatro/>} />
        <Route path="/Sidebar" element={<Sidebar/>} />
      </Routes>
    </Router>
  );
}

export default App;

