import { useState } from "react";
import "./styles.css";

export default function App() {
  //hold form values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  //validation errors
  const [formErrors, setFormErrors] = useState({});

  //form submition
  const [isSubmitted, setIsSubmitted] = useState(false);

  //validation Form Fields
  const validate = () => {
    let newErrors = {};
    //check for name
    if (!formValues.name.trim()) {
      newErrors.name = "Name field is required.";
    } else if (formValues.length > 3) {
      newErrors.name = "enter the name atleast three characters..";
    }

    //check for email
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Invalid email format";
    }

    //check for password
    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  //handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //handle Form submission
  const handleSubmit = (e) => {
    const validationError = validate();
    setFormErrors(validationError);

    if (validationError.length === 0) {
      console.log("Form submitted successfully:", formValues);
      setIsSubmitted(true);
      setFormValues({
        name: "",
        email: "",
        password: "",
      });
      console.log(formValues);
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="App">
      <h1>Register Form</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="enter name here...!"
          value={formValues.name}
          onChange={handleChange}
        />
        {formErrors.name && (
          <div style={{ color: "red" }}>{formErrors.name}</div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="enter email here...!"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <div style={{ color: "red" }}>{formErrors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="enter password here...!"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <div style={{ color: "red" }}>{formErrors.password}</div>
          )}
        </div>
        <div>
          <a href="#">Forgot password</a>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Submit
        </button>

        {/* Success Message */}
        {isSubmitted && (
          <div style={{ color: "green", marginTop: "10px" }}>
            Form submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
}
