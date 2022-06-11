const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  errMsg: "",
  curPage: 0,
};
const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "LIST_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
      };

    case "LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        curPage: action.curPage,
      };

    default:
      return state;
  }
};
export default ListReducer;
