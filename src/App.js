import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { useAuth } from "./hooks";

const loading = () => <></>;

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

const CheckAuth = props => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route
      path="/"
      name="Wallet"
      render={props => <DefaultLayout {...props} />}
    />
  ) : (
    <Redirect to="/login" />
  );
};

function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={props => <Login {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={props => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={props => <Page500 {...props} />}
          />
          <Route path="*" component={CheckAuth} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
