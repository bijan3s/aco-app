import { Route, Routes } from "react-router-dom";
import Chat from "../pages/web/Chat";
import Login from "../pages/auth/Login";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/chat" Component={Chat} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  );
}
