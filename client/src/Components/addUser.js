import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import '../App.css';
import {AddUserMutation } from "../queries/queries";

class AddUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            usernaname: "",
            email: "",
        }
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('state',this.state);
        this.props.AddUserMutation({
            variables: {
                username: this.state.username,
                email: this.state.email,
            }
        }).then(function (res){
            console.log(res);
        });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label key="username-label">
                    Username:
                    <input type="text" name="username" key="username" onChange={(e) => this.setState({username: e.target.value})}/>
                </label>
                <label key="email-label">
                    Email:
                    <input type="text" name="email" key="email" onChange={(e) => this.setState({email: e.target.value})}/>
                </label>
                <button type="submit" name="Submit">Submit</button>
            </form>
        )
    }

}




export default graphql(AddUserMutation, {name: "AddUserMutation"})(AddUser)