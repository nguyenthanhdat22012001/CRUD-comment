import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class FormEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const obj = {
            userId: data.get('author'),
            title: data.get('title'),
            body: data.get('body'),
          }
        console.log(obj);
        this.props.handleUpdatePost(obj);
    }

    render() {
        const { users,isEdit,editPost } = this.props;

        return (
            <FormControl fullWidth component="form" name="myForm" onSubmit={this.handleSubmit} >
                <InputLabel id="demo-simple-select-label" margin="dense" >Author</InputLabel>
                <Select
                    name="author"
                    label="Author"
                    defaultValue={isEdit ? editPost.id : 0}
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
                    defaultValue={isEdit ? editPost.title : ''}
                />
                <TextField
                    name="body"
                    margin="normal"
                    id="outlined-basic"
                    label="body"
                    variant="outlined"
                    defaultValue={isEdit ? editPost.body : ''}
                />
                <Button type="submit" variant="contained">Edit</Button>
            </FormControl>
        )
    }
}

export default FormEdit;