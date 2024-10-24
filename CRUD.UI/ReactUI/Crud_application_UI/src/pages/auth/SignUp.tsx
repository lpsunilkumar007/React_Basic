import React, { useState } from "react";
import { Client, UserRegisterationModel } from "../../clientApi/ApiClient";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  /*
  Use Yup react library for the form validation 
  * First install the package in project npm install yup
  * Then import it in the file
  * Then  use it to validate the form data
  * Setting up the validation using the yup object
  */
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email enter"),
    address: yup
      .string()
      .required("Address is required"),
    password: yup
      .string()
      .required("Password must be required")
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain  at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lower letter"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")

  })
  //Handle change handle the changes in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //resetform function will reset the form and clear everything inside it whenever it is called
  function resetForm() {
    setForm({ name: "", email: "", password: "", address: "", phoneNumber: "" })
  }

  //Handle Blur event 
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    //Destructuring the targeted field here and extracting the name and value
    const { name, value } = e.target;
    try {
      //here validationSchema is the yup schema object and validateAt is the method that validate the input field on the name and its value again the schema of yup.
      await validationSchema.validateAt(name, { [name]: value })
      setErrors((prevErrors) => ({
        ...prevErrors, [name]: ""
      }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prevErrors) => ({
          ...prevErrors, [name]: error.message
        }));
      }
    }

  }

  //handleSubmit function handles the form submission and call the UserRegisterationModel method of client class
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
      const client = new Client(); //using client class here
      const registerationModel = new UserRegisterationModel();
      registerationModel.init({
        name: form.name,
        email: form.email,
        address: form.address,
        password: form.password,
        phoneNumber: form.phoneNumber
      })
      await client.register(registerationModel); //calling register method here
      resetForm();
      alert("Register User Successfully, Now you can login");
      navigate("/login");
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
      } else {
        //else statment will excute if there is any server side error
        alert("Error occurs while siging up");
      }
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
                {/* Name input field */}
                <input type="text" className="form-control" name="name" placeholder="Name" onChange={handleChange} value={form.name} autoComplete="off" autoFocus onBlur={handleBlur} />
                {errors.name && <div className="text-danger mb-2 pb-2">{errors.name}</div>}
                {/*Email input field  */}
                <input type="text" className="form-control" name="email" placeholder="Email" onChange={handleChange} value={form.email} autoComplete="off" onBlur={handleBlur} />
                {errors.email && <div className="text-danger mb-2 pb-2">{errors.email}</div>}
                {/* Address input field */}
                <input type="text" className="form-control" name="address" placeholder="Address" onChange={handleChange} value={form.address} onBlur={handleBlur} />
                {errors.address && <div className="text-danger mb-2 pb-2">{errors.address}</div>}
                {/* Phone number input field */}
                <input type="text" className="form-control" name="phoneNumber" placeholder="Phone number" onChange={handleChange} value={form.phoneNumber} onBlur={handleBlur} />
                {errors.phoneNumber && <div className="text-danger mb-2 pb-2">{errors.phoneNumber}</div>}
                {/* Password input field */}
                <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} value={form.password} autoComplete="off" onBlur={handleBlur} />
                {errors.password && <div className="text-danger mb-2 pb-2">{errors.password}</div>}
                {/* Submitt button  */}
                <button type="submit" className="form-control">SignUp</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;
