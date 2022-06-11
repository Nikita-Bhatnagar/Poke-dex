import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../Actions/Actions";
import classes from "./Detail.module.css";
import { getColor } from "../../Util/Color";
import Stats from "../../Components/Stats/Stats";
import Loader from "../../Components/Loader/Loader";
import EvolutionChain from "../../Components/Evolution/EvolutionChain";

const Detail = () => {
  const params = useParams();
  const id = params.pokemonId;
  const details = useSelector((state) => state.DetailReducer);

  const dispatch = useDispatch();
  const fetchDetails = () => {
    dispatch(getDetails(id));
  };
  useEffect(() => {
    fetchDetails();
  }, [id]);
  let color = "";
  if (details.data.types) color = getColor(details.data.types[0].type.name);
  let desc = "";
  if (details.speciesInfo.flavor_text_entries)
    desc = details.speciesInfo.flavor_text_entries
      .filter((elem, i) => elem.language.name === "en" && i % 2 === 0)
      .slice(0, 4);

  return (
    <React.Fragment>
      {details.isLoading && <Loader />}
      {details.isError && <p className={classes.error}>{details.errMsg}</p>}
      {!details.isLoading && !details.isError && (
        <div className={classes.container}>
          <section className={classes.sec1} style={{ backgroundColor: color }}>
            <div
              className={classes.contents}
              style={{
                justifyContent: desc.length !== 0 ? "space-between" : "center",
              }}
            >
              <div
                className={classes.col1}
                style={{ flexBasis: desc.length !== 0 ? "20%" : "100%" }}
              >
                <p className={classes.id}>#{details.data.id}</p>
                <img
                  src={
                    details.data.sprites
                      ? details.data.sprites.front_default
                      : ""
                  }
                  alt=""
                  className={classes.img}
                />
                <h2 className={classes.name}>{details.data.name}</h2>
                <div className={classes.typeRow}>
                  {details.data.types
                    ? details.data.types.map((elem, i) => {
                        return (
                          <div className={classes.type} key={i}>
                            {elem.type.name}
                          </div>
                        );
                      })
                    : ""}{" "}
                </div>
              </div>
              <div className={classes.col2}>
                <ul className={classes.desc}>
                  {desc
                    ? desc.map((elem, i) => (
                        <li key={i}>{elem.flavor_text.replace("\f", "")}</li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </section>
          <section className={classes.sec2}>
            <div className={classes.content}>
              <div className={classes.column1}>
                <h2 className={classes.h2} style={{ backgroundColor: color }}>
                  Stats
                </h2>
                <div className={classes.statsWrapper}>
                  {details.data.stats
                    ? details.data.stats.map((elem, i) => {
                        return (
                          <Stats
                            key={i}
                            value={elem.base_stat}
                            name={elem.stat.name}
                            color={color}
                          />
                        );
                      })
                    : ""}
                </div>
              </div>
              <div className={classes.column2}>
                <h2 className={classes.h2} style={{ backgroundColor: color }}>
                  Info
                </h2>
                <div className={classes.wrapper}>
                  <ul className={classes.info}>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Base Experience :{" "}
                      </span>
                      <span className={classes.val}>
                        {details.data.base_experience}
                      </span>
                    </li>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Base Happiness :{" "}
                      </span>
                      <span className={classes.val}>
                        {details.speciesInfo.base_happiness}
                      </span>
                    </li>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Capture Rate :{" "}
                      </span>
                      <span className={classes.val}>
                        {details.speciesInfo.capture_rate}
                      </span>
                    </li>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Habitat :{" "}
                      </span>
                      <span className={classes.val}>
                        {details.speciesInfo.habitat
                          ? details.speciesInfo.habitat.name
                          : ""}
                      </span>
                    </li>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Egg Groups :{" "}
                      </span>
                      <span className={classes.val}>
                        {details.speciesInfo.egg_groups
                          ? details.speciesInfo.egg_groups
                              .map((elem) => elem.name)
                              .join(", ")
                          : ""}
                      </span>
                    </li>
                  </ul>

                  <ul className={classes.info}>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Species :{" "}
                      </span>
                      <span className={classes.val}>
                        {details.data.species ? details.data.species.name : ""}
                      </span>
                    </li>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Height :{" "}
                      </span>
                      <span className={classes.val}>{details.data.height}</span>
                    </li>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Weight :{" "}
                      </span>
                      <span className={classes.val}>{details.data.weight}</span>
                    </li>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Abilities :{" "}
                      </span>
                      <span className={classes.val}>
                        {details.data.abilities
                          ? details.data.abilities
                              .map((elem) => elem.ability.name)
                              .join(",")
                          : ""}
                      </span>
                    </li>
                    <li className={classes.infoItem}>
                      <span className={classes.prop} style={{ color: color }}>
                        Order :{" "}
                      </span>
                      <span className={classes.val}>{details.data.order}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className={classes.sec3}>
            <EvolutionChain
              data={details.data}
              evChain={details.evChain}
              color={color}
            />
          </section>
          <section className={classes.sec4}>
            <h2 className={classes.h2} style={{ backgroundColor: color }}>
              Moves
            </h2>
            <div className={classes.movesRow}>
              {details.data.moves
                ? details.data.moves.map((elem, i) => {
                    return (
                      <div className={classes.moveCard} key={i}>
                        <span>{elem.move.name}</span>
                      </div>
                    );
                  })
                : ""}
            </div>
          </section>
          <section className={classes.sec5}>
            <div className={classes.content}>
              <div className={classes.firstCol}>
                <h2 className={classes.h2} style={{ backgroundColor: color }}>
                  Pokedex Numbers
                </h2>
                <ul className={classes.numberList}>
                  {details.speciesInfo.pokedex_numbers
                    ? details.speciesInfo.pokedex_numbers.map((elem, i) => {
                        return (
                          <li key={i}>
                            <span
                              className={classes.pName}
                              style={{ color: color }}
                            >
                              {elem.pokedex.name} :{" "}
                            </span>
                            <span className={classes.pId}>
                              # {elem.entry_number}
                            </span>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
              <div className={classes.secCol}>
                <h2 className={classes.h2} style={{ backgroundColor: color }}>
                  Miscellaneous Info
                </h2>
                <div className={classes.miscContents}>
                  {details.speciesInfo.id && (
                    <ul className={classes.list1}>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Gender Rate :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.gender_rate}
                        </span>
                      </li>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Generation :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.generation.name}
                        </span>
                      </li>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Growth Rate :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.growth_rate.name}
                        </span>
                      </li>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Gender Differences :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.has_gender_differences
                            ? "Yes"
                            : "No"}
                        </span>
                      </li>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Hatch Counter :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.hatch_counter}
                        </span>
                      </li>
                    </ul>
                  )}
                  {details.speciesInfo.id && (
                    <ul className={classes.list2}>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Is Baby :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.is_baby ? "Yes" : "No"}
                        </span>
                      </li>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Is Legendary :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.is_legendary ? "Yes" : "No"}
                        </span>
                      </li>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Is Mythical :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.is_mythical ? "Yes" : "No"}
                        </span>
                      </li>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Pal park encounters :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.pal_park_encounters
                            .map((elem) => elem.area.name)
                            .join(", ")}
                        </span>
                      </li>
                      <li>
                        <span
                          className={classes.pName}
                          style={{ color: color }}
                        >
                          Shape :{" "}
                        </span>
                        <span className={classes.pValue}>
                          {details.speciesInfo.shape.name}
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </React.Fragment>
  );
};
export default Detail;
