import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

class FormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            title: '',
            body: '',
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { userId, title, body } = this.state;
        const data = {
            userId: userId,
            title: title,
            body: body,
        }
        this.props.handleAddPosts(data);
        
        this.setState({ 
            userId: 0,
            title: '',
            body: '',})
    }

    render() {
        const { users } = this.props;

        return (
            <Box
                component="div"
                sx={{
                    width: '70%',
                    margin: '0 auto',
                }}
            >
                <FormControl fullWidth component="form" name="myForm" onSubmit={this.handleSubmit} >
                    <InputLabel id="demo-simple-select-label" margin="dense" >Author</InputLabel>
                    <Select
                        name="userId"
                        value={this.state.userId}
                        label="Author"
                        onChange={this.handleInputChange}
                    >
                        <MenuItem value={0}>chọn author</MenuItem>
                        {
                            [...users].map(item => {
                                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            })
                        }
                    </Select>
                    <TextField
                        name="title"
                        margin="normal"
                        id="outlined-basic"
                        label="title"
                        variant="outlined"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name="body"
                        margin="normal"
                        id="outlined-basic"
                        label="body"
                        variant="outlined"
                        value={this.state.body}
                        onChange={this.handleInputChange}
                    />
                    <Grid container justifyContent="space-between">
                        <Button type="submit" variant="contained">Add</Button>
                        <Link to="/">
                            <Button type="submit" color="secondary" variant="contained">Go back</Button>
                        </Link>
                    </Grid>

                </FormControl>
            </Box>
        )
    }
}

export default FormAdd;