import React, { useEffect, useState } from "react";
import { Client, UserLoginModel } from "../../clientApi/ApiClient";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
function Login() {

  useEffect(() => {
    resetForm();

  }, [1])
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  //handleChange manage the changes happen in the input field 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function resetForm() {
    setForm({ email: "", password: "" })
  }

  //when the form is submitt this function will trigger and it will call the loginPOST method which is inside the client class. if credentials match then it will navigate to next page otherwise it will throw an error
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const client = new Client();
      const loginModel = new UserLoginModel();
      loginModel.init({
        email: form.email,
        password: form.password,
      });
      debugger;
      // Now use the loginModel for the login call
      const response = await client.loginPOST(loginModel);
      resetForm();
      console.log("Login successful", response);
      navigate('/default');
      //Navigate to the home page
      //add logic to navigate to next page 

    }
    catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };
  return (
    <>
      <div className="container">
        <div className="form-container shadow p-3 mb-5 bg-white border border-4">
          <div className="form">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <input className="form-control" type="email" name="email" id="email" onChange={handleChange} value={form.email} required />
              <input type="password" name="password" className="form-control" id="password" onChange={handleChange} value={form.password} required />
              <button type="submit" className="form-control">Login</button>
              {error && <div className="alert alert-danger">{error}</div>}
            </form>
            <Link to="/forgetPassword">Forget Password?</Link>
            <p>Not a Member? <Link to="/signup">Signup Now</Link></p>
          </div>
        </div>
      </div>
    </>
  );

}

export default Login;