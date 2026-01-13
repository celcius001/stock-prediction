import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { username, password };
    console.log("userData =>", userData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/token/",
        userData,
      );
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("Invalid Credentials", error);
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center">Login to Portal</h3>
            <form action="POST" onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Set Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-danger">{error}</div>}
              {loading ? (
                <button type="submit" className="btn btn-info d-block mx-auto">
                  Logging in...
                </button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
