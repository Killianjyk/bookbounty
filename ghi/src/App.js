import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import HomePage from "./HomePage";
import Login from "./Login";
import DiscoverBooks from "./DiscoverBooks";
import Random from "./Random";
import BookDetails from "./BookDetails";
import UserDetails from "./UserDetails";
import DiscoverUsers from "./DiscoverUsers";
import UserBookLists from "./UserBooksLists";
import Signup from "./Signup";


function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container mx-auto h-screen">
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
