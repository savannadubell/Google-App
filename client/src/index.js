import React from "react";
import ReactDOM from "react-dom";
import Root from "./root";
import configureStore from "./store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Root store={configureStore()} />,
  document.getElementById("root")
);

serviceWorker.unregister();
