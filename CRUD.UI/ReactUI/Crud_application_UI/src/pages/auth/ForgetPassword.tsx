import { useState } from "react";
import { Client, ForgetPasswordModel } from "../../clientApi/ApiClient";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


function ForgetPassword() {
  const [form, setForm] = useState({
    email: ""
  })
  //Handle change in input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate(); //usenavigate is use to navigate to other pages

  //resetForm function reset the form and clear all the fields after form submission
  function resetForm() {
    setForm({ email: "" })
  }
  //Creating oject of yup and defining the validation inside it  for email
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email enter"),
  })
  //Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    try {
      await validationSchema.validate(form, { abortEarly: false })
      const client = new Client();
      const forgetPassword = new ForgetPasswordModel();
      forgetPassword.init({
        email: form.email
      });
      await client.forgetPassword(forgetPassword);
      console.log(" Reset Token successfully send to your mail")
      resetForm();
      navigate('/resetPassword')
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
        alert("Something went wrong!!!");
      }
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
              <input className="form-control" type="email" name="email" id="email" onChange={handleChange} value={form.email} placeholder="Email" />
              {errors.email && <div className="text-danger mb-2 pb-2">{errors.email}</div>}
              <button type="submit" className="form-control">Submitt</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword;
