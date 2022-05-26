import { Provider } from "react-redux";
import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import store from "./redux/store";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
