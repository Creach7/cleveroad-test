const initialState = {
  products: [],
  page: 'Authorization',
  // page: 'ProductsList',
  user: '',
  productInfo: {}
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGE_CHANGED':
      return {
        ...state,
        page: action.payload
      };
    case 'USER_UPDATE':
      return {
        ...state,
        user: action.payload
      }
    case 'PRODUCTS_UPDATE':
      return {
        ...state,
        products: action.payload
      }
    case 'EDIT_PRODUCT':
      return {
        ...state,
        productInfo: action.payload
      }
    default:
      return state;
  }
}
export default reducer;