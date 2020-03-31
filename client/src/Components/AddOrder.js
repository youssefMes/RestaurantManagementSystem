import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import '../App.css';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import StepLabel from '@material-ui/core/StepLabel';
import {Input, TextField, MenuItem} from '@material-ui/core';
import { useState } from 'react';
import Title from './Title';
import {AddOrderMutation, getMenusAndUsersQuery} from "../queries/queries";


function    displayUsers(){
        var data = this.props.getMenusAndUsersQuery;
        console.log('this props', this.props)
        if (data.loading) return <option disabled>Loading Users</option>;
        else {
            return data.users.map(user =>{
                return <option key={user.id} value={user.id}>{user.username}</option>;
            } )
        }
    }
function    displayMenus(){

    }
function    handleSubmit(e){
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
            //     <select key="1" onChange={(e) => this.setState({userId: e.target.value})}>
            //         <option key="user">Select User </option>
            //         {this.displayOrders()}
            //     </select>
            //     <select key="2" onChange={(e) => {this.setState({menuId: e.target.value})}}>
            //         <option key="menu">Select Menu </option>
            //         {this.displayMenus()}
            //     </select>
            //     <button type="submit" name="Submit">Submit</button>
            // </form>



export function AddOrder(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [userId, setUserId] = useState("");
    const [menuId, setMenuId] = useState("");
    const theme = useTheme();
    console.log('fa"edazdaz', props)
    return (
        <React.Fragment>
            <ResponsiveContainer className="recharts-wrapper">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    props.AddOrderMutation({
                        variables: {
                            name: name,
                            price: parseFloat(price),
                            userId: userId,
                            menuId: menuId
                        }
                    }).then(function (res){
                        console.log(res);
                    });
                }}>
                    <StepLabel key="name-label">
                        Name:
                    </StepLabel>
                    <Input type="text" name="name" key="name" onChange={(e) => setName(e.target.value)}/>
                    <StepLabel key="email-label">
                        Price:
                    </StepLabel>
                    <Input color="primary" type="text" name="price" key="price" onChange={(e) => setPrice(e.target.value)} />
                    <br/>
                    <TextField id="select-user" label="User" select>
                        {() => {
                            console.log(props)
                            var data = props.getMenusAndUsersQuery;
                            if (data.loading) return <option disabled>Loading Menus</option>;
                            else {
                                return data.menus.map(menu =>{
                                    return   <MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>;
                                } )
                            }
                        }}
                    </TextField>
                    <br/>
                    <TextField id="select-menu" label="Menu" value="20" select>
                        {displayMenus()}
                    </TextField>
                    <br/>
                    <Button style={{marginTop : 20 + 'px'}} type="submit" name="Submit" variant="contained" color="primary">Submit</Button>
                </form>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

export default compose(
    graphql(getMenusAndUsersQuery, {name: getMenusAndUsersQuery}),
    graphql(AddOrderMutation, {name: AddOrderMutation})
)(AddOrder)