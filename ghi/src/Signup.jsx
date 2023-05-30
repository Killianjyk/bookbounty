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
    // <div className="card text-bg-light mb-3">
    //   <h5 className="card-header">Sign Up</h5>
    //   <div className="card-body">
    //     <form onSubmit={(event) => {event.preventDefault(); /*signup(newUser);*/ navigate("/");}}>
    //       <div className="mb-3">
    //         <label className="form-label">Name:</label>
    //         <input
    //           name="full_name"
    //           type="text"
    //           className="form-control"
    //           onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label className="form-label">Email:</label>
    //         <input
    //           name="email"
    //           type="text"
    //           className="form-control"
    //           onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label className="form-label">Username:</label>
    //         <input
    //           name="username"
    //           type="text"
    //           className="form-control"
    //           onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label className="form-label">Password:</label>
    //         <input
    //           name="password"
    //           type="password"
    //           className="form-control"
    //           onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}
    //         />
    //       </div>
    //       <div>
    //         <input className="btn btn-primary" type="submit" value="Signup" />
    //       </div>
    //     </form>
    //   </div>
    // </div>
<div className="bg-repeat h-screen bg-[url('https://p0.pikist.com/photos/626/38/background-book-font-text-old-german-book-printing-antique-hymnal-faith.jpg')]">
    <div className="container mx-auto py-8 h-screen">
      <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Register for an account</div>
            <div className="py-4 px-8">
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Name</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="full_name" type="text" placeholder="Your name"
                    onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Email Address</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="email" type="email" placeholder="Your email address"
                    onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Username</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="username" type="text" placeholder="Your username"
                    onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2">Password</label>
                    <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="password" type="password" placeholder="Your secure password"
                    onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
                </div>
                <div className="flex items-center justify-between mt-8">
                    <button className="btn btn-primary w-full text-center mb-4" type="submit" value="Signup">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
        <p className="text-center my-4">
            <a href="/login" className="txt text-sm no-underline hover:text-gray-400 dark:hover:text-gray-100">I already have an account</a>
        </p>
    </div>
</div>

  );
}

export default Signup;
