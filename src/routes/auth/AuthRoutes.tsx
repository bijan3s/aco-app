import { Route, Routes } from "react-router-dom";
import Login from "../../pages/auth/Login";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
    </Routes>
  );
}
