import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class FormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
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
        const { userId, title, body, id } = this.state;

        const data = {
            id: id,
            userId: userId,
            title: title,
            body: body,
        }
        this.props.handleUpdatePost(data);
    }

    componentDidMount() {
        const { posts } = this.props;
        const id = this.props.match.params.id;
        const filterPost = [...posts].find(item => item.id == id);
        console.log('filterPost', filterPost, id);
        const data = {
            id: filterPost.id,
            userId: filterPost.userId,
            title: filterPost.title,
            body: filterPost.body,
        }
        this.setState({ ...data });
    }


    render() {
        const { userId, title, body } = this.state;
        const { users } = this.props;

        return (
            <FormControl fullWidth component="form" name="myForm" onSubmit={this.handleSubmit} >
                <InputLabel id="demo-simple-select-label" margin="dense" >Author</InputLabel>
                <Select
                    name="userId"
                    label="Author"
                    value={userId}
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
                    value={title}
                    onChange={this.handleInputChange}
                />
                <TextField
                    name="body"
                    margin="normal"
                    id="outlined-basic"
                    label="body"
                    variant="outlined"
                    value={body}
                    onChange={this.handleInputChange}
                />
                <Grid container justifyContent="space-between">
                    <Button type="submit" variant="contained">Edit</Button>
                    <Link to="/">
                        <Button type="submit" color="secondary" variant="contained">Go back</Button>
                    </Link>
                </Grid>
            </FormControl>
        )
    }
}

export default withRouter(FormEdit);
