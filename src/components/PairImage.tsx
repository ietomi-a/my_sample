import * as React from 'react';
import { connect } from 'react-redux';

function _getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Image = (props) => {
  return (
    <div>
      <img src={props.image_src} />
      <button onClick={ () => {
        console.log("select,", props.image_src );
      }}> select </button>
    </div>
  );
};


function _get_image_paths(){
  const left_id = _getRandomIntInclusive(0, 9);
  let right_id = null;
  while( (right_id === left_id) || (right_id === null) ){
    right_id = _getRandomIntInclusive(0, 9);
  }
  const left_image_path = `images/${left_id}.jpg`;
  const right_image_path = `images/${right_id}.jpg`;  
  // console.log( "left_id,right_id", left_id, right_id );
  return [left_image_path, right_image_path];
}



const _ImagePair = () => {
  let left_image_path, right_image_path;
  [left_image_path, right_image_path] = _get_image_paths();
  //console.log("left_image_path, right_image_path", left_image_path, right_image_path );
  return (<div>
            好きな方を選べ.
            <ul>
              <Image image_src={left_image_path} />
              <Image image_src={right_image_path} />
            </ul>        
          </div>);
};

const ImagePair = connect()(_ImagePair);
export default ImagePair;
