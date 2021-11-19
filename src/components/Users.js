import React from 'react';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


class Users extends React.Component {
    constructor(props) {
        super(props);
    };

    columnsUsers = [
        { field: 'id', },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
        { field: 'address', headerName: 'Address', flex: 1, minWidth: 200 },
        { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 200 },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
        { field: 'website', headerName: 'Website', flex: 1, minWidth: 200 },
        { field: 'company', headerName: 'Company', flex: 1, minWidth: 200 },
    ];

    render() {
        const { Sort, Filter, users, usersFilter } = this.props;
        return (
            <Container maxWidth="lg" sx={{ flexGrow: 1, height: '100%' }}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom component="div">
                            Talbe users
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Sort}
                                label="Sắp xếp"
                                onChange={this.props.handleChangeSort}
                            >
                                <MenuItem value={'company'}>Sắp xếp theo công ty A-Z</MenuItem>
                                <MenuItem value={''}>Sắp xếp theo tên A-Z</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Lọc</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Filter}
                                label="Lọc"
                                onChange={this.props.handleChangeFilter}
                            >
                                <MenuItem value={''}>Tất cả</MenuItem>
                                <MenuItem value={'filter address have Suite'}>Lọc địa chỉ có Suite</MenuItem>
                                <MenuItem value={'filter address have Apt'}>Lọc địa chỉ có Apt</MenuItem>
                                <MenuItem value={'get 3 rows last'}>Lấy 3 hàng cuối</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ height: 400, width: '100%' }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <DataGrid
                                        columns={this.columnsUsers}
                                        rows={Filter !== '' ? usersFilter : users}
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

export default Users;
