import PokemonList from "../../Components/PokemonList/PokemonList";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.wrapper}>
      <PokemonList />
    </div>
  );
};
export default Home;
