import classes from "./Navbar.module.css";
import { MdSearch } from "react-icons/md";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const [isDisplayingSearch, setIsDisplayingSearch] = useState(false);

  function searchHandler() {
    const query = searchInputRef.current.value.trim().toLowerCase();

    if (query !== "") navigate(`/pokemon/${query}`);
    setIsDisplayingSearch(false);
  }
  function toggleSearchBar() {
    setIsDisplayingSearch((prev) => !prev);
  }
  return (
    <nav className={classes.navbar}>
      <h1 className={classes.navbarBrand}>Pokédex</h1>
      {
        <form onSubmit={searchHandler}>
          <div
            className={`${classes.searchBar} ${
              !isDisplayingSearch ? classes.searchBarHide : ""
            }`}
          >
            <MdSearch
              className={classes.searchIcon}
              onClick={toggleSearchBar}
            />
            <input
              type="search"
              ref={searchInputRef}
              className={`${classes.searchInput} ${
                !isDisplayingSearch ? classes.searchInputHide : ""
              }`}
              placeholder="Search for pokemon"
            />
          </div>
        </form>
      }
    </nav>
  );
};
export default Navbar;
