import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "./auth/UserContext";
import "./Homepage.css"

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage({isLoggedIn}) {



console.log(isLoggedIn)

  return (
    
      <div className="Homepage">
        <div className="container text-center title">
          <h1 className="mb-4 font-weight-bold">Jobly</h1>
          <p className="lead">All the jobs in one, convenient place.</p>
          {isLoggedIn
              ? <h2>
                Welcome Back!
              </h2>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mx-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold mx-3"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;