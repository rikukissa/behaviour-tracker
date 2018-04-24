import * as React from "react";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";

import { store } from "./store";
import App from "./App";

// tslint:disable-next-line no-unused-expression
injectGlobal`
  #root, html, body { 
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "Lato", sans-serif;
    font-size: 16px;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
