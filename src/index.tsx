import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "styled-components";

// tslint:disable-next-line no-unused-expression
injectGlobal`
  #root, html, body { 
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
