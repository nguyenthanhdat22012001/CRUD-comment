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
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { id: 1, name: 'nguyen dat', },

      post: {
        author: 'nguyen dat',
        title: 'con meo con',
        content: 'bai tap hom nay',
        comments: [
          { id: 1, author: 'Nam', content: 'lorem ipsum' },
          { id: 2, author: 'Đức', content: 'lorem ipsum2' },
        ],
      },

      isOpenEditCommnet: false,
      commentEdit: null,
      isLike: false,
      inputSendCommnet: '',
    };

    this.refInputEditComment = React.createRef();
  };

  /********handle toggle like post********/
  handleTogglelikePost = () => {
    this.setState({ isLike: !this.state.isLike });
  }

  /********handle change input send comment********/
  handleChangeInputSendComment = (e) => {
    const InputSendComment = e.target.value;
    this.setState({ inputSendCommnet: InputSendComment });
  }

  /********handle send comment********/
  handleSendComment = () => {
    const { inputSendCommnet, user } = this.state;
    // check input empty
    if (inputSendCommnet === '') {
      return
    }
    // good 
    const post = this.state.post;
    const id = Math.floor(Math.random() * 1000);
    const newComment = { id: id, author: user.name, content: inputSendCommnet };
    const newComments = [...post.comments, newComment];

    const newPost = { ...post, comments: newComments };

    this.setState({ post: newPost, inputSendCommnet: '' });
  }

  /********handle edit comment********/
  handleEditComment = (text) => {
    const { commentEdit, post } = this.state;

    const newComments = post.comments.map(item => {
      if (item.id === commentEdit.id) {
        item.content = text;
      }
      return item;
    });
    const newPost = { ...post, comments: newComments };

    this.setState({ post: newPost, isOpenEditCommnet: false });
  }

  /********handle delete comment********/
  handleDeleteComment = (id) => {
    const post = this.state.post;
    const newComments = post.comments.filter(item => item.id !== id);
    const newPost = { ...post, comments: newComments };

    this.setState({ post: newPost });
  }

  /********handle open edit********/
  handleOpenEditCommnet = (boolean, idEdit = null) => {
    const post = this.state.post;
    const filterComment = post.comments.filter(item => item.id === idEdit);
    const commentEdit = { ...filterComment[0] };
    console.log("commentEdit", commentEdit);

    this.setState({ isOpenEditCommnet: boolean, commentEdit: commentEdit });
  }

  render() {
    const { post, isLike, user, inputSendCommnet, isOpenEditCommnet, commentEdit } = this.state
    return (
      <Box
        component="div"
        sx={{
          width: '50%',
          minHeight: 300,
          margin: '50px auto',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom component="div">
                {post.title}
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="div">
                {post.author}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                {post.content}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                sx={{ color: `${isLike ? 'cornflowerblue' : 'gray'}` }}
                startIcon={<ThumbUpIcon />}
                onClick={() => this.handleTogglelikePost()}
              >
                Thích
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ paddingBottom: '1rem' }}>
              <Typography variant="subtitle2" gutterBottom component="div">
                35 bình luận
              </Typography>
            </Grid>

            {
              post.comments.map((item, index) => {

                return <Grid
                  key={index}
                  item xs={12}
                  sx={{ paddingTop: '0px !important', paddingLeft: '2rem !important' }}>
                  <Typography variant="subtitle2" gutterBottom component="div">
                    {item.author}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.content}
                  </Typography>
                  {
                    user.name === item.author ?
                      <Grid
                        container
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Button
                          color='primary'
                          size="small"
                          onClick={() => this.handleOpenEditCommnet(true, item.id)}>
                          Sửa
                        </Button>
                        <Button
                          color='primary'
                          size="small"
                          onClick={() => this.handleDeleteComment(item.id)}
                        >
                          Xóa
                        </Button>
                      </Grid>
                      : ''
                  }
                </Grid>
              })
            }

            <Grid item xs={12} mt={2}>
              <TextField
                id="outlined-multiline-static"
                label="Bình luận"
                fullWidth
                multiline
                rows={1}
                value={inputSendCommnet}
                onChange={this.handleChangeInputSendComment}
              />
              <Button
                variant='contained'
                color='primary'
                sx={{
                  marginTop: 2,
                }}
                onClick={this.handleSendComment}
              >
                Gửi
              </Button>
            </Grid>
          </Grid>

          <Dialog
            open={isOpenEditCommnet}
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
                  defaultValue={commentEdit ? commentEdit.content : ''}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleOpenEditCommnet(false)}>hủy</Button>
              <Button onClick={() => this.handleEditComment(this.refInputEditComment.current.children[1].firstChild.value)}>sửa</Button>
            </DialogActions>
          </Dialog>

        </Container>
      </Box>
    );
  }
}

export default App;
