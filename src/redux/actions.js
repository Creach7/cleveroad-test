const pageChanged = (newPage) => {
  return {
    type: 'PAGE_CHANGED',
    payload: newPage
  }
}

export {
  pageChanged
}