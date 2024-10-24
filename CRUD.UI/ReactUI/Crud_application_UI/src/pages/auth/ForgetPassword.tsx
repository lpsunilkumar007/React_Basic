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
  //usenavigate is use to navigate to other pages
  const navigate = useNavigate();
  //resetForm function reset the form and clear all the fields after form submission
  function resetForm() {
    setForm({ email: "" })
  }
  //Creating oject of yup and defining the validation inside it  for email field check
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email enter"),
  })

  //handleChange handle the changes in the input field
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    //Destructuring the target input field and extracting the name and value from it.
    const { name, value } = e.target;
    try {
      //here validationSchema is the yup schema object and validateAt is the method that validate the input field on the name and its value again the schema of yup.
      await validationSchema.validateAt(name, { [name]: value })
      setErrors((prevError) => ({
        ...prevError, name: ""
      }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prevError) => ({
          ...prevError, [name]: error.message
        }))
      }
    }
  }
  //Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    try {
      // Form validation using Yup library of react using yup schema object
      await validationSchema.validate(form, { abortEarly: false })
      const client = new Client();
      //Here calling the ForgetPassword method for resetting the password
      const forgetPassword = new ForgetPasswordModel();
      forgetPassword.init({
        email: form.email
      });
      //calling forgetPassword method here
      await client.forgetPassword(forgetPassword);
      console.log(" Reset Token successfully send to your mail")
      resetForm();
      navigate('/resetPassword') //navigate to resetpassword page if forgetPassword is true
    } catch (error) {
      //if the there is any validation error then this if statements will execute and display the error in there respective field
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      //else statement will be excuted if there is any server error
      else {
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
              {/* Email input field */}
              <input className="form-control" type="text" name="email" id="email" onChange={handleChange} value={form.email} placeholder="Email" autoFocus autoComplete="off" onBlur={handleBlur} />
              {errors.email && <div className="text-danger mb-2 pb-2">{errors.email}</div>}
              {/* Button  */}
              <button type="submit" className="form-control">Submitt</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword;
