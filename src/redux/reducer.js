const initialState = {
  products: [],
  page: 'Authorization',
  userID: ''
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGE_CHANGED':
      return {
        ...state,
        page: action.playload
      };
    default:
      return state;
  }
}
export default reducer;