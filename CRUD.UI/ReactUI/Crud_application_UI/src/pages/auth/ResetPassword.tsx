import { useState } from "react"
import { Client, ResetPasswordModel } from "../../clientApi/ApiClient";


function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    token: ""
  });
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const resetForm = () => {
    setForm({ email: "", password: "", confirmPassword: "", token: "" })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const client = new Client();
      const resetPassword = new ResetPasswordModel();
      resetPassword.init({
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        token: form.token
      });
      await client.resetPassword(resetPassword);
      resetForm();
      alert("Your password in successfully reset please login !!");
    } catch (error) {
      setError("Reset fail , please check your credentials");
      console.error(error);


    }
  }
  return (
    <>
      <div className="container">
        <div className="form-container shadow p-3 mb-5 bg-white border border-4">
          <div className="form">
            <h2 className="text-center text-white">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" required className="form-control" placeholder="Email" onChange={handleChange} value={form.email} />
              <input type="password" name="password" required className="form-control" placeholder="Password" onChange={handleChange} value={form.password} />
              <input type="password" name="confirmPassword" required className="form-control" placeholder="Confirm Password" onChange={handleChange} value={form.confirmPassword} />
              <input type="text" name="token" required className="form-control" placeholder="Token" onChange={handleChange} value={form.token} />
              <button type="submit" className="form-control">Submit</button>
              {error && <div className="alert alert-danger">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
