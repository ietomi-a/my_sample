import * as React from 'react';
import { connect } from 'react-redux';

const RankImage = ( {image_path, rate} ) => (
  <div>
    <img src={image_path} width="200" height="200" />
    <div> rate = {rate}</div>
  </div>
);

const _Ranking = (props) => {
  //console.log( "in _Ranking props.rates=", props.ratas );
  let image_paths = Object.keys(props.rates);
  //let tmp = image_paths.map( (image_path) => ( props.rates[image_path] ) );
  // console.log( "in _Ranking image_paths=", image_paths );
  return (<ul>
          {image_paths.map( image_path =>
                            <RankImage image_path={image_path}
                                       rate={props.rates[image_path]} />
                          )}
          </ul> );
  //  return (<div> {props.rates["images/0.jpg"]}</div>);
  //return (<div> my test</div>);
};


function _mapStateToProps_ranking (state) {
  // console.log("hello, _ranking mapState, state =", state );
  return { rates: state.ranking.rates };
};

const Ranking = connect( _mapStateToProps_ranking)(_Ranking);
export default Ranking;
