import React from 'react';
import Box from '@mui/material/Box';
import './App.css';

import Post from './components/Post';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { id: 1, name: 'nguyen dat', },
      data: [
        {
          id: '111',
          author: 'nguyen dat',
          title: 'con meo con',
          content: 'bai tap hom truoc',
          isLike: true,
          comments: [
            { id: 1, author: 'Nam', content: 'lorem ipsum' },
            { id: 2, author: 'Đức', content: 'lorem ipsum2' },
          ],
          currentCmt: '',
        },
        {
          id: '002',
          author: 'le tuan',
          title: 'con meo con so 2',
          content: 'bai tap hom nay',
          isLike: false,
          comments: [
            { id: 1, author: 'Đat', content: 'lorem ipsum' },
            { id: 2, author: 'Trung', content: 'lorem ipsum2' },
            { id: 3, author: 'Nhật', content: 'lorem ipsum2' },
          ],
          currentCmt: '',
        },
      ],
      action: {
        isOpenEditCommnet: false,
        isDeleteComment: false,
        comment: null,
        idPost: null,
      },
    };

 
  };

  /********handle toggle like post********/
  handleTogglelikePost = (ev, postID) => {
    let data = this.state.data;
    data.map(d => {
      if (d.id === postID) {
        d.isLike = !d.isLike;
      }
    })
    this.setState({ data });
  }

  /********handle change input send comment********/
  handleChangeInputSendComment = (e, idPost) => {
    const InputSendComment = e.target.value;

    const { data } = this.state;
    const post = data.map(item => {
      if (item.id === idPost) {
        item.currentCmt = InputSendComment;
      }
      return item;
    })

    console.log(post)
    this.setState({ data: post });
  }

  /********handle send comment********/
  handleSendComment = (idPost) => {
    const { data, user } = this.state;
    ///random id
    const id = Math.floor(Math.random() * 1000);
    /////
    const post = data.map(item => {
      if (item.id === idPost) {
        const newComment = { id: id, author: user.name, content: item.currentCmt };
        item.comments.push(newComment);
        item.currentCmt ='';
      }
      return item;
    });

    console.log(post);
    this.setState({ data: post });

    console.log('gửi bình luận')
  }

    /********handle open edit********/
    handleOpenEditCommnet = (boolean, idPost = null, idComment = null) => {
      const { data } = this.state;
      let commentEdit = null;
  
      if (idPost) {
        const post = data.find(item => item.id === idPost);
        commentEdit = post.comments.find(item => item.id === idComment);
      }
  
      const action ={
        isDeleteComment: false,
        isOpenEditCommnet: boolean,
        idPost: idPost,
        comment:commentEdit,
      }
  
      this.setState({action:action });
    }

  /********handle edit comment********/
  handleEditComment = (text) => {
    const { action, data } = this.state;

    const post = data.map(item => {
      if (item.id === action.idPost) {

        const newComments = item.comments.map(comment => {
          if (comment.id === action.comment.id) {
            comment.content = text;
          }
          return comment;
        })
        item.comments = newComments;
      }

      return item;
    });


    this.setState({ post: post, action: {...action,isOpenEditCommnet: false} });
  }

  /********handle delete comment********/
  handleDeleteComment = () => {
    const { action,data } = this.state;

    const post = data.map(item => {
      if (item.id === action.idPost) {
        const newComments = item.comments.filter(comment => comment.id !== action.comment.id);
        item.comments = newComments;
      }
      return item;
    });

    this.setState({ data: post ,action: {...action,isDeleteComment: false} });
  }

  /********handle open delete********/
  handleOpenDeleteCommnet = (boolean, idPost = null, idComment = null) => {
    const { data } = this.state;
    let commentDelete = null;

    if (idPost) {
      const post = data.find(item => item.id === idPost);
      commentDelete = post.comments.find(item => item.id === idComment);
    }

    const action ={
      isDeleteComment: boolean,
      isOpenEditCommnet: false,
      idPost: idPost,
      comment:commentDelete,
    }

    this.setState({action:action });
  }

  render() {
    const { data, user, action } = this.state;


    return (
      <Box
        component="div"
        sx={{
          width: '50%',
          minHeight: 300,
          margin: '50px auto',
        }}
      >

        {data.map((post, index) => {
          return (
            <Post
             key={index} 
             post={post} 
             user={user}
             action={action}
             handleTogglelikePost={this.handleTogglelikePost}
             handleChangeInputSendComment={this.handleChangeInputSendComment}
             handleSendComment={this.handleSendComment}
             handleOpenEditCommnet={this.handleOpenEditCommnet}
             handleEditComment={this.handleEditComment}
             handleOpenDeleteCommnet={this.handleOpenDeleteCommnet}
             handleDeleteComment={this.handleDeleteComment}
            />
          )
        })}

      </Box>
    );
  }
}

export default App;
