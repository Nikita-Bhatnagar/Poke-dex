import { getColor } from "../../Util/Color";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = (props) => {
  const color = getColor(props.types[0].type.name);

  return (
    <Link to={`/pokemon/${props.id}`}>
      <div className={classes.card} style={{ backgroundColor: color }}>
        <div className={classes.info}>
          <p className={classes.id}>#{props.id}</p>
          <p className={classes.name}>{props.name}</p>
          <div className={classes.typeRow}>
            {props.types.map((elem, i) => {
              return (
                <div className={classes.type} key={i}>
                  {elem.type.name}
                </div>
              );
            })}
          </div>
        </div>
        <img src={props.imgUrl} className={classes.img} alt="" />
      </div>
    </Link>
  );
};
export default Card;
