import {productListFeature} from './reducers';

export const {
  name: productFeatureKey,
  reducer: productListReducer,
  selectIsProductsLoaded,
  selectErrors,
  selectProductList,
} = productListFeature;
