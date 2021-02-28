import "./index.css";
// import { renderTriangle } from "./triangle";

import * as serviceWorker from "./serviceWorker";

const gallery = [
  "https://cimi.io/many-worlds",
  "https://cimi.io/penrose-tiling",
  "https://cimi.io/color-automata"
];
let idx = 0;

window.onload = () => {
  // renderTriangle();
  const iframe = document.getElementById("gallery");
  setInterval(() => {
    iframe.src = gallery[idx];
    idx = (idx + 1) % gallery.length;
  }, 10 * 1000);
};

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
