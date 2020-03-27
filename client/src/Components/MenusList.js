import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import '../App.css';
import {getMenusQuery} from "../queries/queries";

class MenusList extends Component{
    render(){
        console.log('this object', this);
        console.log('data', this.props.data.menus)
        if (this.props.data.loading) return 'Loading...';
        if (this.props.data.error) return `Error! ${this.props.data.error.message}`;
        if (this.props.data.menus !== undefined)return(
            <div>
                {this.props.data.menus.map(menu => (
                    <li key={menu.id}>{menu.name}</li>
                ))}
            </div>
        )
    }

}




export default graphql(getMenusQuery)(MenusList);
