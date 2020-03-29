import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import '../App.css';
import {getUsersQuery} from "../queries/queries";


class UsersList extends Component{
    render(){
        console.log('data', this.props.data.users);
        if (this.props.data.loading) return 'Loading...';
        if (this.props.data.error) return `Error! ${this.props.data.error.message}`;
        if (this.props.data.users !== undefined)return(
            <div>
                {this.props.data.users.map(user => (
                    <div key={"user" + user.email}>
                        <p key={user.id}>{user.id}</p>
                        <p key={user.username}>{user.username}</p>
                        <p key={user.email}>{user.email}</p>
                    </div>

                ))}
            </div>
        )
    }

}




export default graphql(getUsersQuery)(UsersList);
