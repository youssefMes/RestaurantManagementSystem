import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import '../App.css';
import {getMenusAndUsersQuery, AddOrderMutation} from "../queries/queries";

class AddOrder extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: 0,
            userId: 0,
            menuId: 0
        }
    }

    displayOrders(){
        var data = this.props.getMenusAndUsersQuery;
        console.log('this props', this.props)
        if (data.loading) return <option disabled>Loading Users</option>;
        else {
            return data.users.map(user =>{
                return <option key={user.id} value={user.id}>{user.username}</option>;
            } )
        }
    }
    displayMenus(){
        var data = this.props.getMenusAndUsersQuery;
        if (data.loading) return <option disabled>Loading Menus</option>;
        else {
            return data.menus.map(menu =>{
                return <option key={menu.id} value={menu.id}>{menu.name}</option>;
            } )
        }
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('state',this.state);
        this.props.AddOrderMutation({
            variables: {
                name: this.state.name,
                price: this.state.price,
                userId: this.state.userId,
                menuId: this.state.menuId
            }
        }).then(function (res){
            console.log(res);
        });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    Name:
                    <input type="text" name="name" key="name" onChange={(e) => this.setState({name: e.target.value})}/>
                </label>
                <label>
                    price:
                    <input type="text" name="price" key="price" onChange={(e) => this.setState({price: parseFloat(e.target.value)})}/>
                </label>
                <select key="1" onChange={(e) => this.setState({userId: e.target.value})}>
                    <option key="user">Select User </option>
                    {this.displayOrders()}
                </select>
                <select key="2" onChange={(e) => {this.setState({menuId: e.target.value})}}>
                    <option key="menu">Select Menu </option>
                    {this.displayMenus()}
                </select>
                <button type="submit" name="Submit">Submit</button>
            </form>
        )
    }

}




export default compose(
    graphql(getMenusAndUsersQuery, {name: "getMenusAndUsersQuery"}),
    graphql(AddOrderMutation, {name: "AddOrderMutation"})
)(AddOrder)