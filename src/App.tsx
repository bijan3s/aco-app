import { BrowserRouter } from "react-router-dom";
import Header from "./components/root/Header";
import Routes from "./routes/AllRoutes";
import { authState } from "./redux/actions/authActions";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

function App({ isAuthenticated }: { isAuthenticated: boolean }) {
  const dispatch = useDispatch();
  if (!isAuthenticated && Cookies.get("bearerToken")) {
    dispatch(authState());
  }
  return (
    <>
      <div className="relative h-screen">
        <BrowserRouter>
          <Header className="" />
          <Routes />
        </BrowserRouter>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  authState,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
