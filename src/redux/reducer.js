const initialState = {
  products: [],
  page: 'Authorization',
  user: ''
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
    default:
      return state;
  }
}
export default reducer;