import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class FormAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    // handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const obj = {
            userId: data.get('author'),
            title: data.get('title'),
            body: data.get('body'),
          }
        console.log(obj);
        this.props.handleAddPosts(obj);
    }

    render() {
        const { users } = this.props;

        return (
            <FormControl fullWidth component="form" name="myForm" onSubmit={this.handleSubmit} >
                <InputLabel id="demo-simple-select-label" margin="dense" >Author</InputLabel>
                <Select
                    name="author"
                    // value={this.state.userId}
                    label="Author"
                    // onChange={this.handleInputChange}
                    defaultValue={0}
                >
                    <MenuItem value={0}>chọn author</MenuItem>
                    {
                        [...users].map(item => {
                            return <MenuItem value={item.id}>{item.name}</MenuItem>
                        })
                    }
                </Select>
                <TextField
                    name="title"
                    margin="normal"
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                />
                <TextField
                    name="body"
                    margin="normal"
                    id="outlined-basic"
                    label="body"
                    variant="outlined"
                />
                <Button type="submit" variant="contained">Add</Button>
            </FormControl>
        )
    }
}

export default FormAdd;