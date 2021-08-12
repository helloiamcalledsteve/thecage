import { Route, Switch, BrowserRouter } from "react-router-dom";
import App from "../App";
import NoMatch from "../Components/NoMatch";
import Join from "../Components/Join";

const Routes = (() => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/play" component={Join} />
                <Route>
                    <NoMatch />
                </Route>
            </ Switch>
        </BrowserRouter>
    )
})

export default Routes;