import "./assets/css/style.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/dashboard/Dashboard";
import AuthProvider from "./AuthProvider";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
