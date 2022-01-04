// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      let cost = await store
        .getState()
        .blockchain.smartContract.methods.cost()
        .call();
      let saleLimit = await store
        .getState()
        .blockchain.smartContract.methods.saleLimit()
        .call();
      let maxMint = await store
        .getState()
        .blockchain.smartContract.methods.maxMintAmount()
        .call();
      let account = store.getState().blockchain.account;
      let isPresale = await store
        .getState()
        .blockchain.smartContract.methods.presaleWallets(account)
        .call();
      let presaleCost = await store
        .getState()
        .blockchain.smartContract.methods.presaleCost()
        .call();
      let userCost = (isPresale ? presaleCost : cost);
      dispatch(
        fetchDataSuccess({
          totalSupply,
          cost,
          presaleCost,
          saleLimit,
          maxMint,
          isPresale,
          userCost
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
