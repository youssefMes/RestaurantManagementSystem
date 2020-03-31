import React from 'react';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import StepLabel from '@material-ui/core/StepLabel';
import Input from '@material-ui/core/Input';
import { useState } from 'react';
import Title from './Title';
import {graphql} from "react-apollo";
import {AddUserMutation} from "../queries/queries";

export function AddUser(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const theme = useTheme();

    return (
        <React.Fragment>
            <ResponsiveContainer className="recharts-wrapper">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    props.AddUserMutation({
                        variables: {
                            username: username,
                            email: email,
                        }
                    }).then(function (res){
                        console.log(res);
                    });
                }}>
                    <StepLabel key="username-label">
                        Username:

                    </StepLabel>
                    <Input type="text" name="username" key="username" onChange={(e) => setUsername(e.target.value)}/>
                    <StepLabel key="email-label">
                        Email:
                    </StepLabel>
                    <Input color="primary" type="text" name="email" key="email" onChange={(e) => setEmail(e.target.value)} />
                    <br/>
                    <Button style={{marginTop : 20 + 'px'}} type="submit" name="Submit" variant="contained" color="primary">Submit</Button>
                </form>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

export default graphql(AddUserMutation, {name: "AddUserMutation"})(AddUser)

