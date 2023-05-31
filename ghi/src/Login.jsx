import { useState } from "react";
import { useLoginMutation } from "./app/authApiSlice";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
<div className="bg-repeat h-screen bg-[url('https://images2.alphacoders.com/261/26102.jpg')]">
<div className="card">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-50 shad">
          <img className="h-10 mr-2 drop-shadow-[1px_1px_8px_rgba(0,0,0,1)]" src="/Marcus-Roberto-Google-Play-Google-Play-Books.512.png" alt="logo"/>
          BookBounty
      </a>
      <div className="w-full bg-orange-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account
              </h1>
              <form onSubmit={(event) => {event.preventDefault(); login({username, password}); navigate("/");}} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" onChange={(event) => setUsername(event.target.value)}/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(event) => setPassword(event.target.value)}/>
                  </div>
                  <button type="submit" className="w-full btn btn-primary text-center" value="Login">Login</button>
              </form>
          </div>
        <p className="text-center mb-4">
            <Link to="/signup" className="txt text-sm no-underline hover:text-gray-400 dark:hover:text-gray-100">Don't have an account?</Link>
        </p>
      </div>
  </div>
</div>
</div>

  );
}

export default Login;
