import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../Actions/Actions";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import classes from "./PokemonList.module.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const PokemonList = () => {
  const dispatch = useDispatch();
  const btnRef = useRef();
  const list = useSelector((state) => state.ListReducer);

  const fetchList = (limit, offset) => {
    dispatch(getList(limit, offset));
  };
  useEffect(() => {
    fetchList(16, 0);
  }, []);
  let cardsArr = [];
  if (list.data.length !== 0) {
    cardsArr = list.data.map((elem) => {
      const i = elem.value.data;
      return (
        <Card
          name={i.name}
          id={i.id}
          key={i.id}
          types={i.types}
          imgUrl={i.sprites.front_default}
        />
      );
    });
  }
  function goToPrevPage() {
    fetchList(16, (list.curPage - 2) * 16);
  }
  function goToNextPage() {
    fetchList(16, list.curPage * 16);
  }
  function goToPage(e) {
    const val = e.target.textContent;
    fetchList(16, (val - 1) * 16);
  }
  function stayOnCurPage() {}
  const curPage = list.curPage;
  const btnArr = [
    "1",
    `${curPage <= 5 ? "2" : "..."}`,
    `${curPage <= 5 ? "3" : curPage >= 66 ? "66" : curPage - 1}`,
    `${curPage <= 5 ? "4" : curPage >= 66 ? "67" : curPage}`,
    `${curPage <= 5 ? "5" : curPage >= 66 ? "68" : curPage + 1}`,
    `${curPage <= 5 ? "6" : curPage >= 66 ? "69" : curPage + 2}`,
    `${curPage >= 66 ? "70" : "..."}`,
    "71",
  ];
  return (
    <React.Fragment>
      {list.isLoading && <Loader />}
      {!list.isLoading && !list.isError && (
        <section className={classes.list}>{cardsArr}</section>
      )}
      {!list.isLoading && (
        <div className={classes.row}>
          {list.curPage != "1" && (
            <button
              className={classes.pgbtn}
              type="button"
              onClick={goToPrevPage}
            >
              <AiOutlineLeft />
            </button>
          )}
          {btnArr.map((elem, i) => {
            return (
              <button
                className={classes.pgbtn}
                type="button"
                onClick={elem !== "..." ? goToPage : stayOnCurPage}
                ref={btnRef}
                key={i}
                style={{
                  backgroundColor: list.curPage == elem ? "#fff" : "#e0dfdf",
                  boxShadow:
                    list.curPage == elem ? "1px 2px 4px 2px #e0dfdf" : "",
                }}
              >
                {elem}
              </button>
            );
          })}
          {list.curPage != "71" && (
            <button
              className={classes.pgbtn}
              type="button"
              onClick={goToNextPage}
            >
              <AiOutlineRight />
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
export default PokemonList;
