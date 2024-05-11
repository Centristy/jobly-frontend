import React, { useState, useContext } from 'react';
import { useNavigate} from "react-router-dom";
import JoblyApi  from '../Api'



function LoginForm({login}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
    const [ token, setToken] = useState('')
    const [errors, setFormErrors] = useState("")
    const history = useNavigate()



    async function handleSubmit(evt) {
      evt.preventDefault();
      let result = await login(formData);
      if (result.success) {


        
        history("/companies");
      } else {
        setFormErrors(result.errors);
      }
    }

    function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData(data => ({ ...data, [name]: value }));
  }

    return (
    <form onSubmit={handleSubmit}>
        <div>
        <label>
            Username:
            <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            />
        </label>
        </div>
        <div>
        <label>
            Password:
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        {errors.length
                    ? <p className='alert alert-danger'>{errors}</p>
                    : null
                }
      </div>
      <button type="submit">Log In</button>

      
    </form>
  );
};

export default LoginForm;