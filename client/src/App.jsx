import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
const App = () => {
  axios.defaults.baseURL = "http://localhost:3000/api";
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
