import { combineReducers } from 'redux'




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
  const K = 32;
  const E_own = 1/( 1 + 10**(( other_r - own_r)/400) );
  //console.log(E_own)
  const new_rate = own_r + K * ( win - E_own );
  return new_rate;
}


function _get_other_rate( rates, own_name ){
  //console.log( "rates, own_name =", rates, own_name );
  for (let key in rates) {
    if( key !== own_name ){
      return rates[key];
    }
  }
}
  
function get_new_rate_pair( old_rates, winner ){
  var new_rates = {}
  for (let image_path in old_rates){
    let other_rate = _get_other_rate( old_rates, image_path );
    //console.log("after other, key = ", key );
    let own_rate = old_rates[image_path];
    let new_rate;
    //console.log( "in get_new_rate_pair, own_rate, other_rate = ", own_rate, other_rate);
    if( image_path == winner ){
      new_rate = elo_rating( own_rate, other_rate, 1 );
    }else {
      new_rate = elo_rating( own_rate, other_rate, 0 );
    }
    new_rates[image_path] = new_rate;
  }
  return new_rates;
}

const INIT_RATE = 1500;

function get_current_rates(cur_rates, images){
  var rates = {};
  for (let image_path of images){
    let rate;
    if( image_path in cur_rates ){
      rate = cur_rates[image_path].rate;
    }else{
      rate = INIT_RATE;
    }
    rates[image_path] = rate;
  }
  return rates;
}


// function get_init_rates2(){
//   var init_rates = {};
//   for (let i = 0; i < 10; i++) {
//     let fpath = `images/${i}.jpg`;
//     let entry = {
//       rate: INIT_RATE,
//       win: 0,
//       lose: 0
//     }
//     init_rates[fpath] = entry;
//   }
//   return init_rates;
// }


function get_init_rates3( image_list ){
  var init_rates = {};
  for( let fpath of image_list ){
    let entry = {
      rate: INIT_RATE,
      win: 0,
      lose: 0
    }
    init_rates[fpath] = entry;
  }
  return init_rates;
}


function get_new_state2( state, new_rates, winner_path, loser_path ){
  //console.log("in get_new_state2, new_rates=", new_rates );
  let new_state = { rates: {} }
  for( let image_path in state.rates ){
    new_state.rates[image_path] = state.rates[image_path];
    if( image_path == winner_path ){
      new_state.rates[image_path].win += 1;
    }
    if( image_path == loser_path ){
      new_state.rates[image_path].lose += 1;
    }
  }
  for( let image_path in new_rates ){
    if( image_path in new_state.rates ){
      new_state.rates[image_path].rate = new_rates[image_path];
    }
  }
  return new_state;  
}


function get_non_selected_image_path( images, selected_image_path ){
  for( let image_path of images ){
    if( image_path != selected_image_path ){
      return image_path;
    }
  }
}


//const ranking = (state = {rates: get_init_rates2() }, action) => {
const ranking = (state = {rates: [] }, action) => {  
  let new_state;
  switch( action.type ){
  case "SELECT_IMAGE":
    let selected_image_path = action.image_path;
    let images = action.images;
    let cur_rates = get_current_rates( state.rates, images);
    let new_rates = get_new_rate_pair( cur_rates, selected_image_path );
    let non_selected_image_path = get_non_selected_image_path( images, selected_image_path );
    //console.log("in ranking reducer, state=", state);
    // console.log("in ranking reducer, image_path=", selected_image_path);
    // console.log("in ranking reducer, images=", images); 
    new_state = get_new_state2( state, new_rates,
				selected_image_path, non_selected_image_path );
    //console.log("in ranking reducer, tmp_new_state=", new_state );
    //let new_state = { rates: get_init_rates2() };
    return new_state;
  case "GET_IMAGE_PATHS":
    // console.log(action.fpath_list);
    new_state = { rates: get_init_rates3( action.fpath_list) };
    //rates: get_init_rates2(action.fpath_list))
    return new_state;    
  default:
    return state;
  }
}

const image_pair = (state={click_num: 0}, action) => {
  let click_num;
  let left_image_path, right_image_path;
  [left_image_path, right_image_path] = _get_image_paths();
  switch( action.type ){
  case "SELECT_IMAGE":    
    click_num = state.click_num + 1
    return {left_image_path, right_image_path, click_num};    
  default:
    click_num = 0
    return {left_image_path, right_image_path, click_num};
  }
}

const reducers = combineReducers( { image_pair, ranking } );
export default reducers
