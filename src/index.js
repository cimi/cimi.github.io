import "./index.css";
import { renderTriangle } from "./triangle";

import * as serviceWorker from "./serviceWorker";

window.onload = () => {
  renderTriangle();
};

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
