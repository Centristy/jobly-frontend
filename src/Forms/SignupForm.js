import React, { useState, useContext } from 'react';
import JoblyApi  from '../Api'
import { useNavigate} from 'react-router-dom';
import './SignupForm.css'

function SignupForm( {signup} ) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const history = useNavigate()

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    async function handleSignup(e){
    e.preventDefault();
    
    try {
        // Send a POST request to the external API for validation
        let response = await signup(formData);
        console.log(response)
        // Check the response data for success
        if (response.success) {
          // Call the login function from AuthContext to update the state


            history("/companies");

            
        }
        } catch (error) {
        setFormErrors("Username already taken");   
    
    }
    };
    ;

    return (
    <form className="signup" onSubmit={handleSignup}>
        <div>
        <label>
            Username:
            <input
            type="text"
            name='username'
            value={formData.username}
            onChange={handleChange}
            />
        </label>
        </div>

        <div>
        <label>
            First Name:
            <input
            type="text"
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
        />
        </label>
        </div>

        <div>
        <label>
            Last Name:
            <input
            type="text"
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
        />
        </label>
        </div>

        <div>
        <label>
            Email:
            <input
            type="text"
            name='email'
            value={formData.email}
            onChange={handleChange}
        />
        </label>
        </div>


        <div>
        <label>
            Password:
            <input
            type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
        />
        </label>
        </div>

            {formErrors.length
                    ? <p className='alert alert-danger'>{formErrors}</p>
                    : null
                }
    
    <button className="btn btn-primary font-weight-bold mx-3" type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;