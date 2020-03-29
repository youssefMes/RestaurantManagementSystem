import React, {Component} from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import OrdersList from "./Components/OrdersList";
import MenusList from "./Components/MenusList";
import UsersList from "./Components/UsersList";
import AddOrder from "./Components/AddOrder";
import AddMenu from "./Components/AddMenu";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import AddUser from "./Components/addUser";


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});
class App extends Component{
    handleData(data) {
        let result = JSON.parse(data);
        console.log(result)
    }
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                <div>
                    <Link to="/orders">Orders</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/menus">Menus</Link>
                    <Link to="/order/add">Add Order</Link>
                    <Link to="/menu/add">Add Menu</Link>
                    <Link to="/user/add">Add User</Link>
                    <Switch>
                        <Route path="/orders">
                            <OrdersList/>
                            <AddOrder/>
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
                        <Route path="/menu/add">
                            <AddMenu/>
                        </Route>
                        <Route path="/user/add">
                            <AddUser/>
                        </Route>
                    </Switch>
                </div>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
