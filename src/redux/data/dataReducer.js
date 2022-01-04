const initialState = {
  loading: false,
  totalSupply: 0,
  saleLimit: 1,
  maxMint: 50,
  cost: null,
  error: false,
  errorMsg: "",
  isPresale: false,
  presaleCost: null,
  userCost: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        saleLimit: action.payload.saleLimit,
        cost: action.payload.cost,
        maxMint: action.payload.maxMint,
        isPresale: action.payload.isPresale,
        presaleCost: action.payload.presaleCost,
        userCost: action.payload.userCost,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
