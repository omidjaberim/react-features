import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./config/locales/i18n";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import 'assets/style/global.css'
import ErrorBoundary from "components/repetitive-component/ErrorBoundry";

let persistor = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  // <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={null}>
        <Provider store={store}>
          <PersistGate loading={<>loading ...</>} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  // </React.StrictMode>
);
