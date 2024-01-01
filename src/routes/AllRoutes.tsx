import { Route, Routes } from "react-router-dom";
import Chat from "../pages/web/Chat";
import Login from "../pages/auth/Login";
import authCheck from "../hocs/authCheck";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/chat" Component={authCheck(Chat)} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  );
}
