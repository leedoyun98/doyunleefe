import currencyReducer from "__product__/redux/reducers/currencyReducer"
import productReducer from "__product__/redux/reducers/productReducer"
import cartReducer from "__product__/redux/reducers/cartReducer"
import wishlistReducer from "__product__/redux/reducers/wishlistReducer"
import { combineReducers } from "redux"
import { createMultilanguageReducer } from "redux-multilanguage"

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
})

export default rootReducer
