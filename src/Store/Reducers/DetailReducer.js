const initialState = {
  data: [],
  speciesInfo: [],
  evChain: [],
  isError: false,
  isLoading: false,
  errMsg: "",
};
const DetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DETAIL_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
      };

    case "DETAIL_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,

        errMsg: action.payload,
      };

    case "DETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        data: action.payload,
        speciesInfo: action.speciesInfo,
        evChain: action.evChain,
      };

    default:
      return state;
  }
};
export default DetailReducer;
