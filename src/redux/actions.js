const pageChanged = (newPage) => {
  return {
    type: 'PAGE_CHANGED',
    payload: newPage
  }
};

const userUpdate = (user) => {
  return {
    type: 'USER_UPDATE',
    payload: user
  }
};

const productsUpdate = (products) => {
  return {
    type: 'PRODUCTS_UPDATE',
    payload: products
  }
};

const editProduct = (productInfo) => {
  return {
    type: 'EDIT_PRODUCT',
    payload: productInfo
  }
};

export {
  pageChanged,
  userUpdate,
  productsUpdate,
  editProduct
}