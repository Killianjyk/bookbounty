import { useState } from "react";
import { useSignupMutation } from "../app/authApiSlice";
import { useNavigate, Link } from "react-router-dom";
import bookLogo from "../Images/Marcus-Roberto-Google-Play-Google-Play-Books.512.png";

const Signup = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const [newUser, setUser] = useState({
    username: "",
    password: "",
    email: "",
    full_name: "",
  });

  const handleSignup = async (event) => {
    event.preventDefault();
    const result = await signup(newUser);
    if (result.error) {
      alert("Username already taken");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-repeat bg-cover h-screen bg-[url('../public/oldbook.jpg')]">
      <div className="card">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-50 shad"
          >
            <img
              className="h-10 mr-2 drop-shadow-[1px_1px_8px_rgba(0,0,0,1)]"
              src={bookLogo}
              alt="logo"
            />
            BookBounty
          </Link>
          <div className="w-full bg-orange-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register for an account
              </h1>
              <form
                onSubmit={handleSignup}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Your full name"
                    required=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) =>
                      setUser({
                        ...newUser,
                        [event.target.name]: event.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    required=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) =>
                      setUser({
                        ...newUser,
                        [event.target.name]: event.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    placeholder="Your username"
                    required=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) =>
                      setUser({
                        ...newUser,
                        [event.target.name]: event.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Your secure password"
                    required=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) =>
                      setUser({
                        ...newUser,
                        [event.target.name]: event.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn btn-primary text-center"
                  value="Login"
                >
                  Login
                </button>
              </form>
            </div>
            <p className="text-center mb-4">
              <Link
                to="/login"
                className="txt text-sm no-underline hover:text-gray-400 dark:hover:text-gray-100"
              >
                I already have an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
