import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextField from '@mui/material/TextField';

import DialogEdit from './DialogEdit';
import DialogDelete from './DialogDelete';

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { post, user, action } = this.props;
        return (
            <Container maxWidth="lg" style={{ border: '1px solid', borderRadius: '5%' }}>
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
                                    onClick={(ev) => this.props.handleTogglelikePost(ev, post.id)}
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
                                                onClick={() => this.props.handleOpenEditCommnet(true, post.id, comment.id)}>
                                                Sửa
                                            </Button>
                                            <Button
                                                color='primary'
                                                size="small"
                                                onClick={() => this.props.handleOpenDeleteCommnet(true, post.id, comment.id)}
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
                            onChange={(e) => this.props.handleChangeInputSendComment(e, post.id)}
                        />

                        {/*Gửi Bình Luận //////////////////////////////*/}
                        <Button
                            variant='contained'
                            color='primary'
                            sx={{
                                marginTop: 2,
                            }}
                            onClick={() => this.props.handleSendComment(post.id)}
                        >
                            Gửi
                        </Button>
                    </Grid>
                </Grid>
                {/* dialog confirm edit */}
                <DialogEdit
                    action={action}
                    handleOpenEditCommnet={this.props.handleOpenEditCommnet}
                    handleEditComment={this.props.handleEditComment}
                />
                {/* dialog confirm delete  */}
                <DialogDelete
                    action={action}
                    handleOpenDeleteCommnet={this.props.handleOpenDeleteCommnet}
                    handleDeleteComment={this.props.handleDeleteComment}
                />

            </Container>
        )
    }
}

export default Post;