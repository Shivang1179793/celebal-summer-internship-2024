import React ,{ useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate, Route, Routes,useLocation } from "react-router-dom";
import "./App.css";
const countries = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago']
};
const Form=()=> {
  const initialValues = { username: "", email: "", password: "",firstName:"",lastName:"",phoneNo: '',country: '',city:"",panNo:"",aadharNo:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/success', { state: formValues });
    } else {
      setIsSubmit(true);
    }
  };
  useEffect(() => {
    const validationErrors = validate(formValues);
    setFormErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [formValues]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.phoneNo) errors.phoneNo = 'Phone Number is required';
    if (!formValues.country) errors.country = 'Country is required';
    if (!values.city) errors.city = 'City is required';
    if (!values.panNo) errors.panNo = 'PAN No. is required';
    if (!values.aadharNo) errors.aadharNo = 'Aadhar No. is required';
    return errors;
  };
  return (
    <div className="container">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">Signed in successfully</div>
        ):console.log("")}
        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <div className="ui divider"></div>
          <div className="ui form">
          <div className="field">
              <label>First Name: </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter Your First name"
                value={formValues.firstName}
                onChange={handleChange}
              />
          </div>
          <p>{formErrors.firstName}</p>
          <div className="field">
              <label>Last Name: </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Your Last name"
                value={formValues.lastName}
                onChange={handleChange}
              />
          </div>
          <p>{formErrors.lastName}</p>

            <div className="field">
              <label>Username: </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="field">
              <label>Email: </label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label>Password: </label>
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <p>{formErrors.password}</p>
            <div className="field">
              <label>Phone No. (country code - number):</label>
              <input type="text" name="phoneNo" value={formValues.phoneNo} onChange={handleChange} />
              <p>{formErrors.phoneNo}</p>
            </div>
            <div className="field">
              <label>Country:</label>
              <select name="country" value={formValues.country} onChange={handleChange}>
                <option value="">Select Country</option>
                {Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)}
              </select>
              <p>{formErrors.country}</p>
            </div>
            <div className="field">
              <label>City:</label>
              <select name="city" value={formValues.city} onChange={handleChange} disabled={!formValues.country}>
                <option value="">Select City</option>
                {formValues.country && countries[formValues.country].map(city => <option key={city} value={city}>{city}</option>)}
              </select>
              <p>{formErrors.city}</p>
            </div>
            <div className="field">
              <label>PAN No.:</label>
              <input type="text" name="panNo" value={formValues.panNo} onChange={handleChange} />
              <p>{formErrors.panNo}</p>
            </div>
            <div className="field">
              <label>Aadhar No.:</label>
              <input type="text" name="aadharNo" value={formValues.aadharNo} onChange={handleChange} />
              <p>{formErrors.aadharNo}</p>
            </div>
            <button className="fluid ui button blue" type="submit" disabled={!isFormValid}>Submit</button>
          </div>
        </form>
    </div>
  );
}
const Success = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div>
      <h1>Form Submitted Successfully!</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
const App=()=>{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/success" element={<Success/>} />
      </Routes>
    </Router>
  );
};
export default App;