const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  errMsg: "",
};

const EvChainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVCHAIN_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "EVCHAIN_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
      };

    case "EVCHAIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.data,
      };

    default:
      return state;
  }
};
export default EvChainReducer;
