import { useState } from "react";
import { useSignupMutation } from "./app/apiSlice";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const [newUser, setUser] = useState({
        username: "",
        password: "",
        email: "",
        full_name: "",
    });

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Sign Up</h5>
      <div className="card-body">
        <form onSubmit={(event) => {event.preventDefault(); /*signup(newUser);*/ navigate("/");}}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              name="full_name"
              type="text"
              className="form-control"
              onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              name="email"
              type="text"
              className="form-control"
              onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Signup" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
