import React, {Component} from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import OrdersList from "./Components/OrdersList";
import MenusList from "./Components/MenusList";
import UsersList from "./Components/UsersList";
import AddOrder from "./Components/AddOrder";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

class App extends Component{
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                <div>
                    <Link to="/orders">Orders</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/menus">Menus</Link>
                    <Link to="/order/add">Add Order</Link>
                    {/*<h1>List ready</h1>*/}
                    {/*<OrdersList/>*/}
                    <Switch>
                        <Route path="/orders">
                            <OrdersList/>
                        </Route>
                        <Route path="/users">
                            <UsersList/>
                        </Route>
                        <Route path="/menus">
                            <MenusList/>
                        </Route>
                        <Route path="/order/add">
                            <AddOrder/>
                        </Route>

                    </Switch>
                </div>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
