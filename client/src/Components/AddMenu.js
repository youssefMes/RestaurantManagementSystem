import React from 'react';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import StepLabel from '@material-ui/core/StepLabel';
import Input from '@material-ui/core/Input';
import { useState } from 'react';
import Title from './Title';
import {graphql} from "react-apollo";
import {AddMenuMutation} from "../queries/queries";

export function AddMenu(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const theme = useTheme();

    return (
        <React.Fragment>
            <ResponsiveContainer className="recharts-wrapper">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    props.AddMenuMutation({
                        variables: {
                            name: name,
                            price: parseFloat(price),
                            type: type
                        }
                    })
                }}>
                    <StepLabel key="name-label">
                        Name:

                    </StepLabel>
                    <Input type="text" name="name" key="name" onChange={(e) => setName(e.target.value)}/>
                    <StepLabel key="price-label">
                        Price:
                    </StepLabel>
                    <Input color="primary" type="text" name="price" key="price" onChange={(e) => setPrice(e.target.value)} />
                    <StepLabel key="type-label">
                        Type:
                    </StepLabel>
                    <Input color="primary" type="text" name="type" key="type" onChange={(e) => setType(e.target.value)} />
                    <br/>
                    <Button style={{marginTop : 20 + 'px'}} type="submit" name="Submit" variant="contained" color="primary">Submit</Button>
                </form>
            </ResponsiveContainer>
        </React.Fragment>
    );
}



export default graphql(AddMenuMutation)(AddMenu)