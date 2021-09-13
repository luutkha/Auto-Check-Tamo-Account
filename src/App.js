import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
const maproutes = routes.map((route, index) => {
  return (
    <Route
      key={index}
      path={route.path}
      component={route.component}
      exact={route.exact}
    />
  );
});
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>{maproutes}</Switch>
      </div>
    </Router>
  );
}

export default App;
