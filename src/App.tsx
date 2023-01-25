import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { BrowserRouter } from "react-router-dom";
import Router from "pages/router";
import { createTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import "./config/locales/i18n";
import { IPkce } from "model/redux/pkce";
import pkceChallenge from "pkce-challenge";
import { pkceState } from "redux/slices/auth";
import { RootState } from "redux/store";
import { Pkce } from "model/redux/auth";

function App() {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const pkce = useAppSelector((store: RootState): Pkce => store.auth.pkce);
  const theme = createTheme({
    direction: "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  function RTL(props: any) {
    const isRtl = i18n.language === "fa-IR";
    if (isRtl)
      return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
    else return <div>{props.children}</div>;
  }
  let pkceGenerator: IPkce = { code_challenge: "", code_verifier: "" };
  if (pkce?.code_challenge === "") {
    pkceGenerator = pkceChallenge();
    dispatch(
      pkceState({
        code_challenge: pkceGenerator.code_challenge,
        code_verifier: pkceGenerator.code_verifier,
      })
    );
  }
  return (
    <BrowserRouter>
      <RTL>
        <ThemeProvider theme={theme}>
          <Router />
          <ToastContainer
            position={
              i18n.language === "fa-IR" ? "bottom-left" : "bottom-right"
            }
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={i18n.language === "fa-IR" ? false : true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </RTL>
    </BrowserRouter>
  );
}

export default App;
