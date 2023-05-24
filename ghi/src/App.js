import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import HomePage from "./HomePage";
import Login from "./Login";
import Discover from "./Discover";
import Random from "./Random";
import BookLists from "./BookLists";
import BookDetails from "./BookDetails";
import UserDetails from "./UserDetails"


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
      <div className="container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login/" element={<Login />} />
          <Route path="discover/" element={<Discover />} /> 
          <Route path="random/" element={< Random />} />
          <Route path="book/">
            <Route index element={<BookLists name="Most Liked" />} />
            <Route path="favorites/" element={<BookLists name="favorites" />} />
            <Route path="previous/" element={<BookLists name="previous" />} />
            <Route path="next/" element={<BookLists name="next" />} />
            <Route path="details/" element={<BookDetails />} />
          </Route>
          <Route path="user/">
            <Route index element={<UserDetails />} />
            <Route path="search/" element={<Discover />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
