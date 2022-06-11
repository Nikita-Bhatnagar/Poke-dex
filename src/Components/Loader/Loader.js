import classes from "./Loader.module.css";
const Loader = () => {
  return (
    <section className={classes.loadSec}>
      <div className={classes.spinner}></div>
    </section>
  );
};
export default Loader;
