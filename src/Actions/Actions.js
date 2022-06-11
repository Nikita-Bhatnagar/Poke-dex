import axios from "axios";
import { baseUrl } from "../helper";

const getDetailedList = async (data) => {
  const result = await Promise.allSettled(
    data.map(async (elem) => {
      const info = await axios.get(`${elem.url}`);

      return info;
    })
  );
  return result;
};
export const getList = (limit, offset) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LIST_LOADING" });
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
      const data = await getDetailedList(res.data.results);
      const res2 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-color/green`
      );

      dispatch({
        type: "LIST_SUCCESS",
        payload: data,
        curPage: offset / limit + 1,
      });
    } catch (err) {
      dispatch({ type: "LIST_ERROR", payload: err });
    }
  };
};

export const getDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DETAIL_LOADING" });
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const { data: speciesInfo } = await axios.get(`${data.species.url}`);
      const { data: evChain } = await axios.get(
        `${speciesInfo.evolution_chain.url}`
      );

      dispatch({
        type: "DETAIL_SUCCESS",
        payload: data,
        speciesInfo: speciesInfo,
        evChain: evChain,
      });
    } catch (err) {
      dispatch({ type: "DETAIL_ERROR", payload: "Could not find the pokemon" });
    }
  };
};
export const getEvChainDetails = (arr) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "EVCHAIN_LOADING" });
      const data = await getDetailedList(arr);

      dispatch({ type: "EVCHAIN_SUCCESS", data: data });
    } catch (err) {
      dispatch({ type: "EVCHAIN_ERROR", payload: err });
    }
  };
};
