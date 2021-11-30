import React from 'react';
import Box from '@mui/material/Box';
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import './App.css';

import Posts from './components/Posts';
import FormAdd from './components/FormAdd';
import FormEdit from './components/FormEdit';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      Filter: '',
      usersFilter: null,
      posts: [],
      FilterPosts: false,
      postsFilter: null,
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
      return true;
    } catch (error) {
      console.log('error', error);
    };
  };
  /*********add posts******/
  handleAddPosts = async (data) => {
    const { posts, users } = this.state;
    try {
      const res = await this.ApiAddPosts(data);
      const user = [...users].find(user => user.id === res.userId);
      const newPost = {
        'id': res.id,
        'title': res.title,
        'body': res.body,
        'userId': res.userId,
        'username': user ? user.name : '',
      };
      this.setState({ posts: [...posts, newPost] });
      alert('thêm thành công')
    } catch (error) {
      console.log('error', error);
    };
  };
  /*********update posts******/
  handleUpdatePost = async (data) => {
    const { posts,users } = this.state;
    const user = [...users].find(item => item.id === data.userId);
    try {
      const newPost = [...posts].map(item => {
        if(item.id === data.id){
          item.title =  data.title;
          item.body =  data.body;
          item.userId =  data.userId;
          item.username =  user.name;
        }
        return item;
      });

      this.setState({ posts: newPost });
      alert('update thành công');

    } catch (error) {
      console.log('error', error);
    };
  }
  /*********delete posts******/
  handleDeletePost = async (id) => {
    const { posts } = this.state;
    try {
      const newPost = [...posts].filter(item => item.id !== id);
      this.setState({ posts: newPost });

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
    const { users, posts, FilterPosts, postsFilter } = this.state;
    return (
      <Router>
        <Box
          component="div"
          sx={{
            width: '70%',
            margin: '50px auto',
            height: 500,
          }}
        >
          <Switch>
            <Route exact path="/">
              <Posts
                posts={posts}
                FilterPosts={FilterPosts}
                postsFilter={postsFilter}
                handleFilterPosts={this.handleFilterPosts}
                handleDeletePost={this.handleDeletePost}
              />
            </Route>
            <Route exact path="/create">
              <FormAdd
                users={users}
                handleAddPosts={this.handleAddPosts}
              />
            </Route>
            <Route exact path="/edit/:id">
              <FormEdit
                users={users}
                posts={posts}
                handleUpdatePost={this.handleUpdatePost}
              />
            </Route>
          </Switch>
        </Box>
      </Router>
    );
  }
}

export default App;
