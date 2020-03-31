import React from 'react';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import StepLabel from '@material-ui/core/StepLabel';
import Input from '@material-ui/core/Input';

import Title from './Title';
import AddUser from "./AddUser";
import AddOrder from "./AddOrder";
import AddMenu from "./AddMenu";
// Generate Sales Data


export default function AddForm(props) {
    console.log(props)
    if (props.list === "Users") return (<AddUser/>);
    if (props.list === "Orders") return (<AddOrder/>);
    return <AddMenu/>;
}