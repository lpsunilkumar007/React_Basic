import React, { useState } from "react";
import { Client, UserLoginModel } from "../../clientApi/ApiClient";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

function Login() {
  //useNavigate to navigate to next page
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  //handleChange manage the changes happen in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //resetform function will reset the form and clear everything inside it whenever it is called
  function resetForm() {
    setForm({ email: "", password: "" });
  }
  //Handle Blur
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    //Destructuring the targeted field here and extracting the name and value
    const { name, value } = e.target;
    try {
      //here validationSchema is the yup schema object and validateAt is the method that validate the input field on the name and its value again the schema of yup.
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prevError) => ({
          ...prevError,
          [name]: error.message,
        }));
      }
    }
  };
  /*
Use Yup react library for the form validation 
* First install the package in project npm install yup
* Then import it in the file
* Then  use it to validate the form data
* Setting up the validation using the yup object
*/
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email enter"),
    password: yup
      .string()
      .required("Password must be required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character."
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain  at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lower letter"),
  });
  /*  when the form is submitt this function will trigger and it will call the loginPOST method which is inside the client class. if credentials match then it will navigate to next page otherwise it will throw an error */
  /*
   * Inside the handlesubmit we are handle the validation.
   * If the form is valid then only the register method call and then after the user is save in the database.
   * If the form is not valid then the error message will be shown to the user.
   * Here we are using try and catch for error handling if any error occure then catch block will throw an error.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    try {
      await validationSchema.validate(form, { abortEarly: false });
      const client = new Client();
      const loginModel = new UserLoginModel();
      loginModel.init({
        email: form.email,
        password: form.password,
      });
      // Now use the loginModel for the login call
      await client.loginPOST(loginModel);
      localStorage.setItem("user", JSON.stringify(form));
      resetForm();
      navigate("/default");
      //Navigate to the home page
    } catch (error) {
      //if the there is any validation error then this if statements will execute and display the error in there respective field
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      //this else statement will execute if there is any server side error
      else {
        alert("Error occure while login,Please try again!!");
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="form-container shadow p-3 mb-5 bg-white border border-4">
          <div className="form">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Email input field */}
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={form.email}
                onBlur={handleBlur} autoFocus
              />
              {errors.email && (
                <div className="text-danger mb-2 pb-2">{errors.email}</div>
              )}

              {/* Password input field */}
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                value={form.password}
                onBlur={handleBlur}
              />
              {errors.password && (
                <div className="text-danger mb-2 pb-2">{errors.password}</div>
              )}
              {/* Login button */}
              <button type="submit" className="form-control">
                Login
              </button>
            </form>
            <Link to="/forgetPassword">Forget Password ?</Link>
            <p>
              Not a Member ? <Link to="/signup">Signup now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
