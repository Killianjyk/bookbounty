const Footer = () => {
  return (
    <footer className="bg-neutral-300 dark:bg-neutral-800 text-center">
      <div className="pt-4 pb-4 text-center text-neutral-900 dark:text-neutral-200">
        Thanks to
        <a
          href="https://openlibrary.org"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-600 dark:text-neutral-400"
        >
          {" "}
          OpenLibrary.org{" "}
        </a>
        for their fantastic API!
      </div>
      <hr className="border-gray-500"></hr>
      <div className="pb-4 pt-4 text-center text-neutral-900 dark:text-neutral-200">
        © 2023 Copyright: Penguin Productions
      </div>
    </footer>
  );
};

export default Footer;
