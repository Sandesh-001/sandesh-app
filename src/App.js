import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Master from "./Components/Master";
import Student from "./Components/Student";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/master" element={<Master />} />
        <Route path="/student" element={<Student />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
