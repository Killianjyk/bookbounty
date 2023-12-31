import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav/Nav";
import HomePage from "./HomePage";
import Login from "./User/Login";
import DiscoverBooks from "./DiscoverBooks";
import Random from "./Book/BookDetail/Random";
import BookDetails from "./Book/BookDetail/BookDetails";
import UserDetails from "./User/UserDetails";
import DiscoverUsers from "./DiscoverUsers";
import UserBookLists from "./User/UserBooksLists";
import Signup from "./User/Signup";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";


function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <Nav />
      <div className="mx-auto min-w-screen min-h-screen">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          <Route path="discover/" element={<DiscoverBooks />} />
          <Route path="random/" element={< Random />} />
          <Route path="books/">
            <Route path="favorites/:username" element={<UserBookLists name="Favorites" />} />
            <Route path="previous/:username" element={<UserBookLists name="Previously Read" />} />
            <Route path="next/:username" element={<UserBookLists name="Read Next" />} />
            <Route path=":workId/" element={<BookDetails />} />
          </Route>
          <Route path="users/">
            <Route index element={<UserDetails />} />
            <Route path="search/" element={<DiscoverUsers />} />
          </Route>
          <Route path="*" element={<ErrorPage />}/>
        </Routes>
      </div>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
