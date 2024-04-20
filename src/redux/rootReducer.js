import { combineReducers } from "redux";
import session from "./slices/sessionSlice";
import user from "./slices/userSlice";
import cart from "./slices/cartSlice";
import compare from "./slices/compareSlice";
import product from "./slices/productSlice";
import productFilters from "./slices/productFiltersSlice";
import quickView from "./slices/quickViewSlice";
import wishlist from "./slices/wishlistSlice";

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    session,
    user,
    cart,
    compare,
    product,
    productFilters,
    quickView,
    wishlist,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
