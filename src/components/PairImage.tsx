import * as React from 'react';
import { connect } from 'react-redux';


const Image = (props) => {
  return (
    <div>
      <img src={props.image_src} width="200" height="200" />
      <button onClick={ () => {
        // console.log("select,", props.image_src );
        props.dispatch( { type: "SELECT_IMAGE", image_path:props.image_src,
                          images: props.images } );
      }}> select </button>
    </div>
  );
};


const _ImagePair = (props) => {
  //console.log("image_pair, props =", props );
  //console.log("image_pair", image_pair);
  // console.log( "left_image_path, right_image_path",
  //              props.left_image_path, props.right_image_path );
  return (<div>
            choose better. <p/>
            clinck_num = {props.click_num}.
            <table >
              <tr>
                <td>
                  <Image image_src={props.left_image_path}
                         images={[props.left_image_path,props.right_image_path]}
                         dispatch={props.dispatch} />
                </td>
                <td>
                  <Image image_src={props.right_image_path}
                         images={[props.left_image_path,props.right_image_path]}
                         dispatch={props.dispatch}/>
                </td>
              </tr>
            </table>            
            {/* <ul> */}
            {/*   <Image image_src={props.left_image_path} */}
            {/*          images={[props.left_image_path,props.right_image_path]} */}
            {/*          dispatch={props.dispatch} */}
            {/*   /> */}
            {/*   <Image image_src={props.right_image_path} */}
            {/*          images={[props.left_image_path,props.right_image_path]} */}
            {/*          dispatch={props.dispatch}/> */}
            {/* </ul>         */}
          </div>);
};

function _mapDispatchToProps(dispatch) {
  // console.log("hello, mapdispatch");
  return { dispatch };
}

function _mapStateToProps ( state) {
  //console.log("hello, mapState, state =", state );
  return state.image_pair;
}



const ImagePair = connect( _mapStateToProps, _mapDispatchToProps)(_ImagePair);
export default ImagePair;
