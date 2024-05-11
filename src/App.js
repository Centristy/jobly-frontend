import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState, useEffect} from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import LoginForm from './Forms/LoginForm';
import Homepage from './Homepage'
import SignupForm from './Forms/SignupForm';
import JoblyApi from './Api';
import * as jwt_decode from 'jwt-decode'



import CompanyList from './company/CompanyList';
import UserContext from './auth/UserContext';
import JobList from './jobs/JobList';
import ProfileForm from './users/ProfileForm';
export const TOKEN_STORAGE_ID = "jobly-token";


function App() {


  const [infoLoaded, setInfoLoaded] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [isLoggedIn, setisLoggedin] = useState(false)

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
);

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setisLoggedin(true)
          
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
    
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      setisLoggedin(true)
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      setisLoggedin(true)
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      setisLoggedin(false)
      return { success: false, errors };
    }
  }


  function logout() {
    setCurrentUser(null);
    setToken(null);
    setisLoggedin(false)
  }

  return (
    <div className="App">

      


      <UserContext.Provider
            value={{ currentUser, setCurrentUser}}>
      <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} logout={logout} />

      <Routes>

        <Route exact path = "/login" element={<LoginForm login={login}/>}></Route>
        <Route exact path = "/" element={<Homepage isLoggedIn={isLoggedIn}/>}></Route>
        <Route exact path = "/signup" element={<SignupForm signup={signup}/>}></Route>
        <Route exact path = "/companies" element ={<CompanyList/>}></Route>
        <Route exact path = "/jobs" element ={<JobList/>}></Route>
        <Route path="/profile" element={<ProfileForm/>}></Route>


      </Routes>
      
      </BrowserRouter>

      </UserContext.Provider>



    </div>
  );
}

export default App;
