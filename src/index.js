import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
// Redux imports
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
// Component imports
import App from "./App";
import Intro from "./pages/Intro";
import PokeQuiz from "./pages/PokeQuiz";
import Encounter from "./pages/Encounter";
import PokemonPick from "./pages/PokemonPick";
import PageNotFound from "./components/Errors/PageNotFound";
// MUI imports
import theme from "./theme/muiStyles";
import { ThemeProvider } from "@mui/material/styles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/get-started",
    element: <Intro />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/encounter",
    element: <Encounter />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/quiz",
    element: <PokeQuiz />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/picker",
    element: <PokemonPick />,
    errorElement: <PageNotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
