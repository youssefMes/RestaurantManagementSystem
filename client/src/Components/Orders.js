import React from 'react';
import '../App.css';
import OrdersList from "./OrdersList";
import MenusList from "./MenusList";
import UsersList from "./UsersList";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));
function Orders(props) {
    const classes = useStyles();
    if (props.list === "Orders") return (<OrdersList/>);
    else if (props.list === "Menus") return (<MenusList/>);
    return (<UsersList/>);
}



export default Orders;