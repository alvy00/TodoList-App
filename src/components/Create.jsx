import "./components.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Create() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const isValidPhone = (phone) => /^\d{11}$/.test(phone);
  const isStrongPassword = (pass) => pass.length >= 6;

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Only Gmail addresses are allowed";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!isValidPhone(formData.phone))
      newErrors.phone = "Phone must be 11 digits";

    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.password) newErrors.password = "Password is required";
    else if (!isStrongPassword(formData.password))
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateClick = async () => {
    if (!validateInputs()) {
      toast.error("Please fix the errors");
      return;
    }

    const body = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      username: formData.username,
      password: formData.password,
      profile_picture: ""
    };

    try {
      const response = await fetch(
        "https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      const data = await response.json();
      toast(data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: ""
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="create">
      <div className="create-container">
        <div className="create-text">Create an account</div>
        <br />

        <TextField
          fullWidth
          placeholder="Name"
          value={formData.name}
          onChange={handleChange("name")}
          error={!!errors.name}
          helperText={errors.name}
        />
        <br />

        <TextField
          fullWidth
          placeholder="Email"
          value={formData.email}
          onChange={handleChange("email")}
          error={!!errors.email}
          helperText={errors.email}
        />
        <br />

        <TextField
          fullWidth
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange("phone")}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <br />

        <TextField
          fullWidth
          placeholder="Username"
          value={formData.username}
          onChange={handleChange("username")}
          error={!!errors.username}
          helperText={errors.username}
        />
        <br />

        <TextField
          fullWidth
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange("password")}
          error={!!errors.password}
          helperText={errors.password}
        />
        <br />

        <TextField
          fullWidth
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <br />

        <Button
          fullWidth
          variant="contained"
          size="medium"
          color="success"
          onClick={handleCreateClick}
        >
          Create Account
        </Button>
        <br/>

        <div style={{ color: "white", fontWeight: 300 }}>
          Already have an account?<span>     </span>
          <Button onClick={() => navigate("/login")} variant="outlined" size="small">
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
