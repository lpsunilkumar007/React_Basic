import { useState } from "react";
import { Client, ForgetPasswordModel } from "../../clientApi/ApiClient";
import { useNavigate } from "react-router-dom";


function ForgetPassword() {
  const [form, setForm] = useState({
    email: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function resetForm() {
    setForm({ email: "" })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const client = new Client();
      const forgetPassword = new ForgetPasswordModel();
      forgetPassword.init({
        email: form.email
      });
      const response = await client.forgetPassword(forgetPassword);
      console.log(" Reset Token successfully send to your mail", response)
      navigate('/resetPassword')
      resetForm();
    } catch (error) {
      setError("Please enter correct email address");
      console.error("Something went wrong!!")
    }
  }
  return (
    <>
      <div className="container">
        <div className="form-container shadow p-3 mb-5 bg-white border border-4">
          <div className="form">
            <h2 className="text-center">Forget Password</h2>
            <p>Enter Email to reset the password</p>
            <form onSubmit={handleSubmit}>
              <input className="form-control" type="email" name="email" id="email" onChange={handleChange} value={form.email} required placeholder="Email" />
              <button type="submit" className="form-control">Submitt</button>
              {error && <div className="alert alert-danger">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword;
