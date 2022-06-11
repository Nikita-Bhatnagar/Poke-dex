import classes from "./EvolutionChain.module.css";
import { getEvChainDetails } from "../../Actions/Actions";
import ChainElem from "./ChainElem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const EvolutionChain = (props) => {
  const dispatch = useDispatch();
  const { data: chainData } = useSelector((state) => state.EvChainReducer);
  const { evChain } = useSelector((state) => state.DetailReducer);

  let ev, arr, evArr;
  ev = evChain.chain;
  arr = [
    {
      url: ev ? ev.species.url.replace("-species", "") : "",
    },
  ];
  evArr = ev ? ev.evolves_to : "";
  while (evArr.length !== 0) {
    const url = evArr[0].species.url.replace("-species", "");

    arr.push({
      url: url,
      level: evArr[0].evolution_details[0].min_level,
      trigger: evArr[0].evolution_details[0].trigger.name,
    });
    evArr = evArr[0].evolves_to;
  }
  function fetchDetails() {
    dispatch(getEvChainDetails(arr));
  }
  useEffect(() => {
    fetchDetails();
  }, [ev]);

  return (
    <React.Fragment>
      <h2 className={classes.h2} style={{ backgroundColor: props.color }}>
        Evolutions
      </h2>
      <div className={classes.chain}>
        {chainData[0] && chainData[0].value
          ? chainData.map((elem, i) => {
              return (
                <ChainElem
                  name={elem.value.data.name}
                  imgUrl={elem.value.data.sprites.front_default}
                  level={i !== chainData.length - 1 ? arr[i + 1]?.level : ""}
                  trigger={
                    i !== chainData.length - 1 ? arr[i + 1]?.trigger : ""
                  }
                  key={i}
                  isLast={i === chainData.length - 1}
                />
              );
            })
          : ""}
      </div>
    </React.Fragment>
  );
};
export default EvolutionChain;
