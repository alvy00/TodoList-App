import "./components.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      toast.error("Please fill in all fields");
      return;
    }

    const body = { username, password };

    try {
      const response = await fetch(
        "https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("username", username);
        toast.success("Logged in");
        navigate("/dashboard");
      } else {
        toast.error(data.detail || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-text">Login</div>
        <h5>(For testing username: a pass: a)</h5>
        <br />

        <TextField
          fullWidth
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
        />
        <br /><br />

        <TextField
          fullWidth
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <br /><br />

        <Button fullWidth variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <br /><br />

        <div style={{ color: "white", fontWeight: 300 }}>
          Don’t have an account?
          <Button
            onClick={() => navigate("/signup")}
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
