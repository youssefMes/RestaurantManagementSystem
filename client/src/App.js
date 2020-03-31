import React, {Component} from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import AddOrder from "./Components/AddOrder";
import AddMenu from "./Components/AddMenu";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import AddUser from "./Components/AddUser";
import Dashboard from "./Components/Dashboard";


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
                    <Switch>
                        <Route path="/orders">
                            <Dashboard list="Orders"/>
                        </Route>
                        <Route path="/users">
                            <Dashboard list="Users"/>
                        </Route>
                        <Route path="/menus">
                            <Dashboard list="Menus"/>
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
