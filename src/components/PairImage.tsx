import * as React from 'react';
import { connect } from 'react-redux';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const _ImagePair = () => {
  return (<div>
            {/* image pair */}
            <div>{getRandomIntInclusive(0, 9) }</div>
            <img src={"images/0.jpg"} />
            <img src={"images/1.jpg"} /> 
          </div>);
};

const ImagePair = connect()(_ImagePair);
export default ImagePair;
