import React from 'react';
import { graphql } from 'react-apollo';
import '../App.css';
import {getOrdersQuery} from "../queries/queries";
import Title from "./Title";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));
export function OrdersList(props){
    const classes = useStyles();
    console.log('props', props);
    if (props.data.loading) return 'Loading...';
    if (props.data.error) return `Error! ${this.props.data.error.message}`;
    if (props.data.orders !== undefined){
            return(
            <React.Fragment>
                <Title>Orders</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price </TableCell>
                            <TableCell>Menu </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.orders.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.price + "€"}</TableCell>
                                <TableCell>{row.menu.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className={classes.seeMore}>
                    <Link color="primary" href="#" onClick={(e) => e.preventDefault()}>
                        See more orders
                    </Link>
                </div>
            </React.Fragment>)
    }

}




export default graphql(getOrdersQuery)(OrdersList);
