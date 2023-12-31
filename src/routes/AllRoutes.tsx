import { Route, Routes } from "react-router-dom";
import Chat from "../pages/web/Chat";
import AuthRoutes from "./auth/AuthRoutes";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/chat" Component={Chat} />
      </Routes>
      <AuthRoutes />
    </>
  );
}
