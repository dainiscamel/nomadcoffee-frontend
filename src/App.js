import { useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div>
        <Router>
          <Switch>
            <Route path="/" exact>
              {isLoggedIn ? <Home /> : <Login />}
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
