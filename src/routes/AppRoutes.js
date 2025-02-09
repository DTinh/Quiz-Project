import { Routes, Route } from "react-router";
import User from "../components/User/User";
import HomePage from "../components/Home/HomePage";

const AppRoutes = (props) => {


    return (
       <Routes>
            <Route index element={<HomePage />} />
            <Route path="users" element={<User />} />
      </Routes>
    )
}
export default AppRoutes;