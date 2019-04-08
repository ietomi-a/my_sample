import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';
import ImagePair from "./PairImage";

// redux のデバッガーを使う場合は以下をコメントアウト.
// declare global {
//     interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
// }
// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__
//         && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// createStore の時点で rootReducer に登録した関数が 1 回動く.
const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>  
    <div>
      <ImagePair />
    </div>
  </Provider>  
);

export default App;
