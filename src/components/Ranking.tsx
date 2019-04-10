import * as React from 'react';
import { connect } from 'react-redux';


const RankImage2 = ( {image_path, entry} ) => {
  return (
    <div>
      <img src={image_path} width="200" height="200" />
      <div> rate = {entry.rate}, </div>
      <div> win = {entry.win},</div>
      <div> lose = {entry.lose}</div>       
    </div>);
};

function get_rate_sorted_images2(rates){
  var aSIN = new Array();
  for( let fpath in rates ){
    aSIN.push({key:fpath,val:rates[fpath].rate});
  }
  aSIN.sort(
    (a,b) => { return (a.val > b.val) ? -1 : 1 ; } ) ;
  //console.log(aSIN);
  var bTest = new Array();
  for( let i=0; i < aSIN.length; i++ ){
    bTest.push(aSIN[i].key);
  }
  return bTest;
}

const _Ranking = (props) => {
  //console.log( "in _Ranking props.rates=", props.rates );
  let image_paths = get_rate_sorted_images2(props.rates);
  //console.log( "in _Ranking image_paths=", image_paths );
  return (<ul>
            ranking
          {image_paths.map( image_path =>
                            <RankImage2 image_path={image_path}
                                       entry={props.rates[image_path]} />
                          )}
          </ul> );
  //return (<div> my test</div>);
};


function _mapStateToProps_ranking (state) {
  // console.log("hello, _ranking mapState, state =", state );
  return { rates: state.ranking.rates };
};

const Ranking = connect( _mapStateToProps_ranking)(_Ranking);
export default Ranking;
