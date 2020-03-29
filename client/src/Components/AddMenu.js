import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import '../App.css';
import {AddMenuMutation} from "../queries/queries";
class AddMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            price: 0,
        }
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('state',this.state);
        this.props.AddMenuMutation({
            variables: {
                name: this.state.name,
                price: this.state.price,
                type: this.state.type
            }
        }).then(function (res){
            console.log(res);
        });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label key="name-label">
                    Name:
                    <input type="text" name="name" key="name" onChange={(e) => this.setState({name: e.target.value})}/>
                </label>
                <label key="price-label">
                    Price:
                    <input type="text" name="price" key="price" onChange={(e) => this.setState({price: parseFloat(e.target.value)})}/>
                </label>
                <label key="type-label">
                    Type:
                    <input type="text" name="type" key="type" onChange={(e) => this.setState({type: e.target.value})}/>
                </label>
                <button type="submit" name="Submit">Submit</button>
            </form>
        )
    }

}




export default graphql(AddMenuMutation, {name: "AddMenuMutation"})(AddMenu)