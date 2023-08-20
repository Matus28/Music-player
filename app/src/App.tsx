import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { state: userValue } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={userValue.user ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={!userValue.user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/signup"
            element={userValue.user ? <Signup /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
