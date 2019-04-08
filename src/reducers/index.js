import { combineReducers } from 'redux'
//import image_pair from './my_reducer'


function _getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _get_image_paths(){
  const left_id = _getRandomIntInclusive(0, 9);
  let right_id = null;
  while( (right_id === left_id) || (right_id === null) ){
    right_id = _getRandomIntInclusive(0, 9);
  }
  const left_image_path = `images/${left_id}.jpg`;
  const right_image_path = `images/${right_id}.jpg`;  
  return [left_image_path, right_image_path];
}

const ranking = (state = {}, action) => {
  // console.log("in ranking reducer, action=", action);
  switch( action.type ){
  case "SELECT_IMAGE":
    const image_path = action.image_path;
    console.log("in ranking reducer, image_path=", image_path);  
    if( `${image_path}` in state ) {
      state[image_path] = state[image_path] + 1;
    } else {
      state[image_path] = 1;
    }
    return state;
  default:
    return state;    
  }
}


const image_pair = () => {
  //  console.log("in image_pair reducer, action=", action);
  let left_image_path, right_image_path;
  [left_image_path, right_image_path] = _get_image_paths();
  return {left_image_path, right_image_path};
}


const reducers = combineReducers( { image_pair, ranking } );
//const reducers = combineReducers( image_pair  );
export default reducers
