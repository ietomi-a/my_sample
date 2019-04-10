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

// .jpg 拡張子のあるファイル名だけ取り出す.
function get_filtere_image_list( image_list: string[]): string[] {
  return image_list.filter( (fpath) => (fpath.indexOf(".jpg") >= 0 ));  
}

async function get_file_body( fpath ){
  var data = await fetch( fpath )
      .then( (response) => response.text() )
      .then( (text) => (text.split("\n")) )
      .then( (image_list) => ( get_filtere_image_list(image_list) ) );
  return data;
}

async function loadImage( fpath: string, dispatch ):Promise<void>{
  dispatch({type: "LOAD_START"});  
  try {
    const result = await get_file_body( fpath );
    // console.log("in loadImage, after result ok, result", result );
    dispatch( {type: "GET_IMAGE_PATHS", fpath_list: result } );
  } catch (err) {
    dispatch({type: "LOAD_ERROR"});
  } finally {
    dispatch({type: "LOAD_OK"});
  }
    
}

type RankingProps = {
  rates: any,
  dispatch: any
};
type RankingStates = {};
class _RankingComponent extends React.Component < RankingProps, RankingStates > {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    //console.log("didMount!");
    const fpath = "images.txt";
    loadImage( fpath, this.props.dispatch );
  }  

  render() {
    // console.log( "in _Ranking props=", this.props );    
    let image_paths = get_rate_sorted_images2(this.props.rates);
    // //console.log( "in _Ranking image_paths=", image_paths );
    return (<ul>
              ranking
              {image_paths.map( image_path =>
                                <RankImage2 image_path={image_path}
                                            entry={this.props.rates[image_path]} />
                              )}
            </ul> );
  }

};


function _mapStateToProps_ranking (state) {
  // console.log("hello, _ranking mapState, state =", state );
  return { rates: state.ranking.rates };
};


const Ranking = connect( _mapStateToProps_ranking)(_RankingComponent);

export default Ranking;
