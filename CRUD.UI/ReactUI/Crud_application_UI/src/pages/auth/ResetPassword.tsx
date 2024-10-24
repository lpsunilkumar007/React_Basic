import { useState } from "react"
import { Client, ResetPasswordModel } from "../../clientApi/ApiClient";
import * as yup from "yup";

function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    token: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //resetFrom function reset the form input field and make them empty
  const resetForm = () => {
    setForm({ email: "", password: "", confirmPassword: "", token: "" })
  }
  // Form validation using Yup library of react
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email enter"),
    password: yup.string().required("Password is required").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.").min(8, "Password must be at least 8 character")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain  at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lower letter"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")]).min(8, "Password must be at least 8 character").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain  at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lower letter"),
    token: yup.string().required("Token is required"),
  })

  //handleSubmit function here calling the function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    try {
      await validationSchema.validate(form, { abortEarly: false });
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
      alert("Your password in successfully reset please login now !!");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        alert("Something want wrong while resetting password");
      }
    }
  }
  return (
    <>
      <div className="container">
        <div className="form-container shadow p-3 mb-5 bg-white border border-4">
          <div className="form">
            <h2 className="text-center text-black">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} value={form.email} />
              {errors.email && <div className="text-danger">{errors.email}</div>}
              <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} value={form.password} />
              {errors.password && <div className="text-danger mb-2 pb-2">{errors.password}</div>}
              <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" onChange={handleChange} value={form.confirmPassword} />

              {errors.confirmPassword && <div className="text-danger mb-2 pb-2">{errors.confirmPassword}</div>}

              <input type="text" name="token" className="form-control" placeholder="Token" onChange={handleChange} value={form.token} />
              {errors.token && <div className="text-danger mb-2 pb-2">{errors.token}</div>}

              <button type="submit" className="form-control">Submit</button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
