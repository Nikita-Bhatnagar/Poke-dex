import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokemon" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
