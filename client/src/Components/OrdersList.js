import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import '../App.css';
import {getOrdersQuery} from "../queries/queries";


class OrdersList extends Component{
    render(){
        console.log('this object', this);
        console.log('data', this.props.data.orders)
        if (this.props.data.loading) return 'Loading...';
        if (this.props.data.error) return `Error! ${this.props.data.error.message}`;
        if (this.props.data.orders !== undefined)return(
            <div>
                {this.props.data.orders.map(order => (
                    <div key="key">
                        <p key={order.id}>{order.id}</p>
                        <p key={order.name}>{order.name}</p>
                        <p key={order.price}>{order.price}</p>
                    </div>

                ))}
            </div>
        )
    }

}




export default graphql(getOrdersQuery)(OrdersList);
