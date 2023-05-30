import { useState } from "react";
import { useSignupMutation } from "./app/authApiSlice";
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
    <div className="bg-repeat bg-cover bg-[url('https://get.pxhere.com/photo/writing-book-read-antique-texture-paper-bible-old-book-book-page-hymnal-font-pages-background-fiction-literature-text-handwriting-calligraphy-document-historically-antiquarian-old-german-song-book-book-printing-1201393.jpg')]">
    <div className="container mx-auto py-8 h-screen">
      <div className="w-5/6 lg:w-1/2 mx-auto bg-orange-200 dark:bg-gray-800 rounded shadow">
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Register for an account</div>
            <form className="py-4 px-8" onSubmit={async (event) => {event.preventDefault(); await signup(newUser); navigate("/");}}>
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
            </form>
        </div>
        <p className="text-center my-4">
            <a href="/login" className="txt text-sm no-underline hover:text-gray-400 dark:hover:text-gray-100">I already have an account</a>
        </p>
    </div>
</div>

  );
}

export default Signup;
