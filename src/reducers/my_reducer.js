const image_pair = (state = [0,1], action) => {
  switch (action.type) {
  case "SELECT_IMAGE":
    console.log(action.select);
    return state;
  default:
    return state;
  }
}
