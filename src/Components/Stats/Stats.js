import classes from "./Stats.module.css";
const Stats = (props) => {
  return (
    <div className={classes.stat}>
      <span
        style={{
          color: props.color,
          fontSize: "15px",
          fontWeight: "600",
          fontVariant: "all-small-caps",
        }}
      >
        {props.name}
      </span>
      <div className={classes.bar}>
        <div
          className={classes.val}
          style={{
            backgroundColor: props.color,
            width: `${props.value <= 100 ? props.value : 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
export default Stats;
