import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Users from "./pages/users";
import AddUser from "./pages/addUser";
import EditUser from "./pages/EditUser";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

      </Routes>

    </BrowserRouter>

  );

}


export default App;