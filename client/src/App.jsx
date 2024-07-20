import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
const App = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
