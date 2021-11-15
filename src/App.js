import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      Sort: '',
      Filter: '',
      usersFilter: null,
    }

  };

  columns = [
    { field: 'id', },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
    { field: 'address', headerName: 'Address', flex: 1, minWidth: 200 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 200 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'website', headerName: 'Website', flex: 1, minWidth: 200 },
    { field: 'company', headerName: 'Company', flex: 1, minWidth: 200 },
  ];


  /*********api config******/
  ApiUsers = async (url = '') => {
    const baseURL = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(baseURL + url);
    return response.json();
  }

  /*********get users******/
  GetUsers = async () => {
    try {
      const res = await this.ApiUsers();
      const newusers = res.map(item => {
        return {
          'id': '_' + Math.random().toString(36).substr(2, 9),
          'name': item.name,
          'address': `${item.address.suite} ${item.address.street} ${item.address.city}`,
          'phone': item.phone,
          'email': item.email,
          'website': item.website,
          'company': item.company.name,
        };
      });

      this.setState({ users: newusers });
      console.log(this.state.users)
    } catch (error) {
      console.log('error', error);
    };
  };

  /*********hanlde sort user******/
  handleSortUsers = (Sort = '') => {
    const { users,usersFilter,Filter } = this.state;
    let newUsers;

    if(Filter !== ''){
      newUsers = [...usersFilter];
    }else{
      newUsers = [...users];
    }
  
    switch (Sort) {
      case 'company':
        newUsers = [...newUsers].sort(function (a, b) {
          return ('' + a.company).localeCompare(b.company);
        })

        if(Filter !== ''){
          this.setState({ usersFilter: newUsers });
        }else{
             this.setState({ users: newUsers });
        }
        break;

      default:
        newUsers = [...newUsers].sort(function (a, b) {
          return ('' + a.name).localeCompare(b.name);
        })

        if(Filter !== ''){
          this.setState({ usersFilter: newUsers });
        }else{
             this.setState({ users: newUsers });
        }
        break;
    }
  };

  /*********hanlde change sort******/
  handleChangeSort = (event) => {
    this.setState({ Sort: event.target.value });
    this.handleSortUsers(event.target.value);
  };

  /*********hanlde change filter******/
  handleChangeFilter = (event) => {
    this.setState({ Filter: event.target.value });
    this.handleFilterUsers(event.target.value);
  };
  /*********hanlde filter user******/
  handleFilterUsers = (Filter = '') => {
    const { users } = this.state;
    let filterUser = [];
    switch (Filter) {
      case 'get 3 rows last':
        for (let index = users.length - 3; index < users.length; index++) {
          const element = users[index];
          filterUser = [...filterUser, element];
        }
        console.log('get 3 rows last', filterUser);
        this.setState({ usersFilter: filterUser });
        break;

      case 'filter address have Suite':
        filterUser = [...users].filter(item => item.address.includes('Suite'))
        console.log('filter address have Suite', filterUser);
        this.setState({ usersFilter: filterUser });
        break;

      case 'filter address have Apt':
        filterUser = [...users].filter(item => item.address.includes('Apt'))
        console.log('filter address have Suite', filterUser);
        this.setState({ usersFilter: filterUser });
        break;

      default:

        break;
    }
  };

  componentDidMount() {
    this.GetUsers();
  }

  render() {
    const { Sort, Filter, users, usersFilter } = this.state;

    return (
      <Box
        component="div"
        sx={{
          width: '100%',
          margin: '50px auto',
          display: 'flex',
          height: 500,
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1, height: '100%' }}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Sort}
                  label="Sắp xếp"
                  onChange={this.handleChangeSort}
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
                  onChange={this.handleChangeFilter}
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
                      columns={this.columns}
                      rows={Filter !== '' ? usersFilter : users}
                    />
                  </div>
                </div>
              </div>
            </Grid>

          </Grid>
        </Container>
      </Box>
    );
  }
}

export default App;
