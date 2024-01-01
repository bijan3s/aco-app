import { BrowserRouter } from "react-router-dom";
import Header from "./components/root/Header";
import Routes from "./routes/AllRoutes";

function App() {
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

export default App;
