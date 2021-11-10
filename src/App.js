import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import './App.css';


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
      isLike: [],
    };

    this.refInputEditComment = React.createRef();
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
    const { data, isLike, user, action } = this.state;


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
            <Container key={index} maxWidth="lg" style={{ border: '1px solid', borderRadius: '5%' }}>
              <Grid container spacing={2} style={{ padding: '50px 0px' }}>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom component="div">
                    {post.title} <span style={{ color: 'gray' }}>({post.author})</span>
                  </Typography>
                </Grid>

                <Grid item xs={12} style={{ border: '1px solid' }}>
                  <Typography variant="body1" gutterBottom>
                    {post.content}
                  </Typography>
                </Grid>

                <div style={{ backgroundColor: '#c7c7c7', width: '100%' }}>
                  <Grid container spacing={2}>

                    {/* Nút Like ///////////////////// */}
                    <Grid item xs={10}>
                      <Button
                        sx={{ color: `${post.isLike ? 'cornflowerblue' : 'gray'}` }}
                        startIcon={<ThumbUpIcon />}
                        onClick={(ev) => this.handleTogglelikePost(ev, post.id)}
                      >
                        Thích
                      </Button>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: 'center', marginTop: '5px' }}>
                      <Typography variant="subtitle2" gutterBottom component="div">
                        {post.comments.length} bình luận
                      </Typography>
                    </Grid>
                  </Grid>



                  {/* Comment/////////////////////////////// */}
                  {post.comments.map((comment, i) => {
                    return <Grid
                      key={i}
                      container
                      spacing={2}
                      key={index}
                      sx={{ paddingTop: '0px !important', paddingLeft: '2rem !important', borderBottom: '1px solid white', paddingBottom: '5px' }}>
                      <Grid item xs={10} >
                        <Typography variant="subtitle2" gutterBottom component="div" style={{ paddingTop: '5px' }}>
                          {comment.author}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {comment.content}
                        </Typography>
                      </Grid>
                      {
                        user.name === comment.author ?
                          <Grid
                            item xs={2}
                            justifyContent="flex-end"
                          >
                            <Button
                              color='primary'
                              size="small"
                              onClick={() => this.handleOpenEditCommnet(true, post.id, comment.id)}>
                              Sửa
                            </Button>
                            <Button
                              color='primary'
                              size="small"
                              onClick={() => this.handleOpenDeleteCommnet(true, post.id, comment.id)}
                            >
                              Xóa
                            </Button>
                          </Grid>
                          : ''
                      }
                    </Grid>
                  })}




                </div>
                <Grid item xs={12} mt={2}>
                  {/* Bình Luận //////////////////////////////*/}
                  <TextField
                    id="outlined-multiline-static"
                    label="Bình luận"
                    fullWidth
                    multiline
                    rows={1}
                    value={post.currentCmt}
                    onChange={(e) => this.handleChangeInputSendComment(e, post.id)}
                  />

                  {/*Gửi Bình Luận //////////////////////////////*/}
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      marginTop: 2,
                    }}
                    onClick={() => this.handleSendComment(post.id)}
                  >
                    Gửi
                  </Button>
                </Grid>
              </Grid>

              <Dialog
                open={action.isOpenEditCommnet}
                onClose={() => this.handleOpenEditCommnet(false)}
              >
                <DialogTitle>Sửa bình luận</DialogTitle>
                <DialogContent>
                  <div
                    style={{
                      width: 500,
                      marginTop: '10px',
                      paddingTop: '10px',
                    }}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Bình luận"
                      fullWidth
                      multiline
                      rows={2}
                      ref={this.refInputEditComment}
                      defaultValue={action.comment ? action.comment.content : ''}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.handleOpenEditCommnet(false)}>hủy</Button>
                  <Button onClick={() => this.handleEditComment(this.refInputEditComment.current.children[1].firstChild.value)}>sửa</Button>
                </DialogActions>
              </Dialog>
              {/* dialog confirm delete  */}
              <Dialog
                open={action.isDeleteComment}
                onClose={() => this.handleOpenDeleteCommnet(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {`Bạn có chắc muốn xóa comment`}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                   {action.isDeleteComment ? action.comment.content : ''}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.handleOpenDeleteCommnet(false)} autoFocus>Hủy</Button>
                  <Button onClick={() => this.handleDeleteComment()}>
                    Xóa
                  </Button>
                </DialogActions>
              </Dialog>

            </Container>
          )
        })}

      </Box>
    );
  }
}

export default App;
