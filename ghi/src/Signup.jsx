import { useState } from "react";
import { useSignupMutation } from "./app/authApiSlice";
import { useNavigate, Link } from "react-router-dom";



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
//     <div className="bg-repeat bg-cover bg-[url('https://get.pxhere.com/photo/writing-book-read-antique-texture-paper-bible-old-book-book-page-hymnal-font-pages-background-fiction-literature-text-handwriting-calligraphy-document-historically-antiquarian-old-german-song-book-book-printing-1201393.jpg')]">
//     <div className="container mx-auto py-8 h-screen">
//       <div className="w-5/6 lg:w-1/2 mx-auto bg-orange-200 dark:bg-gray-800 rounded shadow">
//             <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Register for an account</div>
//             <form className="py-4 px-8" onSubmit={async (event) => {event.preventDefault(); await signup(newUser); navigate("/");}}>
//                 <div className="mb-4">
//                     <label className="block text-grey-darker text-sm font-bold mb-2">Name</label>
//                     <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="full_name" type="text" placeholder="Your name"
//                     onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-grey-darker text-sm font-bold mb-2">Email Address</label>
//                     <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="email" type="email" placeholder="Your email address"
//                     onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-grey-darker text-sm font-bold mb-2">Username</label>
//                     <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="username" type="text" placeholder="Your username"
//                     onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-grey-darker text-sm font-bold mb-2">Password</label>
//                     <input className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="password" type="password" placeholder="Your secure password"
//                     onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
//                 </div>
//                 <div className="flex items-center justify-between mt-8">
//                     <button className="btn btn-primary w-full text-center mb-4" type="submit" value="Signup">
//                         Sign Up
//                     </button>
//                 </div>
//             </form>
//         </div>
//         <p className="text-center my-4">
//             <Link to="/login" className="txt text-sm no-underline hover:text-gray-400 dark:hover:text-gray-100">I already have an account</Link>
//         </p>
//     </div>
// </div>

<div className="bg-repeat bg-cover h-screen bg-[url('https://get.pxhere.com/photo/writing-book-read-antique-texture-paper-bible-old-book-book-page-hymnal-font-pages-background-fiction-literature-text-handwriting-calligraphy-document-historically-antiquarian-old-german-song-book-book-printing-1201393.jpg')]">
<div className="card">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          BookBounty
      </a>
      <div className="w-full bg-orange-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register for an account
              </h1>
              <form onSubmit={async (event) => {event.preventDefault(); await signup(newUser); navigate("/");}} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" name="full_name" placeholder="Your full name" required="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                      <input type="email" name="email" placeholder="Your email address" required="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="username" name="username" placeholder="Your username" required="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" placeholder="Your secure password" required="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(event) => setUser({...newUser, [event.target.name]: event.target.value})}/>
                  </div>
                  <button type="submit" className="w-full btn btn-primary text-center" value="Login">Login</button>
              </form>
          </div>
        <p className="text-center mb-4">
            <Link to="/login" className="txt text-sm no-underline hover:text-gray-400 dark:hover:text-gray-100">I already have an account</Link>
        </p>
      </div>
  </div>
</div>
</div>

  );
}

export default Signup;
