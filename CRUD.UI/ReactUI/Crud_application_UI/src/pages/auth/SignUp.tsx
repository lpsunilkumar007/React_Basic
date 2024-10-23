import React, { useState } from "react";
import { Client, UserRegisterationModel } from "../../clientApi/ApiClient";
function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: ""
  })
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function resetForm() {
    setForm({ name: "", email: "", password: "", address: "", phoneNumber: "" })
  }

  //handleSubmit function handles the form submission and call the UserRegisterationModel method of client class
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const client = new Client();
      const RegisterationModel = new UserRegisterationModel();
      RegisterationModel.init({
        name: form.name,
        email: form.email,
        address: form.address,
        password: form.password,
        phoneNumber: form.phoneNumber
      })
      debugger;
      const response = await client.register(RegisterationModel);
      resetForm();
      console.log("Register User Successfully", response);
    } catch (error) {
      console.error("Login error:", error);
      setError("Registeration failed. Please check your credentials.");
    }
  }
  return (
    <>
      <div className="container">
        <div className="form-container shadow p-3 mb-5 bg-white border border-4">
          <div className="form">
            <h2 className="text-center">Sign up</h2>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" name="name" placeholder="Name" onChange={handleChange} value={form.name} required />

                <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} value={form.email} required />

                <input type="text" className="form-control" name="address" placeholder="Address" onChange={handleChange} value={form.address} required />

                <input type="text" className="form-control" name="phoneNumber" placeholder="Phone number" onChange={handleChange} value={form.phoneNumber} required />

                <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} value={form.password} required />
                
                <button type="submit" className="form-control">SignUp</button>
                {error && <div className="alert alert-danger">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;
