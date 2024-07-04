import * as React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/reducerStore/store";
import { BrowserRouter } from "react-router-dom";

const container: any = document.getElementById("root");

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
} else {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
