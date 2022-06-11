import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../Actions/Actions";
import classes from "./ChainElem.module.css";

const ChainElem = (props) => {
  return (
    <div className={classes.chainElem}>
      <div className={classes.info}>
        <img src={props.imgUrl} alt="" className={classes.img} />
        <p className={classes.name}>{props.name}</p>
      </div>
      {!props.isLast && (
        <div className={classes.arrow}>
          <div className={classes.line1}></div>
          <span className={classes.stat}>{`${
            props.trigger ? (props.trigger === "level-up" ? "+ " : "- ") : ""
          }${props.level ? props.level : ""}`}</span>
          <hr className={classes.hr} />
          <div className={classes.line2}></div>
        </div>
      )}
    </div>
  );
};
export default ChainElem;
