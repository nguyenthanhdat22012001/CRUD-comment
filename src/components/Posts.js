import React from 'react';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.refInputSearch = React.createRef();
    };

    columnsPosts = [
        { field: 'id', },
        { field: 'title', headerName: 'Title', flex: 2, minWidth: 200 },
        { field: 'body', headerName: 'Content', flex: 3, minWidth: 300 },
        { field: 'username', headerName: 'Username', flex: 1, minWidth: 150 },
    ];

    render() {
        const { posts, FilterPosts, postsFilter } = this.props;
        return (
            <Container maxWidth="lg" sx={{ flexGrow: 1, height: '100%' }}>
                <Grid container spacing={2} justifyContent="space-between">

                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom component="div">
                            Talbe posts
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    id="filled-basic"
                                    label="Search"
                                    variant="standard"
                                    ref={this.refInputSearch}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" startIcon={<SearchIcon />} onClick={() => this.props.handleFilterPosts(this.refInputSearch.current.children[1].firstChild.value)}>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ height: 400, width: '100%' }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <DataGrid
                                        columns={this.columnsPosts}
                                        rows={FilterPosts ? postsFilter : posts}
                                    />
                                </div>
                            </div>
                        </div>
                    </Grid>

                </Grid>
            </Container>
        )
    }
}

export default Posts;
