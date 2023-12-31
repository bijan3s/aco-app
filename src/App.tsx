import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Routes from "./routes/AllRoutes";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="relative h-screen">
          <BrowserRouter>
            <Header className="" />
            <Routes />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
