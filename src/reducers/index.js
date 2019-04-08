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

// 
// own_r は自分のレーティング.
// other_r は対戦相手のレーティング.
// win : 勝ったら 1, 負けたら 0.
function elo_rating( own_r, other_r, win ){
  const K = 32
  const E_own = 1/( 1 + 10**(( other_r - own_r)/400) )
  //console.log(E_own)
  const new_rate = own_r + K * ( win - E_own )
  return new_rate
}


function get_other_rate( rates, own_name ){
  //console.log( "rates, own_name =", rates, own_name );
  for (let key in rates) {
    //console.log("in get_other_rate, key,rate=", key, rates[key] );
    if( key !== own_name ){
      let ret = rates[key];
      //console.log("this pass,ret=", ret);
      return ret;
    }
  }
}
  
function get_new_rate_pair( old_rates, winner ){
  var new_rates = {}
  for (let key in old_rates){
    let other_rate = get_other_rate( old_rates, key );
    //console.log("after other, key = ", key );
    let own_rate = old_rates[key];
    let new_rate;
    //console.log( "in get_new_rate_pair, own_rate, other_rate = ", own_rate, other_rate);
    if( key == winner ){
      new_rate = elo_rating( own_rate, other_rate, 1 );
    }else {
      new_rate = elo_rating( own_rate, other_rate, 0 );
    }
    new_rates[key] = new_rate;
  }
  return new_rates;
}


function get_current_rates(state, images){
  var rates = {};
  for (let image_path of images){
    let rate;
    if( image_path in state){
      rate = state[image_path];
    }else{
      rate = 1500;
    }
    rates[image_path] = rate;
  }
  return rates;
}



const ranking = (state = {}, action) => {
  // console.log("in ranking reducer, action=", action);
  switch( action.type ){
  case "SELECT_IMAGE":
    const image_path = action.image_path;
    const images = action.images;
    console.log("in ranking reducer, image_path=", image_path);
    console.log("in ranking reducer, images=", images); 
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
