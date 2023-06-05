const Footer = () => {
    return (
<footer className="bg-neutral-400 dark:bg-neutral-800 text-center">


  <div className="pt-4 pb-2 text-center text-neutral-900 dark:text-neutral-200">
    Thanks to
    <a href="https://openlibrary.org" target="_blank"
      className="text-neutral-600 dark:text-neutral-400"
      > OpenLibrary.org </a>
    for their fantastic API!
  </div>
  <div className="pb-4 text-center text-neutral-900 dark:text-neutral-200">
    © 2023 Copyright: Penguin Productions
  </div>


</footer>
    )
};

export default Footer;
