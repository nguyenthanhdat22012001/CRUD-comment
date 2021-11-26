import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';

import Posts from './components/Posts';
import Users from './components/Users';
import FormAdd from './components/FormAdd';
import FormEdit from './components/FormEdit';

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
      isEdit: false,
      editPost: null,
    }
    this.refInputSearch = React.createRef();
  };

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
  ApiAddPosts = async (data) => {
    const baseURL = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response.json();
  }
  ApiUpdatePosts = async (id, data) => {
    const baseURL = 'https://jsonplaceholder.typicode.com/posts/';
    const response = await fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response.json();
  }
  ApiDeletePosts = async (id) => {
    const baseURL = 'https://jsonplaceholder.typicode.com/posts/';
    const response = await fetch(baseURL + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
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
  /*********add posts******/
  handleAddPosts = async (data) => {
    try {
      await this.ApiAddPosts(data);

    } catch (error) {
      console.log('error', error);
    };
  };
  /*********update posts******/
  handleUpdatePost = async (data) => {
    const { editPost } = this.state;
    try {
      await this.ApiUpdatePosts(editPost.id, data);

    } catch (error) {
      console.log('error', error);
    };
  }
  /*********edit posts******/
  handleEditPost = (id) => {
    const { posts } = this.state;
    const filterPost = [...posts].find(item => item.id === id);

    this.setState({ isEdit: true, editPost: filterPost });
  }
  /*********delete posts******/
  handleDeletePost = async (id) => {
    try {
      await this.ApiDeletePosts(id);

    } catch (error) {
      console.log('error', error);
    };
  }
  /*********hanlde filter post******/
  handleFilterPosts = (text = '') => {
    if (text === '') return;

    const { posts } = this.state;
    let filterByTitle = [...posts].filter(post => post.title.includes(text));
    let filterByUsername = [...posts].filter(post => post.username.includes(text));
    const newPosts = [...filterByTitle, ...filterByUsername];
    console.log('handleFilterPosts', newPosts);
    this.setState({ FilterPosts: true, postsFilter: newPosts });
  };

  async componentDidMount() {
    await this.GetUsers();
    await this.GetPosts();
  }

  render() {
    const { users, posts, FilterPosts, postsFilter, editPost, isEdit } = this.state;
    console.log('app', users);
    return (
      <Box
        component="div"
        sx={{
          width: '100%',
          margin: '50px auto',
          height: 500,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-around" >
              <Grid item xs={4}>
                <FormAdd
                  users={users}
                  handleAddPosts={this.handleAddPosts}
                />
              </Grid>
              {
                isEdit ? <Grid item xs={4}>
                  <FormEdit
                    users={users}
                    handleUpdatePost={this.handleUpdatePost}
                    editPost={editPost}
                    isEdit={isEdit}
                  />
                </Grid> : ""
              }
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Posts
              posts={posts}
              FilterPosts={FilterPosts}
              postsFilter={postsFilter}
              handleFilterPosts={this.handleFilterPosts}
              handleEditPost={this.handleEditPost}
              handleDeletePost={this.handleDeletePost}
            />
          </Grid>

        </Grid>
        {/* <Users
          Sort={Sort}
          Filter={Filter}
          users={users}
          usersFilter={usersFilter}
          handleChangeSort={this.handleChangeSort}
          handleChangeFilter={this.handleChangeFilter} /> */}
      </Box>
    );
  }
}

export default App;
