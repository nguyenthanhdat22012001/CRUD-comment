import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      Sort: '',
      Filter: '',
      usersFilter: null,
      posts: [],
      FilterPosts: false,
      postsFilter: null,
    }
    this.refInputSearch = React.createRef();
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

  columnsPosts = [
    { field: 'id', },
    { field: 'title', headerName: 'Title', flex: 2, minWidth: 200 },
    { field: 'body', headerName: 'Content', flex: 3, minWidth: 300 },
    { field: 'username', headerName: 'Username', flex: 1, minWidth: 150 },
  ];


  /*********api******/
  ApiGetUsers = async (url = '') => {
    const baseURL = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(baseURL + url);
    return response.json();
  }
  ApiGetPosts = async (url = '') => {
    const baseURL = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(baseURL + url);
    return response.json();
  }

  /*********get users******/
  GetUsers = async () => {
    try {
      const res = await this.ApiGetUsers();
      const newusers = res.map(item => {
        return {
          'id': item.id,
          'name': item.name,
          'address': `${item.address.suite} ${item.address.street} ${item.address.city}`,
          'phone': item.phone,
          'email': item.email,
          'website': item.website,
          'company': item.company.name,
        };
      });

      this.setState({ users: newusers });
      return true;
    } catch (error) {
      console.log('error', error);
    };
  };

  /*********hanlde sort user******/
  handleSortUsers = (Sort = '') => {
    const { users, usersFilter, Filter } = this.state;
    let newUsers;

    if (Filter !== '') {
      newUsers = [...usersFilter];
    } else {
      newUsers = [...users];
    }

    switch (Sort) {
      case 'company':
        newUsers = [...newUsers].sort(function (a, b) {
          return ('' + a.company).localeCompare(b.company);
        })

        if (Filter !== '') {
          this.setState({ usersFilter: newUsers });
        } else {
          this.setState({ users: newUsers });
        }
        break;

      default:
        newUsers = [...newUsers].sort(function (a, b) {
          return ('' + a.name).localeCompare(b.name);
        })

        if (Filter !== '') {
          this.setState({ usersFilter: newUsers });
        } else {
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
  /*********get posts******/
  GetPosts = async () => {
    const { users } = this.state;
    try {
      const res = await this.ApiGetPosts();
      const newPosts = res.map(post => {
        let user = [...users].find(user => user.id === post.userId);

        return {
          'id': post.id,
          'title': post.title,
          'body': post.body,
          'userId': post.userId,
          'username': user ? user.name : '',
        };
      });
      this.setState({ posts: newPosts });
      console.log('newPosts', newPosts);
      return true;
    } catch (error) {
      console.log('error', error);
    };
  };
  /*********hanlde filter post******/
  handleFilterPosts = (text = '') => {
    if (text === '') return;

    const { posts } = this.state;
    let filterByTitle =  [...posts].filter(post => post.title.includes(text));
    let filterByUsername =  [...posts].filter(post => post.username.includes(text));
    const newPosts = [...filterByTitle,...filterByUsername];
   console.log('handleFilterPosts',newPosts);
     this.setState({FilterPosts:true, postsFilter: newPosts });
  };

  async componentDidMount() {
    await this.GetUsers();
    await this.GetPosts();
  }

  render() {
    const { Sort, Filter, users, usersFilter, posts ,FilterPosts, postsFilter} = this.state;

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
                      columns={this.columnsUsers}
                      rows={Filter !== '' ? usersFilter : users}
                    />
                  </div>
                </div>
              </div>
            </Grid>

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
                  <Button variant="outlined" startIcon={<SearchIcon />} onClick={()=> this.handleFilterPosts(this.refInputSearch.current.children[1].firstChild.value)}>
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
      </Box>
    );
  }
}

export default App;
