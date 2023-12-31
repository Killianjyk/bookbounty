import { useEffect, useState } from "react";
import dark_mode_icon from "../Images/dark-mode-icon-blue.png";
import light_mode_icon from "../Images/light-mode-icon-orange.png";

const ThemeSwitchButton = () => {
  const [theme, setTheme] = useState("light");

  // if local storage is empty save theme as light
  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    }
    handleThemeSwitch();
  }, []);

  useEffect(() => {
    // select html elem
    const html = document.querySelector("html");
    //add or remove class dark in html elem according to theme in localstorage.
    if (localStorage.getItem("theme") === "dark") {
      html.classList.add("dark");
      setTheme("dark");
    } else {
      html.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  // handle switch theme
  const handleThemeSwitch = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");

      let image = document.getElementById("theme-toggle-icon");
      // Remove the src attribute
      image.removeAttribute("src");
      // Add a new src attribute
      image.setAttribute("src", light_mode_icon);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");

      let image = document.getElementById("theme-toggle-icon");
      // Remove the src attribute
      image.removeAttribute("src");
      // Add a new src attribute
      image.setAttribute("src", dark_mode_icon);
    }
  };

  return (
    <>
      <button
        onClick={handleThemeSwitch}
        id="theme-toggle"
        type="button"
        className="mr-2"
      >
        <img
          className="h-10"
          id="theme-toggle-icon"
          src={dark_mode_icon}
          alt="Theme Icon"
        ></img>
      </button>
    </>
  );
};
export default ThemeSwitchButton;
